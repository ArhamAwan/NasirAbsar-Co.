#!/bin/bash

# Logo Optimization Script
# This script optimizes the logo.png file to WebP format

echo "Optimizing logo.png..."

# Check if imagemagick or cwebp is available
if command -v cwebp &> /dev/null; then
    echo "Using cwebp to convert logo.png to logo.webp..."
    cwebp -q 85 -m 6 public/logo.png -o public/logo.webp
    echo "✅ Created logo.webp"
elif command -v convert &> /dev/null; then
    echo "Using ImageMagick to convert logo.png to logo.webp..."
    convert public/logo.png -quality 85 -define webp:method=6 public/logo.webp
    echo "✅ Created logo.webp"
else
    echo "❌ Neither cwebp nor ImageMagick found."
    echo "Please install one of them:"
    echo "  - cwebp: brew install webp (macOS) or apt-get install webp (Linux)"
    echo "  - ImageMagick: brew install imagemagick (macOS) or apt-get install imagemagick (Linux)"
    echo ""
    echo "Alternatively, use an online tool like:"
    echo "  - https://squoosh.app/"
    echo "  - https://convertio.co/png-webp/"
    echo ""
    echo "Target size: < 10KB (currently 291KB)"
    exit 1
fi

# Check file sizes
if [ -f "public/logo.webp" ]; then
    ORIGINAL_SIZE=$(ls -lh public/logo.png | awk '{print $5}')
    NEW_SIZE=$(ls -lh public/logo.webp | awk '{print $5}')
    echo ""
    echo "Original size: $ORIGINAL_SIZE"
    echo "Optimized size: $NEW_SIZE"
    echo ""
    echo "✅ Logo optimization complete!"
fi

