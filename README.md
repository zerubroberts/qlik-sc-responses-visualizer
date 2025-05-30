# SC Responses Visualizer - Qlik Sense Extension

A powerful hierarchical response visualization extension for Qlik Sense that displays survey or assessment data in an elegant, expandable format with detailed breakdowns, rich customization options, and interactive selections.

![SC Responses Visualizer Demo](screenshots/demo.png)

## 🚀 Features

### Core Functionality
- **Hierarchical Data Display**: Support for 2-3 dimensions (Category, Sub-category, Response breakdown)
- **Interactive Visualization**: Expandable/collapsible categories with smooth animations
- **Interactive Selections**: Click on any response segment or breakdown item to make Qlik selections
- **Detailed Breakdowns**: Click on any row to see detailed response breakdowns with counts and percentages

### Visual Design
- **Modern UI**: Beautiful, Vizlib-inspired design with Qlik Sans font
- **Smooth Animations**: Professional animations for all interactions
- **Responsive Layout**: Adapts to different screen sizes and container dimensions
- **Customizable Appearance**: Extensive styling options for colors, spacing, and layout

### Advanced Features
- **State Persistence**: Remember expand/collapse states between sessions
- **Conditional Colors**: Automatically color responses based on positive/negative/warning values
- **Rich Customization**: Extensive property panel with 40+ configuration options
- **Performance Optimized**: Handles large datasets efficiently

## 📦 Installation

### Quick Install
1. Download `sc-responses-visualizer.zip` from the [latest release](../../releases)
2. Import into Qlik Sense:
   - **Qlik Sense Desktop**: Drag and drop the ZIP file onto Qlik Sense Desktop
   - **Qlik Sense Enterprise**: Use the QMC to import the extension

### Manual Install
1. Download or clone this repository
2. Copy the `dist` folder contents to:
   - **Desktop**: `C:\Users\[Username]\Documents\Qlik\Sense\Extensions\sc-responses-visualizer\`
   - **Server**: `C:\ProgramData\Qlik\Sense\Repository\Extensions\sc-responses-visualizer\`
3. Refresh Qlik Sense

## 🎯 Usage

### Data Requirements

The extension requires 2-3 dimensions and 1 measure:

| Type | Required | Description | Example |
|------|----------|-------------|---------|
| Dimension 1 | ✅ Yes | Main category | Store Location, Department |
| Dimension 2 | ✅ Yes | Sub-category | Question, Assessment Type |
| Dimension 3 | ⚪ Optional | Response breakdown | Yes/No, Good/Bad/Neutral |
| Measure | ✅ Yes | Count or sum | Count(ResponseID) |

### Example Data Structure

```
| Category       | Sub-Category        | Response    | Count |
|----------------|-------------------- |-------------|-------|
| Store Location | Supplier Assessment | Excellent   | 22    |
| Store Location | Supplier Assessment | Good        | 20    |
| Store Location | Supplier Assessment | Poor        | 22    |
| Product        | Quality Check       | Passed      | 45    |
| Product        | Quality Check       | Failed      | 19    |
| Product        | Returns Required    | Yes         | 29    |
| Product        | Returns Required    | No          | 35    |
```

## ⚙️ Configuration

### General Settings
- **Default Expand State**: Choose between collapsed, expanded, or remember last state
- **Persist State**: Remember which categories were expanded
- **Animation Duration**: Control animation speed (0-2000ms)
- **Show Counts/Percentages**: Toggle display of values

### Colors & Styling

#### Standard Colors
- Category and sub-category background colors
- Text and hover colors
- Bar color schemes (Default, Vibrant, Pastel, Custom)

#### Conditional Colors
Enable automatic color coding based on response values:
- **Negative** (Red): No, Bad, Failed, Rejected, Non-compliant
- **Warning** (Orange): Maybe, Partial, Some Issues
- **Positive** (Green): Yes, Good, Passed, Approved

### Layout Options
- **Bar Height**: 10-100px (default: 24px)
- **Bar Spacing**: 0-10px between segments
- **Border Radius**: 0-20px for rounded corners
- **Font Size**: Small, Medium, Large, or Custom

## 🎨 Use Cases

### Survey Analysis
Perfect for visualizing survey responses:
```
Enable conditional colors with:
- Negative: "Strongly Disagree,Disagree,Never"
- Warning: "Neutral,Sometimes"
- Positive: "Agree,Strongly Agree,Always"
```

### Compliance Tracking
Ideal for audit and compliance dashboards:
```
Enable conditional colors with:
- Negative: "Non-compliant,Failed,Violation"
- Warning: "Partial,Review Required"
- Positive: "Compliant,Passed,Approved"
```

### Quality Assessments
Great for quality control visualizations:
```
Enable conditional colors with:
- Negative: "Defective,Rejected,Below Standard"
- Warning: "Acceptable,Minor Issues"
- Positive: "Excellent,Approved,Above Standard"
```

## 🛠️ Development

### Project Structure
```
sc-responses-visualizer/
├── dist/                    # Distribution files for Qlik
├── src/                     # Source code
│   ├── sc-responses-visualizer.js
│   ├── properties.js
│   └── sc-responses-visualizer.css
├── docs/                    # Documentation
├── screenshots/             # Images for documentation
├── build.sh                 # Build script
└── README.md
```

### Building from Source
```bash
# Clone the repository
git clone https://github.com/yourusername/qlik-sc-responses-visualizer.git

# Navigate to project
cd qlik-sc-responses-visualizer

# Run build script
./build.sh

# This creates sc-responses-visualizer.zip ready for Qlik
```

### Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 Version History

### v2.0.0 (Current)
- ✅ Added interactive selections on all elements
- ✅ Implemented conditional color coding
- ✅ Added state persistence
- ✅ Improved animations and layout
- ✅ Added bar customization options
- ✅ Changed to Qlik Sans font

### v1.0.0
- Initial release
- Core visualization functionality
- Basic customization options

## 🐛 Troubleshooting

### Extension not appearing
- Clear browser cache and refresh Qlik Sense
- Verify files are in correct directory
- Check browser console for errors

### Selections not working
- Ensure "Enable Qlik Selections" is on in properties
- Verify dimensions allow selections in data model

### Colors not applying
- Enable "Conditional Colors" in Colors & Styling
- Check response values match keywords (case-insensitive)

### Performance issues
- Reduce animation duration or set to 0
- Limit data with set analysis or filters
- Use Canvas rendering mode (in Advanced settings)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

- **Issues**: Report bugs via [GitHub Issues](../../issues)
- **Questions**: Use [GitHub Discussions](../../discussions)
- **Email**: support@example.com

## 🙏 Acknowledgments

- Inspired by Vizlib's beautiful visualizations
- Built for the Qlik Sense community
- Special thanks to all contributors

---

Made with ❤️ for Qlik Sense