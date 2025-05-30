# SC Responses Visualizer - Complete Usage Guide

This comprehensive guide covers every feature and customization option available in the SC Responses Visualizer extension.

## 📊 Data Configuration

### Dimensions (2-3 Required)

#### Dimension 1: Category (Required)
- **Purpose**: Main grouping level for your data
- **Examples**: Department, Store Location, Business Unit
- **Best Practice**: Use categorical data with 3-20 unique values for optimal display

#### Dimension 2: Sub-Category (Required)
- **Purpose**: Secondary grouping within each category
- **Examples**: Question Text, Assessment Type, Product Line
- **Best Practice**: Can have many values; will be grouped under categories

#### Dimension 3: Response Breakdown (Optional)
- **Purpose**: Individual response options or answer choices
- **Examples**: Yes/No, Excellent/Good/Poor, Passed/Failed
- **Best Practice**: Use when you want to show response distribution within each sub-category

### Measures (1 Required)

#### Response Count/Value
- **Purpose**: Quantifies the responses or values
- **Examples**: `Count(ResponseID)`, `Sum(Score)`, `Count(distinct CustomerID)`
- **Best Practice**: Use aggregation functions appropriate for your data type

## ⚙️ General Settings

### Display Options

#### Show Labels
- **Default**: Enabled
- **Purpose**: Display category and sub-category names
- **When to disable**: For dashboard-style views where space is limited

#### Show Percentages
- **Default**: Enabled
- **Purpose**: Display percentage values alongside counts
- **Calculation**: Percentage of total within each sub-category
- **Format**: Automatically formatted with % symbol

#### Show Counts
- **Default**: Enabled
- **Purpose**: Display raw count/measure values
- **Format**: Numbers with appropriate thousand separators

### Animation & State Management

#### Animation Duration
- **Range**: 0-2000 milliseconds
- **Default**: 300ms
- **Purpose**: Controls speed of expand/collapse animations
- **Performance Tip**: Set to 0 for large datasets to improve performance

#### Default Expand State
- **All Collapsed**: All categories start collapsed
- **All Expanded**: All categories start expanded
- **Remember Last State**: Restores previous expand/collapse state

#### Persist Expand/Collapse State
- **Default**: Enabled
- **Purpose**: Remembers which categories were expanded across sessions
- **Storage**: Uses browser local storage tied to app and object ID

## 🎨 Colors & Styling

### Background Colors

#### Category Background
- **Default**: #E8EEF7 (Light blue-gray)
- **Purpose**: Background color for main category headers
- **Supports**: Hex colors, color expressions
- **Example**: `If(Category='Important', '#FFE6E6', '#E8EEF7')`

#### Sub-Category Background
- **Default**: #F5F7FA (Very light gray)
- **Purpose**: Background color for sub-category rows
- **Best Practice**: Use lighter shade than category background

#### Text Color
- **Default**: #333333 (Dark gray)
- **Purpose**: Color for all text elements
- **Accessibility**: Ensure sufficient contrast with background colors

#### Hover Color
- **Default**: #D6E3F2 (Light blue)
- **Purpose**: Background color when hovering over interactive elements
- **Best Practice**: Choose a color that indicates interactivity

### Bar Color Schemes

#### Default Scheme
- Professional blue-orange palette
- Suitable for business dashboards
- Colors: #5B9BD5, #FDB462, #70B0E0, #AC8DC7, etc.

#### Vibrant Scheme
- High-contrast, saturated colors
- Great for presentations and public displays
- Colors: Bright blues, oranges, greens, purples

#### Pastel Scheme
- Soft, muted colors
- Ideal for reports and documentation
- Colors: Light, desaturated versions of primary colors

#### Monochrome Scheme
- Single-color gradient
- Best for minimalist designs
- Colors: Variations of blue or gray

#### Custom Scheme
- **Format**: Comma-separated hex colors
- **Example**: `#FF6B6B,#4ECDC4,#45B7D1,#96CEB4,#FFEAA7`
- **Best Practice**: Use 6-12 colors for adequate variety

### Bar Opacity
- **Range**: 0.1 - 1.0
- **Default**: 1.0 (fully opaque)
- **Purpose**: Adjust transparency of response bars
- **Use Case**: Create layered visual effects or subtle emphasis

### Conditional Colors

#### Enable Conditional Colors
- **Default**: Disabled
- **Purpose**: Automatically color responses based on their meaning
- **Override**: Takes precedence over standard color schemes

#### Negative Responses
- **Default Keywords**: "No,Bad,Poor,Failed,Rejected,Non-compliant"
- **Default Color**: #E74C3C (Red)
- **Case Sensitivity**: Keywords are case-insensitive
- **Format**: Comma-separated list of exact text matches

#### Warning Responses
- **Default Keywords**: "Maybe,Partial,Some Issues,Minor Issues"
- **Default Color**: #F39C12 (Orange)
- **Purpose**: Indicates caution or intermediate status

#### Positive Responses
- **Default Color**: #27AE60 (Green)
- **Auto-Detection**: Any response not matching negative or warning keywords
- **Examples**: "Yes,Good,Excellent,Passed,Approved,Compliant"

### Conditional Color Examples

#### Survey Responses
```
Negative: "Strongly Disagree,Disagree,Very Dissatisfied,Poor"
Warning: "Neutral,Neither,No Opinion,Unsure"
Positive: "Agree,Strongly Agree,Satisfied,Very Satisfied,Excellent"
```

#### Quality Control
```
Negative: "Defective,Rejected,Failed,Below Standard"
Warning: "Acceptable,Minor Issues,Requires Review"
Positive: "Excellent,Approved,Exceeds Standard,Perfect"
```

#### Compliance Audit
```
Negative: "Non-compliant,Violation,Critical Finding,Failed"
Warning: "Partial Compliance,Minor Finding,Improvement Needed"
Positive: "Fully Compliant,Passed,Exceeds Requirements"
```

## 📋 Sorting Options

### Category Sort Order
- **Alphabetical (A-Z)**: Standard alphabetical ordering
- **Reverse Alphabetical (Z-A)**: Reverse alphabetical ordering
- **By Value (High to Low)**: Sort by total response count/value, largest first
- **By Value (Low to High)**: Sort by total response count/value, smallest first

### Sub-Category Sort Order
- Same options as Category Sort
- Applied within each category independently
- **Best Practice**: Use "By Value" for insights, "Alphabetical" for consistency

### Breakdown Sort Order
- **By Value (High to Low)**: Most common responses first
- **By Percentage**: Sort by percentage within sub-category
- **Alphabetical**: Consistent ordering regardless of values

## 💬 Tooltip Settings

### Enable Tooltips
- **Default**: Enabled
- **Purpose**: Show detailed information on hover
- **Mobile**: Automatically disabled on touch devices

### Show Value in Tooltip
- **Default**: Enabled
- **Purpose**: Display raw count/measure value
- **Format**: Automatically formatted with appropriate separators

### Show Percentage in Tooltip
- **Default**: Enabled
- **Purpose**: Display percentage of total within sub-category
- **Calculation**: Rounded to 1 decimal place

### Custom Tooltip Format
- **Purpose**: Create personalized tooltip messages
- **Format**: Use expressions and variables
- **Example**: `'Response: ' & [Response] & ' (Count: ' & Sum([Count]) & ')'`
- **Variables Available**: All dimension and measure values in scope

## 📐 Layout & Spacing

### Padding Options

#### Category Padding
- **Range**: 0-50 pixels
- **Default**: 15px
- **Purpose**: Internal spacing within category headers
- **Impact**: Affects overall height and visual hierarchy

#### Sub-Category Padding
- **Range**: 0-50 pixels
- **Default**: 10px
- **Purpose**: Internal spacing within sub-category rows
- **Best Practice**: Use less padding than categories for clear hierarchy

### Bar Customization

#### Bar Height
- **Range**: 10-100 pixels
- **Default**: 24px
- **Purpose**: Controls height of response bars
- **Performance**: Larger bars may impact scrolling on large datasets

#### Bar Segment Spacing
- **Range**: 0-10 pixels
- **Default**: 1px
- **Purpose**: Gap between different response segments within a bar
- **Visual Impact**: Larger spacing creates more distinct segments

#### Bar Border Radius
- **Range**: 0-20 pixels
- **Default**: 4px
- **Purpose**: Rounded corners for response bars
- **Design**: 0 = sharp corners, higher values = more rounded

### Typography

#### Font Size Presets
- **Small**: 12px - Compact displays
- **Medium**: 14px - Standard readability
- **Large**: 16px - Enhanced accessibility
- **Custom**: 8-30px - Complete control

#### Custom Font Size
- **Available**: When "Custom" font size is selected
- **Range**: 8-30 pixels
- **Accessibility**: Minimum 12px recommended for readability

#### Font Family
- **Default**: "QlikView Sans, Arial, sans-serif"
- **Purpose**: Consistent typography with Qlik Sense theme
- **Customization**: Any valid CSS font stack
- **Web Fonts**: Can reference Google Fonts or other web fonts

## 🖱️ Interactions

### Enable Qlik Selections
- **Default**: Enabled
- **Purpose**: Allow clicking elements to make selections in Qlik data model
- **Scope**: Works on categories, sub-categories, and response segments
- **Behavior**: Single-click selects, Ctrl+click for multiple selections

### Enable Hover Effects
- **Default**: Enabled
- **Purpose**: Visual feedback when hovering over interactive elements
- **Performance**: Can be disabled for better performance on large datasets
- **Mobile**: Automatically adapted for touch interfaces

### Click to Expand Details
- **Default**: Enabled
- **Purpose**: Click category headers to expand/collapse sub-categories
- **Alternative**: Use expand/collapse icons if disabled
- **UX**: Provides larger click targets for easier interaction

### Allow Multiple Expanded Items
- **Default**: Enabled
- **Purpose**: Allow multiple categories to be expanded simultaneously
- **Alternative**: Accordion-style behavior (only one expanded at a time)
- **Use Case**: Disable for focused analysis, enable for comparison

## 🔧 Advanced Settings

### Rendering Mode

#### SVG Rendering
- **Default**: Selected
- **Advantages**: Better quality, scalable, crisp text
- **Best For**: Small to medium datasets, print-quality output
- **Performance**: May be slower with very large datasets

#### Canvas Rendering
- **Advantages**: Better performance, faster rendering
- **Best For**: Large datasets, real-time updates
- **Limitations**: May have slightly lower text quality

### Performance Options

#### Maximum Items to Display
- **Range**: 10-1000 items
- **Default**: 100
- **Purpose**: Limits total number of categories and sub-categories displayed
- **Behavior**: Shows highest-value items first when limit is reached

#### Group Small Values
- **Default**: Disabled
- **Purpose**: Combines small response values into an "Others" category
- **Benefit**: Reduces visual clutter and improves performance

#### Small Value Threshold
- **Range**: 0.1-10%
- **Default**: 1%
- **Purpose**: Defines what constitutes a "small" value for grouping
- **Calculation**: Percentage of total value across all responses

## 🎯 Best Practices by Use Case

### Survey Analysis
```
✅ Enable conditional colors
✅ Use 3 dimensions (Department, Question, Response)
✅ Sort by value to highlight problem areas
✅ Show both counts and percentages
✅ Use descriptive conditional color keywords
```

### Performance Dashboards
```
✅ Use vibrant color scheme
✅ Enable animations for engaging experience
✅ Sort categories by value (worst performance first)
✅ Group small values to focus on major issues
✅ Use custom tooltips with additional context
```

### Compliance Reports
```
✅ Enable conditional colors with compliance-specific keywords
✅ Use monochrome or professional color schemes
✅ Disable animations for static report feel
✅ Show counts but consider hiding percentages
✅ Use alphabetical sorting for consistency
```

### Executive Summaries
```
✅ Use default collapsed state
✅ Group small values to focus on key findings
✅ Use large font sizes for better readability
✅ Enable hover effects for interactive exploration
✅ Custom color scheme matching brand colors
```

## 🚀 Performance Optimization

### For Large Datasets (1000+ rows)
- Set animation duration to 0
- Use Canvas rendering mode
- Enable "Group Small Values"
- Limit maximum items to 50-100
- Consider using set analysis to pre-filter data

### For Real-time Dashboards
- Disable state persistence
- Use simple color schemes
- Minimize custom expressions
- Cache calculated fields in data model

### For Mobile Devices
- Increase bar height to 30-40px
- Use large font sizes
- Increase padding for better touch targets
- Simplify tooltips

## 🔍 Troubleshooting Common Issues

### Colors Not Applying
1. Check conditional color keywords match exact response text
2. Verify conditional colors are enabled
3. Ensure custom colors are valid hex codes
4. Check for conflicting style sheets

### Poor Performance
1. Reduce animation duration or disable
2. Switch to Canvas rendering
3. Enable small value grouping
4. Limit maximum items displayed

### Selection Issues
1. Verify "Enable Qlik Selections" is on
2. Check dimensions allow selections in data model
3. Test with simplified data structure
4. Clear selections and retry

### Layout Problems
1. Verify container has adequate height
2. Check for CSS conflicts
3. Test with default settings first
4. Ensure proper data structure

---

For additional support, please visit our [GitHub repository](https://github.com/zerubroberts/qlik-sc-responses-visualizer) or contact support through the [Issues](https://github.com/zerubroberts/qlik-sc-responses-visualizer/issues) page.