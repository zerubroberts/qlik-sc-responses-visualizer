define(['qlik', 'css!./sc-responses-visualizer.css'],
function(qlik) {
    'use strict';

    return {
        initialProperties: {
            qHyperCubeDef: {
                qDimensions: [],
                qMeasures: [],
                qInitialDataFetch: [{
                    qWidth: 10,
                    qHeight: 1000
                }]
            }
        },

        definition: {
            type: "items",
            component: "accordion",
            items: {
                dimensions: {
                    uses: "dimensions",
                    min: 1,
                    max: 3
                },
                measures: {
                    uses: "measures",
                    min: 1,
                    max: 1
                },
                settings: {
                    uses: "settings"
                }
            }
        },

        support: {
            snapshot: true,
            export: true,
            exportData: false
        },

        paint: function($element, layout) {
            console.log('Paint called with layout:', layout);
            
            // Clear the element
            const html = ['<div class="sc-responses-visualizer">'];
            
            // Check if we have data
            if (!layout.qHyperCube || !layout.qHyperCube.qDataPages || !layout.qHyperCube.qDataPages[0]) {
                html.push('<div class="sc-no-data">Please add dimensions and a measure</div>');
            } else {
                const matrix = layout.qHyperCube.qDataPages[0].qMatrix;
                const dimensions = layout.qHyperCube.qDimensionInfo;
                
                html.push('<div style="padding: 10px;">');
                html.push('<h3>Data Received:</h3>');
                html.push('<p>Dimensions: ' + dimensions.length + '</p>');
                html.push('<p>Rows: ' + matrix.length + '</p>');
                
                // Show first few rows
                html.push('<div style="margin-top: 10px;">');
                matrix.slice(0, 5).forEach((row, i) => {
                    html.push('<div style="padding: 5px; background: #f0f0f0; margin: 2px;">');
                    html.push('Row ' + i + ': ');
                    row.forEach((cell, j) => {
                        const value = cell.qText || cell.qNum || 'null';
                        html.push('[' + value + '] ');
                    });
                    html.push('</div>');
                });
                html.push('</div>');
                
                html.push('</div>');
            }
            
            html.push('</div>');
            $element.html(html.join(''));
            
            return qlik.Promise.resolve();
        }
    };
});