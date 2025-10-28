#!/bin/bash

#############################################
# Auth0 ACUL Manifest Validator
# Clean, readable validation script
#############################################

set -e

# Default values
MANIFEST_PATH="${MANIFEST_PATH:-./manifest.json}"
STRICT_MODE="${STRICT_MODE:-true}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
ERRORS=0
WARNINGS=0

echo -e "${BLUE}🔍 Auth0 ACUL Manifest Validation${NC}"
echo "=================================="
echo "Manifest: $MANIFEST_PATH"
echo "Strict Mode: $STRICT_MODE"
echo ""

#############################################
# BASIC CHECKS
#############################################

echo -e "${BLUE}📋 Running basic checks...${NC}"

# Check if manifest exists
if [ ! -f "$MANIFEST_PATH" ]; then
    echo -e "${RED}❌ Manifest file not found: $MANIFEST_PATH${NC}"
    exit 1
fi

# Validate JSON syntax
if ! node -e "JSON.parse(require('fs').readFileSync('$MANIFEST_PATH', 'utf8'))" 2>/dev/null; then
    echo -e "${RED}❌ Invalid JSON in manifest file${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Basic checks passed${NC}"

#############################################
# MANIFEST VALIDATION
#############################################

echo ""
echo -e "${BLUE}📋 Validating manifest structure...${NC}"

# Validate required top-level properties
if ! node -e "
const manifest = JSON.parse(require('fs').readFileSync('$MANIFEST_PATH', 'utf8'));
if (!manifest.templates) throw new Error('Missing templates property');
if (!manifest.metadata) throw new Error('Missing metadata property');
console.log('✅ Required properties found');
" 2>/dev/null; then
    echo -e "${RED}❌ Missing required properties (templates, metadata)${NC}"
    ERRORS=$((ERRORS + 1))
    RESULT="failure"
else
    echo -e "${GREEN}✅ Required properties validated${NC}"
fi

# Check for unregistered template directories
echo -e "${BLUE}📁 Checking for unregistered templates...${NC}"

node -e "
const fs = require('fs');
const manifest = JSON.parse(fs.readFileSync('$MANIFEST_PATH', 'utf8'));

// Discover template directories
const templateDirs = [];
const entries = fs.readdirSync('.', { withFileTypes: true });

for (const entry of entries) {
  if (entry.isDirectory() && 
      !entry.name.startsWith('.') && 
      !['node_modules', 'scripts', 'dist'].includes(entry.name)) {
    
    // Check if it looks like a template
    if (fs.existsSync(entry.name + '/package.json') || 
        fs.existsSync(entry.name + '/src')) {
      templateDirs.push(entry.name);
    }
  }
}

const manifestTemplates = Object.keys(manifest.templates);
const unregisteredTemplates = templateDirs.filter(dir => !manifestTemplates.includes(dir));

if (unregisteredTemplates.length > 0) {
  console.log(\`❌ Unregistered template directories found: \${unregisteredTemplates.join(', ')}\`);
  console.log(\`   Please add these templates to manifest.json or remove them\`);
  process.exit(1);
} else {
  console.log('✅ All template directories are registered');
}
" 2>/dev/null

TEMPLATE_CHECK_EXIT_CODE=$?
if [ $TEMPLATE_CHECK_EXIT_CODE -ne 0 ]; then
    echo -e "${RED}❌ Template directory validation failed${NC}"
    RESULT="failure"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✅ Template directory validation passed${NC}"
fi

# Validate templates structure
echo -e "${BLUE}🔧 Validating templates...${NC}"

node -e "
const fs = require('fs');
const path = require('path');
const manifest = JSON.parse(fs.readFileSync('$MANIFEST_PATH', 'utf8'));

let errors = 0;
let warnings = 0;

for (const [templateId, template] of Object.entries(manifest.templates)) {
  console.log(\`  Checking template: \${templateId}\`);
  
  // Check required fields
  const required = ['name', 'description', 'framework', 'sdk'];
  for (const field of required) {
    if (!template[field]) {
      console.log(\`❌ Template \${templateId} missing \${field}\`);
      errors++;
    }
  }
  
  // Skip file validation for coming-soon templates
  if (template.status === 'coming-soon') {
    console.log(\`  ⏳ Skipping file validation for coming-soon template\`);
    continue;
  }
  
  // Validate base files exist (prepend template directory)
  if (template.base_files) {
    for (const filePath of template.base_files) {
      const fullPath = path.join(templateId, filePath);
      if (!fs.existsSync(fullPath)) {
        console.log(\`❌ Base file not found: \${fullPath}\`);
        errors++;
      }
    }
  }
  
  // Validate base directories (prepend template directory)
  if (template.base_directories) {
    for (const dirPath of template.base_directories) {
      const fullPath = path.join(templateId, dirPath);
      if (!fs.existsSync(fullPath)) {
        console.log(\`❌ Base directory not found: \${fullPath}\`);
        errors++;
      } else if (!fs.statSync(fullPath).isDirectory()) {
        console.log(\`❌ Base directory is not a directory: \${fullPath}\`);
        errors++;
      }
    }
  }
  
  // Validate screens
  if (template.screens) {
    // Check for duplicate screen IDs
    const screenIds = template.screens.map(s => s.id).filter(Boolean);
    const duplicateIds = screenIds.filter((id, index) => screenIds.indexOf(id) !== index);
    if (duplicateIds.length > 0) {
      console.log(\`❌ Duplicate screen IDs found in \${templateId}: \${[...new Set(duplicateIds)].join(', ')}\`);
      errors++;
    }
    
    for (const screen of template.screens) {
      if (!screen.id || !screen.name || !screen.path) {
        console.log(\`❌ Screen missing required fields (id, name, path)\`);
        errors++;
        continue;
      }
      
      // Prepend template directory to screen path
      const fullScreenPath = path.join(templateId, screen.path);
      if (!fs.existsSync(fullScreenPath)) {
        console.log(\`❌ Screen path not found: \${fullScreenPath}\`);
        errors++;
        continue;
      }
      
      // Check mock data (prepend template directory)
      const mockPath = path.join(templateId, screen.path, 'mock-data', \`\${screen.id}.json\`);
      if (!fs.existsSync(mockPath)) {
        console.log(\`❌ Mock data not found: \${mockPath}\`);
        errors++;
      } else {
        // Validate JSON syntax
        try {
          JSON.parse(fs.readFileSync(mockPath, 'utf8'));
        } catch (e) {
          console.log(\`❌ Invalid JSON in mock data: \${mockPath}\`);
          errors++;
        }
      }
    }
  }
  
  // Check for unregistered screens in file system
  const screensPath = path.join(templateId, 'src', 'screens');
  if (fs.existsSync(screensPath)) {
    const actualScreens = fs.readdirSync(screensPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    const manifestScreens = (template.screens || []).map(s => s.id);
    const unregisteredScreens = actualScreens.filter(screen => !manifestScreens.includes(screen));
    
    if (unregisteredScreens.length > 0) {
      console.log(\`❌ Unregistered screens found in \${templateId}: \${unregisteredScreens.join(', ')}\`);
      console.log(\`   Please add these screens to manifest.json or remove them\`);
      errors++;
    }
  }
}

console.log(\`Validation complete: \${errors} errors, \${warnings} warnings\`);
process.exit(errors > 0 ? 1 : 0);
" 2>/dev/null

VALIDATION_EXIT_CODE=$?
if [ $VALIDATION_EXIT_CODE -eq 0 ]; then
    echo -e "${GREEN}✅ Template validation passed${NC}"
    RESULT="success"
else
    echo -e "${RED}❌ Template validation failed${NC}"
    RESULT="failure"
    ERRORS=$((ERRORS + 1))
fi

#############################################
# SUMMARY
#############################################

echo ""
echo -e "${BLUE}📊 Validation Summary${NC}"
echo "===================="
echo "Result: $RESULT"
echo "Errors: $ERRORS"
echo "Warnings: $WARNINGS"

# Set GitHub Actions outputs
if [ -n "$GITHUB_OUTPUT" ]; then
    echo "result=$RESULT" >> "$GITHUB_OUTPUT"
    echo "errors=$ERRORS" >> "$GITHUB_OUTPUT"
    echo "warnings=$WARNINGS" >> "$GITHUB_OUTPUT"
fi

# Exit with appropriate code
if [ "$RESULT" = "failure" ]; then
    exit 1
else
    exit 0
fi
