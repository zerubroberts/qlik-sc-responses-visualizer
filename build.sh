#!/bin/bash

# SC Responses Visualizer Build Script
# This script creates a distributable ZIP file for Qlik Sense

echo "Building SC Responses Visualizer extension..."

# Clean up any existing build
rm -f sc-responses-visualizer.zip
rm -rf dist/

# Create fresh dist folder
echo "Creating dist folder..."
mkdir -p dist

echo "Copying files to dist folder..."
cp -f sc-responses-visualizer.qext dist/
cp -f wbfolder.wbl dist/
cp -f src/sc-responses-visualizer.js dist/
cp -f src/properties.js dist/
cp -f src/sc-responses-visualizer.css dist/

# Create ZIP file from dist folder
echo "Creating ZIP file..."
cd dist
# Try zip first, fall back to tar if not available
if command -v zip &> /dev/null; then
    zip -r ../sc-responses-visualizer.zip *
else
    # Create a tar file that can be renamed to .zip for Windows
    tar -czf ../sc-responses-visualizer.tar.gz *
    echo "Note: Created tar.gz file. On Windows, you may need to use a tool like 7-Zip to create a proper ZIP file."
fi
cd ..

echo "Build complete! The extension is ready in sc-responses-visualizer.zip"
echo "Upload this file to Qlik Sense to install the extension."