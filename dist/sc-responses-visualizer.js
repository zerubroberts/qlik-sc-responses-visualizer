define(['qlik', './properties', 'css!./sc-responses-visualizer.css'],
function(qlik, properties) {
    'use strict';

    console.log('SC Responses Visualizer: Extension loaded successfully');

    // State management for expand/collapse
    const expandedStates = {};

    // Helper function to get color value from color picker object or string
    function getColorValue(colorSetting) {
        if (!colorSetting) return '#000000';
        if (typeof colorSetting === 'string') return colorSetting;
        if (typeof colorSetting === 'object' && colorSetting.color) return colorSetting.color;
        return '#000000';
    }

    // Define all functions in closure scope to avoid context issues
    function processData(hypercube) {
        console.log('SC Responses Visualizer: Starting data processing');
        
        const dimensions = hypercube.qDimensionInfo;
        const measures = hypercube.qMeasureInfo;
        const matrix = hypercube.qDataPages[0].qMatrix;
        
        if (dimensions.length < 2) {
            throw new Error('At least 2 dimensions are required');
        }
        
        if (measures.length < 1) {
            throw new Error('At least 1 measure is required');
        }
        
        const processedData = {};
        
        matrix.forEach((row, rowIndex) => {
            // Safely get dimension values
            const category = (row[0] && row[0].qText) ? row[0].qText : 'No Category';
            const subCategory = (dimensions.length > 1 && row[1] && row[1].qText) ? row[1].qText : null;
            const breakdown = (dimensions.length > 2 && row[2] && row[2].qText) ? row[2].qText : 'Default';
            
            // Store element numbers for selections
            const categoryElemNumber = row[0] ? row[0].qElemNumber : -1;
            const subCategoryElemNumber = (dimensions.length > 1 && row[1]) ? row[1].qElemNumber : -1;
            const breakdownElemNumber = (dimensions.length > 2 && row[2]) ? row[2].qElemNumber : -1;
            
            // Get measure value - check both qNum and qText
            const measureIndex = dimensions.length;
            let value = 0;
            if (row[measureIndex]) {
                if (typeof row[measureIndex].qNum !== 'undefined' && !isNaN(row[measureIndex].qNum)) {
                    value = row[measureIndex].qNum;
                } else if (row[measureIndex].qText) {
                    value = parseFloat(row[measureIndex].qText) || 0;
                }
            }
            
            // Initialize category if needed
            if (!processedData[category]) {
                processedData[category] = {
                    total: 0,
                    subCategories: {},
                    breakdowns: {},
                    expanded: false,
                    elemNumber: categoryElemNumber
                };
            }
            
            // Process based on whether we have subcategories
            if (subCategory !== null) {
                // We have subcategories
                if (!processedData[category].subCategories[subCategory]) {
                    processedData[category].subCategories[subCategory] = {
                        total: 0,
                        breakdowns: {},
                        expanded: false,
                        elemNumber: subCategoryElemNumber
                    };
                }
                
                // Initialize breakdown if needed
                if (!processedData[category].subCategories[subCategory].breakdowns[breakdown]) {
                    processedData[category].subCategories[subCategory].breakdowns[breakdown] = {
                        value: 0,
                        percentage: 0,
                        elemNumber: breakdownElemNumber,
                        dimensionIndex: 2
                    };
                }
                
                processedData[category].subCategories[subCategory].breakdowns[breakdown].value += value;
                processedData[category].subCategories[subCategory].total += value;
            } else {
                // No subcategories, just breakdowns at category level
                if (!processedData[category].breakdowns[breakdown]) {
                    processedData[category].breakdowns[breakdown] = {
                        value: 0,
                        percentage: 0,
                        elemNumber: breakdownElemNumber,
                        dimensionIndex: dimensions.length > 2 ? 2 : 1
                    };
                }
                
                processedData[category].breakdowns[breakdown].value += value;
            }
            
            processedData[category].total += value;
        });

        // Calculate percentages
        Object.keys(processedData).forEach(category => {
            const categoryData = processedData[category];
            
            // Calculate percentages for subcategories
            Object.keys(categoryData.subCategories).forEach(subCategory => {
                const subCatData = categoryData.subCategories[subCategory];
                Object.keys(subCatData.breakdowns).forEach(breakdown => {
                    if (subCatData.total > 0) {
                        subCatData.breakdowns[breakdown].percentage = 
                            (subCatData.breakdowns[breakdown].value / subCatData.total) * 100;
                    }
                });
            });
            
            // Calculate percentages for direct breakdowns
            Object.keys(categoryData.breakdowns).forEach(breakdown => {
                if (categoryData.total > 0) {
                    categoryData.breakdowns[breakdown].percentage = 
                        (categoryData.breakdowns[breakdown].value / categoryData.total) * 100;
                }
            });
        });

        console.log('SC Responses Visualizer: Data processing complete');
        return processedData;
    }

    function getResponseColor(responseName, settings) {
        if (!settings.colors.enableConditionalColors) {
            return null; // Use default color scheme
        }

        const response = responseName.toLowerCase();
        
        // Check negative responses
        if (settings.colors.negativeResponses) {
            const negatives = settings.colors.negativeResponses.toLowerCase().split(',').map(s => s.trim());
            if (negatives.some(neg => response.includes(neg))) {
                return getColorValue(settings.colors.negativeColor) || '#E74C3C';
            }
        }
        
        // Check warning responses
        if (settings.colors.warningResponses) {
            const warnings = settings.colors.warningResponses.toLowerCase().split(',').map(s => s.trim());
            if (warnings.some(warn => response.includes(warn))) {
                return getColorValue(settings.colors.warningColor) || '#F39C12';
            }
        }
        
        // Default to positive color if conditional colors are enabled
        if (settings.colors.enableConditionalColors) {
            return getColorValue(settings.colors.positiveColor) || '#27AE60';
        }
        
        return null;
    }

    function renderResponseBar(data, settings, self) {
        const barContainer = document.createElement('div');
        barContainer.className = 'sc-bar-container';
        
        const bar = document.createElement('div');
        bar.className = 'sc-response-bar';
        
        // Apply custom height and border radius
        bar.style.height = (settings.layout && settings.layout.barHeight) ? settings.layout.barHeight + 'px' : '24px';
        bar.style.borderRadius = (settings.layout && settings.layout.barBorderRadius) ? settings.layout.barBorderRadius + 'px' : '4px';
        
        // Check if we have breakdowns
        if (!data.breakdowns || Object.keys(data.breakdowns).length === 0) {
            // No breakdowns, show empty bar
            bar.style.backgroundColor = '#cccccc';
            barContainer.appendChild(bar);
            return barContainer;
        }
        
        // Sort breakdowns by value
        const breakdowns = Object.keys(data.breakdowns).map(key => ({
            name: key,
            value: data.breakdowns[key].value,
            percentage: data.breakdowns[key].percentage,
            elemNumber: data.breakdowns[key].elemNumber,
            dimensionIndex: data.breakdowns[key].dimensionIndex
        })).sort((a, b) => b.value - a.value);
        
        // Render each segment
        breakdowns.forEach((breakdown, index) => {
            const segment = document.createElement('div');
            segment.className = 'sc-bar-segment';
            segment.style.width = breakdown.percentage + '%';
            
            // Apply conditional colors or default colors
            const conditionalColor = getResponseColor(breakdown.name, settings);
            if (conditionalColor) {
                segment.style.backgroundColor = conditionalColor;
            } else {
                segment.style.backgroundColor = settings.colors.barColors[index % settings.colors.barColors.length];
            }
            
            // Apply spacing
            if (settings.layout && settings.layout.barSpacing) {
                segment.style.margin = '0 ' + (settings.layout.barSpacing / 2) + 'px';
            }
            
            // Apply segment border radius
            if (settings.layout && settings.layout.segmentBorderRadius) {
                segment.style.borderRadius = settings.layout.segmentBorderRadius + 'px';
            }
            
            segment.setAttribute('data-breakdown', breakdown.name);
            segment.setAttribute('data-value', breakdown.value);
            segment.setAttribute('data-percentage', breakdown.percentage.toFixed(2));
            segment.setAttribute('data-elem-number', breakdown.elemNumber);
            segment.setAttribute('data-dimension', breakdown.dimensionIndex);
            segment.title = breakdown.name + ': ' + breakdown.value + ' (' + breakdown.percentage.toFixed(2) + '%)';
            
            // Add click handler for selections
            segment.onclick = function(e) {
                e.stopPropagation();
                if (self && breakdown.elemNumber >= 0) {
                    self.selectValues(breakdown.dimensionIndex, [breakdown.elemNumber], true);
                }
            };
            
            bar.appendChild(segment);
        });
        
        barContainer.appendChild(bar);
        return barContainer;
    }

    function renderSubCategory(subCategoryName, subCategoryData, settings, self) {
        const subCategoryGroup = document.createElement('div');
        subCategoryGroup.className = 'sc-subcategory-group sc-response-row';
        subCategoryGroup.style.backgroundColor = getColorValue(settings.colors.subCategoryBackground);
        subCategoryGroup.style.cursor = 'pointer';
        
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'sc-subcategory-content';
        
        // Add subcategory name
        const nameElement = document.createElement('span');
        nameElement.className = 'sc-subcategory-name';
        nameElement.textContent = subCategoryName;
        contentWrapper.appendChild(nameElement);
        
        // Add response count
        if (settings.general.showCounts) {
            const responseCount = document.createElement('span');
            responseCount.className = 'sc-response-count';
            responseCount.textContent = subCategoryData.total + ' responses';
            contentWrapper.appendChild(responseCount);
        }
        
        // Add response bar if we have breakdowns
        if (Object.keys(subCategoryData.breakdowns).length > 0) {
            const barContainer = renderResponseBar(subCategoryData, settings, self);
            contentWrapper.appendChild(barContainer);
        }
        
        subCategoryGroup.appendChild(contentWrapper);
        
        // Add breakdown details container
        const detailsContainer = document.createElement('div');
        detailsContainer.className = 'sc-breakdown-details';
        detailsContainer.style.display = 'none';
        subCategoryGroup.appendChild(detailsContainer);
        
        return subCategoryGroup;
    }

    function getExpandedState(objectId, category, settings) {
        const key = objectId + '_' + category;
        
        if (settings.general.defaultExpandState === 'remember' && expandedStates[key] !== undefined) {
            return expandedStates[key];
        } else if (settings.general.defaultExpandState === 'expanded') {
            return true;
        } else {
            return false; // collapsed by default
        }
    }

    function setExpandedState(objectId, category, expanded, settings) {
        if (settings.general.persistExpandState) {
            const key = objectId + '_' + category;
            expandedStates[key] = expanded;
        }
    }

    function renderVisualization(container, data, settings, layout, self) {
        console.log('SC Responses Visualizer: Starting render');
        
        // Clear container
        container.innerHTML = '';
        
        // Sort categories
        const sortedCategories = Object.keys(data).sort();
        
        if (sortedCategories.length === 0) {
            container.innerHTML = '<div class="sc-no-data">No categories to display</div>';
            return;
        }
        
        sortedCategories.forEach(category => {
            const categoryData = data[category];
            console.log(`Rendering category: ${category}`);
            
            // Check expanded state
            const isExpanded = getExpandedState(layout.qInfo.qId, category, settings);
            
            // Create category group
            const categoryGroup = document.createElement('div');
            categoryGroup.className = 'sc-category-group';
            
            // Create category header
            const header = document.createElement('div');
            header.className = 'sc-category-header';
            header.style.backgroundColor = getColorValue(settings.colors.categoryBackground);
            header.style.color = getColorValue(settings.colors.textColor);
            header.style.cursor = 'pointer';
            
            // Add expand icon
            const expandIcon = document.createElement('span');
            expandIcon.className = 'sc-expand-icon';
            expandIcon.innerHTML = isExpanded ? '▼' : '▶';
            header.appendChild(expandIcon);
            
            // Add category name
            const categoryName = document.createElement('span');
            categoryName.className = 'sc-category-name';
            categoryName.textContent = category;
            header.appendChild(categoryName);
            
            // Add response count
            if (settings.general.showCounts) {
                const responseCount = document.createElement('span');
                responseCount.className = 'sc-response-count';
                responseCount.textContent = categoryData.total + ' responses';
                header.appendChild(responseCount);
            }
            
            categoryGroup.appendChild(header);
            
            // Check if we have subcategories
            const hasSubCategories = Object.keys(categoryData.subCategories).length > 0;
            
            if (hasSubCategories) {
                // Create subcategories container
                const subCategoriesContainer = document.createElement('div');
                subCategoriesContainer.className = 'sc-subcategories';
                subCategoriesContainer.style.display = isExpanded ? 'block' : 'none';
                
                // Sort and render subcategories
                const sortedSubCategories = Object.keys(categoryData.subCategories).sort();
                
                sortedSubCategories.forEach(subCategory => {
                    const subCategoryData = categoryData.subCategories[subCategory];
                    const subCategoryElement = renderSubCategory(subCategory, subCategoryData, settings, self);
                    subCategoriesContainer.appendChild(subCategoryElement);
                });
                
                categoryGroup.appendChild(subCategoriesContainer);
            } else if (Object.keys(categoryData.breakdowns).length > 0) {
                // Render bar directly in category if no subcategories
                const barContainer = renderResponseBar(categoryData, settings, self);
                header.appendChild(barContainer);
            }
            
            container.appendChild(categoryGroup);
        });
        
        console.log('SC Responses Visualizer: Render complete');
    }

    function toggleBreakdownDetails(row, detailsContainer, data, settings, self) {
        if (detailsContainer.style.display === 'none' || detailsContainer.style.display === '') {
            // Clear existing content
            detailsContainer.innerHTML = '';
            
            // Get the subcategory name
            const subCategoryName = row.querySelector('.sc-subcategory-name').textContent;
            const categoryGroup = row.closest('.sc-category-group');
            const categoryName = categoryGroup.querySelector('.sc-category-name').textContent;
            
            // Find the breakdown data
            let breakdownData = null;
            if (data[categoryName] && data[categoryName].subCategories[subCategoryName]) {
                breakdownData = data[categoryName].subCategories[subCategoryName].breakdowns;
            }
            
            if (breakdownData && Object.keys(breakdownData).length > 0) {
                // Sort breakdowns
                const sortedBreakdowns = Object.keys(breakdownData).map(key => ({
                    name: key,
                    value: breakdownData[key].value,
                    percentage: breakdownData[key].percentage,
                    elemNumber: breakdownData[key].elemNumber,
                    dimensionIndex: breakdownData[key].dimensionIndex
                })).sort((a, b) => b.value - a.value);
                
                // Render each breakdown
                sortedBreakdowns.forEach((breakdown, index) => {
                    const breakdownRow = document.createElement('div');
                    breakdownRow.className = 'sc-breakdown-row';
                    
                    // Color box
                    const colorBox = document.createElement('span');
                    colorBox.className = 'sc-color-box';
                    
                    // Apply conditional colors or default colors
                    const conditionalColor = getResponseColor(breakdown.name, settings);
                    if (conditionalColor) {
                        colorBox.style.backgroundColor = conditionalColor;
                    } else {
                        colorBox.style.backgroundColor = settings.colors.barColors[index % settings.colors.barColors.length];
                    }
                    
                    // Label
                    const label = document.createElement('span');
                    label.className = 'sc-breakdown-label';
                    label.textContent = breakdown.name;
                    
                    // Value
                    const value = document.createElement('span');
                    value.className = 'sc-breakdown-value';
                    value.textContent = breakdown.value;
                    
                    // Percentage
                    const percentage = document.createElement('span');
                    percentage.className = 'sc-breakdown-percentage';
                    percentage.textContent = '(' + breakdown.percentage.toFixed(2) + '%)';
                    
                    breakdownRow.appendChild(colorBox);
                    breakdownRow.appendChild(label);
                    breakdownRow.appendChild(value);
                    breakdownRow.appendChild(percentage);
                    
                    // Add click handler for selection
                    breakdownRow.style.cursor = 'pointer';
                    breakdownRow.onclick = function(e) {
                        e.stopPropagation();
                        if (self && breakdown.elemNumber >= 0) {
                            self.selectValues(breakdown.dimensionIndex, [breakdown.elemNumber], true);
                        }
                    };
                    
                    detailsContainer.appendChild(breakdownRow);
                });
                
                detailsContainer.style.display = 'block';
            } else {
                detailsContainer.innerHTML = '<div style="padding: 10px; color: #666;">No breakdown data available</div>';
                detailsContainer.style.display = 'block';
            }
        } else {
            detailsContainer.style.display = 'none';
        }
    }

    function setupEventListeners(container, data, settings, layout, self) {
        console.log('SC Responses Visualizer: Setting up event listeners');
        
        // Category header click handlers
        const categoryHeaders = container.querySelectorAll('.sc-category-header');
        categoryHeaders.forEach(header => {
            header.onclick = function(e) {
                e.stopPropagation();
                const categoryGroup = this.parentElement;
                const subCategories = categoryGroup.querySelector('.sc-subcategories');
                const expandIcon = this.querySelector('.sc-expand-icon');
                const categoryName = this.querySelector('.sc-category-name').textContent;
                
                if (subCategories) {
                    if (subCategories.style.display === 'none' || subCategories.style.display === '') {
                        subCategories.style.display = 'block';
                        expandIcon.innerHTML = '▼';
                        setExpandedState(layout.qInfo.qId, categoryName, true, settings);
                    } else {
                        subCategories.style.display = 'none';
                        expandIcon.innerHTML = '▶';
                        setExpandedState(layout.qInfo.qId, categoryName, false, settings);
                    }
                }
            };
        });
        
        // Response row click handlers
        const responseRows = container.querySelectorAll('.sc-response-row');
        responseRows.forEach(row => {
            row.onclick = function(e) {
                e.stopPropagation();
                const detailsContainer = this.querySelector('.sc-breakdown-details');
                if (detailsContainer) {
                    toggleBreakdownDetails(this, detailsContainer, data, settings, self);
                }
            };
        });
        
        console.log('SC Responses Visualizer: Event listeners setup complete');
    }

    // Return the extension definition
    return {
        initialProperties: {
            qHyperCubeDef: {
                qDimensions: [],
                qMeasures: [],
                qInitialDataFetch: [{
                    qWidth: 10,
                    qHeight: 1000
                }]
            },
            settings: {
                general: {
                    showLabels: true,
                    showPercentages: true,
                    showCounts: true,
                    animationDuration: 300,
                    defaultExpandState: 'collapsed',
                    persistExpandState: true
                },
                colors: {
                    categoryBackground: '#E8EEF7',
                    subCategoryBackground: '#F5F7FA',
                    barColors: ['#5B9BD5', '#FDB462', '#70B0E0', '#AC8DC7', '#F9B875', '#86C7F3', '#F2975A', '#B3D69F'],
                    textColor: '#333333',
                    hoverColor: '#D6E3F2',
                    enableConditionalColors: false,
                    negativeResponses: 'No,Bad,Poor,Failed,Rejected,Non-compliant',
                    negativeColor: '#E74C3C',
                    warningResponses: 'Maybe,Partial,Some Issues,Minor Issues',
                    warningColor: '#F39C12',
                    positiveColor: '#27AE60'
                },
                layout: {
                    barHeight: 24,
                    barSpacing: 1,
                    barBorderRadius: 4
                }
            }
        },

        definition: properties,

        support: {
            snapshot: true,
            export: true,
            exportData: true
        },

        paint: function($element, layout) {
            console.log('SC Responses Visualizer: Paint function called');
            console.log('Layout object:', layout);
            
            const self = this;
            const hypercube = layout.qHyperCube;
            const settings = layout.settings || this.initialProperties.settings;
            
            // Clear the element
            $element.empty();
            
            // Add debug info
            console.log('HyperCube:', hypercube);
            
            // Check if we have data
            if (!hypercube) {
                console.log('SC Responses Visualizer: No hypercube');
                $element.html('<div class="sc-no-data">No hypercube available</div>');
                return qlik.Promise.resolve();
            }
            
            if (!hypercube.qDataPages || hypercube.qDataPages.length === 0) {
                console.log('SC Responses Visualizer: No data pages');
                $element.html('<div class="sc-no-data">No data pages available</div>');
                return qlik.Promise.resolve();
            }
            
            if (!hypercube.qDataPages[0].qMatrix || hypercube.qDataPages[0].qMatrix.length === 0) {
                console.log('SC Responses Visualizer: No data in matrix');
                $element.html('<div class="sc-no-data">No data available. Please add at least 2 dimensions and 1 measure.</div>');
                return qlik.Promise.resolve();
            }

            const dataPages = hypercube.qDataPages;
            const matrix = dataPages[0].qMatrix;
            
            console.log('SC Responses Visualizer: Data received');
            console.log('Dimensions:', hypercube.qDimensionInfo.length);
            console.log('Measures:', hypercube.qMeasureInfo.length);
            console.log('Matrix rows:', matrix.length);
            console.log('First row:', matrix[0]);

            // Create container
            const containerId = 'sc-responses-viz-' + layout.qInfo.qId;
            const containerHtml = '<div id="' + containerId + '" class="sc-responses-visualizer"></div>';
            $element.html(containerHtml);
            
            // Use setTimeout to ensure DOM is ready
            setTimeout(function() {
                const container = document.getElementById(containerId);
                if (!container) {
                    console.error('SC Responses Visualizer: Container not found');
                    return;
                }

                // Process and render data
                try {
                    // Use closure-scoped functions directly
                    const data = processData(hypercube);
                    console.log('SC Responses Visualizer: Processed data', data);
                    
                    // Check if we have any data
                    if (Object.keys(data).length === 0) {
                        container.innerHTML = '<div class="sc-no-data">No data to display</div>';
                        return;
                    }
                    
                    renderVisualization(container, data, settings, layout, self);
                    
                    // Add event listeners after a delay to ensure elements exist
                    setTimeout(function() {
                        setupEventListeners(container, data, settings, layout, self);
                    }, 100);
                    
                } catch (error) {
                    console.error('SC Responses Visualizer: Error processing/rendering data', error);
                    container.innerHTML = '<div class="sc-no-data">Error: ' + error.message + '</div>';
                }
            }, 10);

            return qlik.Promise.resolve();
        }
    };
});