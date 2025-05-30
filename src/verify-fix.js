// Quick verification script to run in browser console
// This will help verify the extension is working correctly

(function() {
    console.log('=== SC Responses Visualizer Verification ===');
    
    // Check if extension container exists
    const containers = document.querySelectorAll('.sc-responses-visualizer');
    console.log('Extension containers found:', containers.length);
    
    if (containers.length === 0) {
        console.error('❌ No extension containers found. Extension may not be loaded.');
        return;
    }
    
    // Check for error messages
    const errors = document.querySelectorAll('.sc-no-data');
    if (errors.length > 0) {
        console.warn('⚠️ Error messages found:');
        errors.forEach(err => console.log('  -', err.textContent));
    }
    
    // Check for rendered categories
    const categories = document.querySelectorAll('.sc-category-group');
    console.log('✓ Categories rendered:', categories.length);
    
    // Check for subcategories
    const subcategories = document.querySelectorAll('.sc-subcategory-group');
    console.log('✓ Subcategories rendered:', subcategories.length);
    
    // Check for response bars
    const bars = document.querySelectorAll('.sc-response-bar');
    console.log('✓ Response bars rendered:', bars.length);
    
    // Test interaction
    if (categories.length > 0) {
        console.log('\n🧪 Testing interactions...');
        const firstHeader = document.querySelector('.sc-category-header');
        if (firstHeader) {
            console.log('  Clicking first category header...');
            firstHeader.click();
            
            setTimeout(() => {
                const expanded = document.querySelector('.sc-subcategories[style*="block"]');
                if (expanded) {
                    console.log('  ✓ Category expanded successfully!');
                } else {
                    console.log('  ❌ Category did not expand');
                }
            }, 100);
        }
    }
    
    console.log('\n✅ Verification complete!');
    console.log('If you see categories and bars above, the extension is working correctly.');
})();