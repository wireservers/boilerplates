// Node.js script to remove version numbers from import statements
// Usage: node fix-imports.js

const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    
    if (fs.statSync(filePath).isDirectory()) {
      // Skip node_modules
      if (file !== 'node_modules') {
        arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

function fixImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Replace versioned imports: @1.2.3" with just "
  content = content.replace(/@\d+\.\d+\.\d+"/g, '"');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

console.log('Fixing versioned imports in all TypeScript files...\n');

const allFiles = getAllFiles('.');
let fixedCount = 0;

allFiles.forEach(file => {
  if (fixImports(file)) {
    console.log(`✓ Fixed: ${file}`);
    fixedCount++;
  }
});

console.log(`\n✅ Done! Fixed ${fixedCount} file(s).`);
console.log('All versioned imports have been removed.');
