# Setup & Development Guide

## Installation Options

### Option 1: Quick Install (Recommended)
1. Download `sc-responses-visualizer.zip` from [releases](https://github.com/zerubroberts/qlik-sc-responses-visualizer/releases)
2. Import into Qlik Sense:
   - **Desktop**: Drag and drop ZIP onto Qlik Sense Desktop
   - **Enterprise**: Use QMC → Extensions → Import

### Option 2: Manual Install
1. Clone or download this repository
2. Copy `dist` folder contents to:
   - **Desktop**: `C:\Users\[Username]\Documents\Qlik\Sense\Extensions\sc-responses-visualizer\`
   - **Server**: `C:\ProgramData\Qlik\Sense\Repository\Extensions\sc-responses-visualizer\`
3. Restart Qlik Sense

## Configuration Examples

### Survey Data Setup
**Dimensions:**
1. Department (Store Location, Marketing, etc.)
2. Question (How satisfied are you with...?)
3. Response (Very Satisfied, Satisfied, Neutral, etc.)

**Measure:** `Count(ResponseID)`

**Conditional Colors:**
- Negative: "Dissatisfied,Very Dissatisfied,Poor,Bad"
- Warning: "Neutral,Average,Okay"
- Positive: "Satisfied,Very Satisfied,Excellent,Good"

### Compliance Data Setup
**Dimensions:**
1. Business Unit
2. Audit Category
3. Compliance Status

**Measure:** `Count(AuditID)`

**Conditional Colors:**
- Negative: "Non-compliant,Failed,Violation"
- Warning: "Partial,Review Required"
- Positive: "Compliant,Passed,Approved"

## Development

### Building from Source
```bash
# Clone repository
git clone https://github.com/zerubroberts/qlik-sc-responses-visualizer.git
cd qlik-sc-responses-visualizer

# Linux/Mac
./build.sh

# Windows
create-zip.bat
```

### File Structure
```
sc-responses-visualizer/
├── dist/                           # Ready for Qlik import
│   ├── sc-responses-visualizer.qext
│   ├── sc-responses-visualizer.js
│   ├── sc-responses-visualizer.css
│   └── properties.js
├── src/                            # Source files
│   ├── sc-responses-visualizer.js  # Main extension code
│   ├── sc-responses-visualizer.css # Styles
│   ├── properties.js               # Property panel config
│   └── verify-fix.js               # Debug utilities
└── docs/                           # Documentation and examples
    ├── example.html                # Standalone demo
    └── test-data.txt              # Sample data
```

## Troubleshooting

### Extension Not Loading
1. **Check browser console** (F12) for errors
2. **Clear browser cache** completely
3. **Verify file structure** - all files in correct directories
4. **Check Qlik logs** for extension loading errors

### Common Issues

**"Extension not found in visualization panel"**
- Ensure `.qext` file is valid JSON
- Check file permissions (should be readable)
- Restart Qlik Sense service/application

**"White screen or no visualization"**
- Open browser console, look for JavaScript errors
- Verify data requirements (2+ dimensions, 1+ measure)
- Check if hypercube data is being received

**"Selections not working"**
- Enable "Qlik Selections" in properties → Settings
- Verify dimensions allow selections in data model
- Check selection state in Qlik associative model

**"Colors not applying correctly"**
- Enable "Conditional Colors" in properties → Colors & Styling
- Check response values match keywords (case-insensitive)
- Verify conditional color keywords are comma-separated

### Debug Mode
The extension includes extensive console logging. Enable it by:
1. Opening browser developer tools (F12)
2. Looking for messages starting with "SC Responses Visualizer:"
3. Following the debug flow to identify issues

### Performance Optimization
- **Large datasets**: Use set analysis to limit data
- **Slow animations**: Reduce animation duration in properties
- **Memory issues**: Disable state persistence for large apps

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Code Style
- Use ES5 for Qlik compatibility
- Follow existing naming conventions
- Add console logging for debugging
- Test with both 2 and 3 dimensions

## Release Process

1. Update version in `sc-responses-visualizer.qext`
2. Update `README.md` with new features
3. Run build script to create ZIP
4. Create git tag: `git tag v[version]`
5. Push with tags: `git push --tags`
6. Create GitHub release with ZIP file

---

Need help? [Open an issue](https://github.com/zerubroberts/qlik-sc-responses-visualizer/issues) or check our [discussions](https://github.com/zerubroberts/qlik-sc-responses-visualizer/discussions).