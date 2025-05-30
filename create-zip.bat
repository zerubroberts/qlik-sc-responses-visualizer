@echo off
REM SC Responses Visualizer - Windows Build Script
REM This script creates a ZIP file for Qlik Sense using PowerShell

echo Building SC Responses Visualizer extension...

REM Remove old ZIP if exists
if exist sc-responses-visualizer.zip del sc-responses-visualizer.zip

REM Create ZIP using PowerShell
echo Creating ZIP file...
powershell -Command "Compress-Archive -Path dist\* -DestinationPath sc-responses-visualizer.zip -Force"

echo.
echo Build complete! The extension is ready in sc-responses-visualizer.zip
echo Upload this file to Qlik Sense to install the extension.
pause