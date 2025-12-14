#!/bin/bash

# This script removes all version numbers from import statements
# Usage: bash fix-imports.sh

echo "Fixing versioned imports in all TypeScript files..."

# Find all .tsx and .ts files and remove version numbers from imports
find . -type f \( -name "*.tsx" -o -name "*.ts" \) ! -path "./node_modules/*" -exec sed -i 's/@[0-9]\+\.[0-9]\+\.[0-9]\+"/"/g' {} +

echo "Done! All versioned imports have been fixed."
echo "If you're on Windows, use Git Bash or WSL to run this script."
