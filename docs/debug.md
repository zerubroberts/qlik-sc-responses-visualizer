# Debug Steps for SC Responses Visualizer

## 1. What You Should See in Console

When the extension loads correctly, you should see these messages in order:

```
SC Responses Visualizer: Extension loaded successfully
SC Responses Visualizer: Paint function called
Layout object: {qInfo: {...}, qHyperCube: {...}, ...}
SC Responses Visualizer: Data received
Dimensions: 2 (or 3)
Measures: 1
Matrix rows: [number]
First row: [array of cell data]
SC Responses Visualizer: Starting data processing
Row 0: Cat="...", SubCat="...", Break="...", Val=...
...
SC Responses Visualizer: Data processing complete
SC Responses Visualizer: Processed data {Category1: {...}, Category2: {...}}
SC Responses Visualizer: Starting render
Rendering category: Category1
...
SC Responses Visualizer: Render complete
SC Responses Visualizer: Setting up event listeners
SC Responses Visualizer: Event listeners setup complete
```

## 2. Common Error Messages and Solutions

### "No hypercube available"
- Extension is not receiving data from Qlik
- Solution: Ensure you've added dimensions and measures

### "At least 2 dimensions are required"
- You've only added 1 dimension
- Solution: Add a second dimension (SubCategory)

### "At least 1 measure is required"
- No measure has been added
- Solution: Add a measure like Count() or Sum()

### "Container not found"
- DOM element creation failed
- Solution: Clear cache and refresh

## 3. Quick Test

1. Open browser console (F12)
2. Add the extension to a sheet
3. Add these simple fields:
   - Dimension 1: Any field with categories
   - Dimension 2: Any field with subcategories
   - Measure: Count(1) or any numeric field
4. Look for console messages

## 4. If Nothing Appears

Try this minimal test:
1. Create a new app
2. Load inline data from test-data.qvs
3. Add extension with:
   - Dim1: Category
   - Dim2: SubCategory
   - Measure: Sum(ResponseCount)

## 5. Still Not Working?

Run this in the browser console while on the Qlik sheet:
```javascript
// Check if extension is loaded
console.log('Extension loaded:', typeof define !== 'undefined');

// Check jQuery availability
console.log('jQuery available:', typeof $ !== 'undefined');

// Check Qlik API
console.log('Qlik available:', typeof qlik !== 'undefined');
```

Share the results along with any error messages.