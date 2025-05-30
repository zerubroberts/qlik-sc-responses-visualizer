# Troubleshooting Guide

## Extension Not Rendering - Quick Fix

I've updated the extension to fix common issues:
1. Removed jQuery dependency (now using vanilla JavaScript)
2. Removed D3.js dependency temporarily
3. Added extensive console logging
4. Improved error handling
5. Added DOM ready checks

**To test the updated version:**
1. Clear your browser cache
2. Refresh Qlik Sense
3. Re-add the extension to your sheet
4. Check browser console for debug messages

## Extension Not Rendering

### 1. Check Browser Console
Open the browser developer console (F12) and look for:
- Any JavaScript errors
- Console log messages starting with "SC Responses Visualizer:"

### 2. Verify Extension is Loaded
You should see in the console:
```
SC Responses Visualizer: Extension loaded
SC Responses Visualizer: Paint called
```

### 3. Check Data Structure
The extension expects:
- **Dimension 1**: Category (required)
- **Dimension 2**: Sub-Category (required)
- **Dimension 3**: Response/Breakdown (optional)
- **Measure**: Count or Sum (required)

### 4. Test with Minimal Version
1. Rename `sc-responses-visualizer.js` to `sc-responses-visualizer-full.js`
2. Rename `sc-responses-visualizer-minimal.js` to `sc-responses-visualizer.js`
3. Refresh Qlik Sense
4. This minimal version will show raw data to verify the extension is receiving data

### 5. Common Issues and Solutions

#### Nothing appears at all
- Check that all files are in the correct directory
- Ensure the extension appears in Qlik Sense's visualization panel
- Clear browser cache and refresh

#### "No data available" message
- Verify you've added at least 2 dimensions and 1 measure
- Check that your data model has the correct associations

#### JavaScript errors in console
- Note the exact error message and line number
- Common errors:
  - "Cannot read property of undefined" - data structure issue
  - "$ is not defined" - jQuery loading issue (now fixed)
  - "d3 is not defined" - D3.js loading issue (now removed)

### 6. Debug Data Flow
With the updated version, check console for:
```
Processing row 0: [row data]
Row 0: Category="X", SubCategory="Y", Breakdown="Z", Value=123
Rendering category: X
```

### 7. Quick Fixes to Try

1. **Simplify your data model** - Start with just 2 dimensions and 1 measure
2. **Use simple field names** - Avoid special characters in dimension names
3. **Check data types** - Ensure measure is numeric
4. **Test with sample data**:
   ```
   Category | SubCategory | Count
   A        | A1          | 10
   A        | A2          | 20
   B        | B1          | 15
   B        | B2          | 25
   ```

### 8. If Still Not Working

Create a test app with this simple data structure:
1. Load inline data:
   ```
   LOAD * INLINE [
   Category, SubCategory, ResponseType, Count
   Store, Location1, Good, 10
   Store, Location1, Bad, 5
   Store, Location2, Good, 15
   Store, Location2, Bad, 3
   Product, Supplier1, Approved, 20
   Product, Supplier1, Rejected, 2
   Product, Supplier2, Approved, 18
   Product, Supplier2, Rejected, 4
   ];
   ```

2. Add the extension with:
   - Dimension 1: Category
   - Dimension 2: SubCategory
   - Dimension 3: ResponseType
   - Measure: Sum(Count)

### 9. Alternative Testing
Open the `example.html` file in a browser to see how the visualization should look when working correctly.

### 10. Report Issues
If none of these solutions work, please provide:
- Browser console output
- Qlik Sense version
- Browser type and version
- Screenshot of your dimension/measure setup
- Any error messages