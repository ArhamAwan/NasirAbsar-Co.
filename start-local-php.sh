#!/bin/bash

# Simple script to start PHP server for local testing

echo "Starting PHP server for local testing..."
echo ""

# Check if PHP is installed
if ! command -v php &> /dev/null; then
    echo "❌ PHP is not installed!"
    echo "Install PHP or use XAMPP/MAMP"
    exit 1
fi

# Check if dist folder exists
if [ ! -d "dist" ]; then
    echo "❌ dist folder not found!"
    echo "Run 'npm run build' first"
    exit 1
fi

# Start PHP server
echo "✅ Starting PHP server on http://localhost:8000"
echo "📁 Serving from: $(pwd)/dist"
echo ""
echo "Press Ctrl+C to stop"
echo ""

cd dist
php -S localhost:8000

