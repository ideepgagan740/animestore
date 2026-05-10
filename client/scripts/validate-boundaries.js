#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const files = [];
const errors = [];

function walk(dir) {
  for (const item of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) walk(fullPath);
    if (stat.isFile() && /\.(ts|tsx)$/.test(item)) files.push(fullPath);
  }
}

function moduleNameFromFile(filePath) {
  const relative = path.relative(srcDir, filePath).replace(/\\/g, '/');
  const match = relative.match(/^modules\/([^/]+)\//);
  return match?.[1] ?? null;
}

walk(srcDir);

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const currentModule = moduleNameFromFile(file);
  const importMatches = content.matchAll(/from ['"](@modules\/[^'"]+)['"]/g);

  for (const match of importMatches) {
    const importPath = match[1];
    const targetModule = importPath.split('/')[1];
    const importsOtherModuleInternal = currentModule && targetModule !== currentModule && importPath.split('/').length > 2;

    if (importsOtherModuleInternal) {
      errors.push(`${path.relative(process.cwd(), file)} imports ${importPath}. Use @modules/${targetModule} public API instead.`);
    }
  }
}

if (errors.length) {
  console.error('\nArchitecture boundary violations found:\n');
  errors.forEach((error) => console.error(`- ${error}`));
  console.error('\nFix: expose needed symbols from the target module index.ts and import @modules/<feature>.');
  process.exit(1);
}

console.log('Architecture boundaries validated successfully.');
