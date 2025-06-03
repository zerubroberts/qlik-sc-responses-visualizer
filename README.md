# SC Responses Visualizer - Qlik Sense Extension

A powerful hierarchical response visualization extension for Qlik Sense that displays survey or assessment data in an elegant, expandable format with detailed breakdowns, rich customization options, and interactive selections.

## 🚀 Features

- **Hierarchical Data Display**: Support for 2-3 dimensions (Category, Sub-category, Response breakdown)
- **Interactive Visualization**: Expandable/collapsible categories with smooth animations
- **Interactive Selections**: Click on any response segment or breakdown item to make Qlik selections
- **Conditional Colors**: Automatically color responses based on positive/negative/warning values
- **State Persistence**: Remember expand/collapse states between sessions
- **Modern UI**: Beautiful, responsive design with Qlik Sans font
- **Rich Customization**: 40+ configuration options for colors, spacing, and layout
- **Enhanced Property Panel**: Modern UI controls with color pickers, sliders, and helpful text areas
- **Individual Segment Styling**: Apply border radius to each bar segment for pill-shaped visualization

## 📦 Installation

1. Download `sc-responses-visualizer.zip` from the [latest release](../../releases)
2. Import into Qlik Sense:
   - **Qlik Sense Desktop**: Drag and drop the ZIP file onto Qlik Sense Desktop
   - **Qlik Sense Enterprise**: Use the QMC to import the extension

## 🎯 Usage

### Data Requirements

| Type | Required | Description | Example |
|------|----------|-------------|---------|
| Dimension 1 | ✅ Yes | Main category | Store Location, Department |
| Dimension 2 | ✅ Yes | Sub-category | Question, Assessment Type |
| Dimension 3 | ⚪ Optional | Response breakdown | Yes/No, Good/Bad/Neutral |
| Measure | ✅ Yes | Count or sum | Count(ResponseID) |

### Configuration

- **Colors & Styling**: Configure conditional colors for automatic response coding
- **Animation**: Control animation speed and expand/collapse behavior
- **Layout**: Customize bar height, spacing, fonts, and borders
- **Selections**: Enable/disable interactive selections on chart elements

📖 **[Complete Usage Guide](USAGE.md)** - Detailed documentation of all 40+ customization options

## 🎨 Use Cases

- **Survey Analysis**: Visualize survey responses with automatic color coding
- **Compliance Tracking**: Track audit results and compliance status
- **Quality Assessments**: Display quality control data with clear visual indicators

## 🛠️ Development

### Building from Source
```bash
git clone https://github.com/zerubroberts/qlik-sc-responses-visualizer.git
cd qlik-sc-responses-visualizer
./build.sh
```

### Project Structure
```
sc-responses-visualizer/
├── dist/                    # Distribution files for Qlik
├── src/                     # Source code
├── README.md               # This file
├── SETUP.md                # Detailed setup instructions
├── USAGE.md                # Complete usage guide with all options
└── build.sh                # Build script
```

## 🐛 Troubleshooting

- **Extension not appearing**: Clear browser cache and refresh Qlik Sense
- **Selections not working**: Enable "Qlik Selections" in properties panel
- **Colors not applying**: Enable "Conditional Colors" and check response value keywords
- **Performance issues**: Reduce animation duration or limit data size

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Support

- **Issues**: Report bugs via [GitHub Issues](../../issues)
- **Questions**: Use [GitHub Discussions](../../discussions)

---

Built by Zerub AI for the Qlik Sense community ❤️