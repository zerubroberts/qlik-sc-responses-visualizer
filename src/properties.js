define([], function() {
    'use strict';

    var dimensions = {
        uses: "dimensions",
        min: 2,
        max: 3,
        items: {
            categoryDimension: {
                label: "Category",
                description: "Main category dimension",
                isDefault: true
            },
            subCategoryDimension: {
                label: "Sub-Category",
                description: "Sub-category dimension (optional)"
            },
            breakdownDimension: {
                label: "Response Breakdown",
                description: "Dimension to breakdown responses by"
            }
        }
    };

    var measures = {
        uses: "measures",
        min: 1,
        max: 1,
        items: {
            responseMeasure: {
                label: "Response Count",
                description: "Measure for counting responses"
            }
        }
    };

    var sorting = {
        uses: "sorting"
    };

    var generalSection = {
        type: "items",
        label: "General Settings",
        items: {
            showLabels: {
                type: "boolean",
                label: "Show Labels",
                ref: "settings.general.showLabels",
                defaultValue: true
            },
            showPercentages: {
                type: "boolean",
                label: "Show Percentages",
                ref: "settings.general.showPercentages",
                defaultValue: true
            },
            showCounts: {
                type: "boolean",
                label: "Show Counts",
                ref: "settings.general.showCounts",
                defaultValue: true
            },
            animationDuration: {
                type: "number",
                label: "Animation Duration (ms)",
                ref: "settings.general.animationDuration",
                defaultValue: 300,
                min: 0,
                max: 2000
            },
            defaultExpandState: {
                type: "string",
                component: "dropdown",
                label: "Default Expand State",
                ref: "settings.general.defaultExpandState",
                options: [{
                    value: "collapsed",
                    label: "All Collapsed"
                }, {
                    value: "expanded",
                    label: "All Expanded"
                }, {
                    value: "remember",
                    label: "Remember Last State"
                }],
                defaultValue: "collapsed"
            },
            persistExpandState: {
                type: "boolean",
                label: "Persist Expand/Collapse State",
                ref: "settings.general.persistExpandState",
                defaultValue: true
            }
        }
    };

    var colorSection = {
        type: "items",
        label: "Colors & Styling",
        items: {
            categoryBackground: {
                type: "object",
                component: "color-picker",
                label: "Category Background Color",
                ref: "settings.colors.categoryBackground",
                defaultValue: {
                    color: "#E8EEF7"
                },
                dualOutput: true
            },
            subCategoryBackground: {
                type: "object",
                component: "color-picker",
                label: "Sub-Category Background Color",
                ref: "settings.colors.subCategoryBackground",
                defaultValue: {
                    color: "#F5F7FA"
                },
                dualOutput: true
            },
            textColor: {
                type: "object",
                component: "color-picker",
                label: "Text Color",
                ref: "settings.colors.textColor",
                defaultValue: {
                    color: "#333333"
                },
                dualOutput: true
            },
            hoverColor: {
                type: "object",
                component: "color-picker",
                label: "Hover Color",
                ref: "settings.colors.hoverColor",
                defaultValue: {
                    color: "#D6E3F2"
                },
                dualOutput: true
            },
            barColorScheme: {
                type: "string",
                component: "dropdown",
                label: "Bar Color Scheme",
                ref: "settings.colors.barColorScheme",
                options: [{
                    value: "default",
                    label: "Default"
                }, {
                    value: "vibrant",
                    label: "Vibrant"
                }, {
                    value: "pastel",
                    label: "Pastel"
                }, {
                    value: "monochrome",
                    label: "Monochrome"
                }, {
                    value: "custom",
                    label: "Custom"
                }],
                defaultValue: "default"
            },
            customBarColors: {
                type: "string",
                label: "Custom Bar Colors (comma-separated)",
                ref: "settings.colors.customBarColors",
                defaultValue: "#5B9BD5,#FDB462,#70B0E0,#AC8DC7,#F9B875,#86C7F3,#F2975A,#B3D69F",
                show: function(data) {
                    return data.settings && data.settings.colors && data.settings.colors.barColorScheme === "custom";
                }
            },
            barOpacity: {
                type: "number",
                component: "slider",
                label: "Bar Opacity",
                ref: "settings.colors.barOpacity",
                defaultValue: 1,
                min: 0.1,
                max: 1,
                step: 0.1
            },
            enableConditionalColors: {
                type: "boolean",
                label: "Enable Conditional Colors",
                ref: "settings.colors.enableConditionalColors",
                defaultValue: false
            },
            negativeResponsesHelp: {
                component: "text",
                label: "Enter negative response keywords separated by commas. Example: No, Bad, Poor",
                show: function(data) {
                    return data.settings && data.settings.colors && data.settings.colors.enableConditionalColors;
                }
            },
            negativeResponses: {
                type: "string",
                component: "textarea",
                label: "Negative Responses",
                ref: "settings.colors.negativeResponses",
                defaultValue: "No,Bad,Poor,Failed,Rejected,Non-compliant",
                rows: 3,
                show: function(data) {
                    return data.settings && data.settings.colors && data.settings.colors.enableConditionalColors;
                }
            },
            negativeColor: {
                type: "object",
                component: "color-picker",
                label: "Negative Response Color",
                ref: "settings.colors.negativeColor",
                defaultValue: {
                    color: "#E74C3C"
                },
                dualOutput: true,
                show: function(data) {
                    return data.settings && data.settings.colors && data.settings.colors.enableConditionalColors;
                }
            },
            warningResponsesHelp: {
                component: "text",
                label: "Enter warning response keywords separated by commas. Example: Maybe, Partial",
                show: function(data) {
                    return data.settings && data.settings.colors && data.settings.colors.enableConditionalColors;
                }
            },
            warningResponses: {
                type: "string",
                component: "textarea",
                label: "Warning Responses",
                ref: "settings.colors.warningResponses",
                defaultValue: "Maybe,Partial,Some Issues,Minor Issues",
                rows: 3,
                show: function(data) {
                    return data.settings && data.settings.colors && data.settings.colors.enableConditionalColors;
                }
            },
            warningColor: {
                type: "object",
                component: "color-picker",
                label: "Warning Response Color",
                ref: "settings.colors.warningColor",
                defaultValue: {
                    color: "#F39C12"
                },
                dualOutput: true,
                show: function(data) {
                    return data.settings && data.settings.colors && data.settings.colors.enableConditionalColors;
                }
            },
            positiveColor: {
                type: "object",
                component: "color-picker",
                label: "Positive Response Color",
                ref: "settings.colors.positiveColor",
                defaultValue: {
                    color: "#27AE60"
                },
                dualOutput: true,
                show: function(data) {
                    return data.settings && data.settings.colors && data.settings.colors.enableConditionalColors;
                }
            }
        }
    };

    var sortingSection = {
        type: "items",
        label: "Sorting Options",
        items: {
            categorySort: {
                type: "string",
                component: "dropdown",
                label: "Category Sort Order",
                ref: "settings.sorting.categorySort",
                options: [{
                    value: "alphabetical",
                    label: "Alphabetical (A-Z)"
                }, {
                    value: "reverse-alphabetical",
                    label: "Reverse Alphabetical (Z-A)"
                }, {
                    value: "value",
                    label: "By Value (High to Low)"
                }, {
                    value: "value-asc",
                    label: "By Value (Low to High)"
                }],
                defaultValue: "alphabetical"
            },
            subCategorySort: {
                type: "string",
                component: "dropdown",
                label: "Sub-Category Sort Order",
                ref: "settings.sorting.subCategorySort",
                options: [{
                    value: "alphabetical",
                    label: "Alphabetical (A-Z)"
                }, {
                    value: "reverse-alphabetical",
                    label: "Reverse Alphabetical (Z-A)"
                }, {
                    value: "value",
                    label: "By Value (High to Low)"
                }, {
                    value: "value-asc",
                    label: "By Value (Low to High)"
                }],
                defaultValue: "alphabetical"
            },
            breakdownSort: {
                type: "string",
                component: "dropdown",
                label: "Breakdown Sort Order",
                ref: "settings.sorting.breakdownSort",
                options: [{
                    value: "value",
                    label: "By Value (High to Low)"
                }, {
                    value: "percentage",
                    label: "By Percentage"
                }, {
                    value: "alphabetical",
                    label: "Alphabetical"
                }],
                defaultValue: "value"
            }
        }
    };

    var tooltipSection = {
        type: "items",
        label: "Tooltip Settings",
        items: {
            enabled: {
                type: "boolean",
                label: "Enable Tooltips",
                ref: "settings.tooltip.enabled",
                defaultValue: true
            },
            showValue: {
                type: "boolean",
                label: "Show Value in Tooltip",
                ref: "settings.tooltip.showValue",
                defaultValue: true,
                show: function(data) {
                    return data.settings && data.settings.tooltip && data.settings.tooltip.enabled;
                }
            },
            showPercentage: {
                type: "boolean",
                label: "Show Percentage in Tooltip",
                ref: "settings.tooltip.showPercentage",
                defaultValue: true,
                show: function(data) {
                    return data.settings && data.settings.tooltip && data.settings.tooltip.enabled;
                }
            },
            customFormat: {
                type: "string",
                label: "Custom Tooltip Format",
                ref: "settings.tooltip.customFormat",
                defaultValue: "",
                expression: "optional",
                show: function(data) {
                    return data.settings && data.settings.tooltip && data.settings.tooltip.enabled;
                }
            }
        }
    };

    var layoutSection = {
        type: "items",
        label: "Layout & Spacing",
        items: {
            categoryPadding: {
                type: "number",
                component: "slider",
                label: "Category Padding (px)",
                ref: "settings.layout.categoryPadding",
                defaultValue: 15,
                min: 0,
                max: 50,
                step: 1
            },
            subCategoryPadding: {
                type: "number",
                component: "slider",
                label: "Sub-Category Padding (px)",
                ref: "settings.layout.subCategoryPadding",
                defaultValue: 10,
                min: 0,
                max: 50,
                step: 1
            },
            barHeight: {
                type: "number",
                component: "slider",
                label: "Bar Height (px)",
                ref: "settings.layout.barHeight",
                defaultValue: 24,
                min: 10,
                max: 100,
                step: 1
            },
            barSpacing: {
                type: "number",
                component: "slider",
                label: "Bar Segment Spacing (px)",
                ref: "settings.layout.barSpacing",
                defaultValue: 1,
                min: 0,
                max: 10,
                step: 0.5
            },
            barBorderRadius: {
                type: "number",
                component: "slider",
                label: "Bar Border Radius (px)",
                ref: "settings.layout.barBorderRadius",
                defaultValue: 4,
                min: 0,
                max: 20,
                step: 1
            },
            segmentBorderRadius: {
                type: "number",
                component: "slider",
                label: "Segment Border Radius (px)",
                ref: "settings.layout.segmentBorderRadius",
                defaultValue: 0,
                min: 0,
                max: 20,
                step: 1
            },
            fontSize: {
                type: "string",
                component: "dropdown",
                label: "Font Size",
                ref: "settings.layout.fontSize",
                options: [{
                    value: "small",
                    label: "Small"
                }, {
                    value: "medium",
                    label: "Medium"
                }, {
                    value: "large",
                    label: "Large"
                }, {
                    value: "custom",
                    label: "Custom"
                }],
                defaultValue: "medium"
            },
            customFontSize: {
                type: "number",
                label: "Custom Font Size (px)",
                ref: "settings.layout.customFontSize",
                defaultValue: 14,
                min: 8,
                max: 30,
                show: function(data) {
                    return data.settings && data.settings.layout && data.settings.layout.fontSize === "custom";
                }
            },
            fontFamily: {
                type: "string",
                label: "Font Family",
                ref: "settings.layout.fontFamily",
                defaultValue: "QlikView Sans, Arial, sans-serif"
            }
        }
    };

    var interactionSection = {
        type: "items",
        label: "Interactions",
        items: {
            enableSelection: {
                type: "boolean",
                label: "Enable Qlik Selections",
                ref: "settings.interaction.enableSelection",
                defaultValue: true
            },
            hoverEffects: {
                type: "boolean",
                label: "Enable Hover Effects",
                ref: "settings.interaction.hoverEffects",
                defaultValue: true
            },
            clickToExpand: {
                type: "boolean",
                label: "Click to Expand Details",
                ref: "settings.interaction.clickToExpand",
                defaultValue: true
            },
            multiExpand: {
                type: "boolean",
                label: "Allow Multiple Expanded Items",
                ref: "settings.interaction.multiExpand",
                defaultValue: true
            }
        }
    };

    var advancedSection = {
        type: "items",
        label: "Advanced Settings",
        items: {
            renderingMode: {
                type: "string",
                component: "dropdown",
                label: "Rendering Mode",
                ref: "settings.advanced.renderingMode",
                options: [{
                    value: "svg",
                    label: "SVG (Better quality)"
                }, {
                    value: "canvas",
                    label: "Canvas (Better performance)"
                }],
                defaultValue: "svg"
            },
            maxItems: {
                type: "number",
                label: "Maximum Items to Display",
                ref: "settings.advanced.maxItems",
                defaultValue: 100,
                min: 10,
                max: 1000
            },
            groupSmallValues: {
                type: "boolean",
                label: "Group Small Values",
                ref: "settings.advanced.groupSmallValues",
                defaultValue: false
            },
            smallValueThreshold: {
                type: "number",
                label: "Small Value Threshold (%)",
                ref: "settings.advanced.smallValueThreshold",
                defaultValue: 1,
                min: 0.1,
                max: 10,
                step: 0.1,
                show: function(data) {
                    return data.settings && data.settings.advanced && data.settings.advanced.groupSmallValues;
                }
            }
        }
    };

    var addons = {
        uses: "addons",
        items: {
            dataHandling: {
                uses: "dataHandling"
            }
        }
    };

    var appearancePanel = {
        uses: "settings",
        items: {
            general: generalSection,
            colors: colorSection,
            sorting: sortingSection,
            tooltip: tooltipSection,
            layout: layoutSection,
            interaction: interactionSection,
            advanced: advancedSection
        }
    };

    return {
        type: "items",
        component: "accordion",
        items: {
            dimensions: dimensions,
            measures: measures,
            sorting: sorting,
            appearance: appearancePanel,
            addons: addons
        }
    };
});