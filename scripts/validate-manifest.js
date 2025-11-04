#!/usr/bin/env node

/**
 * Validates the manifest.json file structure and content
 * Used by CI to ensure the manifest is properly formatted for auth0-cli integration
 * Validates that all directories and files referenced in manifest exist
 * Ensures new template folders are properly registered in manifest
 */

const fs = require('fs');
const path = require('path');

const manifestPath = path.join(__dirname, '..', 'manifest.json');
const rootDir = path.join(__dirname, '..');

/**
 * Discovers all template directories in the project
 */
function discoverTemplateDirs() {
  const templateDirs = [];
  const entries = fs.readdirSync(rootDir, { withFileTypes: true });
  
  for (const entry of entries) {
    if (entry.isDirectory() && !entry.name.startsWith('.') && 
        !['node_modules', 'scripts', 'dist'].includes(entry.name)) {
      const templatePath = path.join(rootDir, entry.name);
      // Check if it looks like a template (has package.json or src folder)
      if (fs.existsSync(path.join(templatePath, 'package.json')) || 
          fs.existsSync(path.join(templatePath, 'src'))) {
        templateDirs.push(entry.name);
      }
    }
  }
  
  return templateDirs;
}

/**
 * Validates that all files and directories in manifest exist
 */
function validateFilesExist(templateId, template) {
  console.log(`    Validating files exist for template: ${templateId}`);
  const templateDir = path.join(rootDir, templateId);
  
  // Validate base_files
  if (template.base_files) {
    template.base_files.forEach(filePath => {
      const fullPath = path.join(templateDir, filePath);
      if (!fs.existsSync(fullPath)) {
        throw new Error(`Template ${templateId}: base_file does not exist: ${filePath}`);
      }
    });
  }
  
  // Validate base_directories
  if (template.base_directories) {
    template.base_directories.forEach(dirPath => {
      const fullPath = path.join(templateDir, dirPath);
      if (!fs.existsSync(fullPath)) {
        throw new Error(`Template ${templateId}: base_directory does not exist: ${dirPath}`);
      }
      if (!fs.statSync(fullPath).isDirectory()) {
        throw new Error(`Template ${templateId}: base_directory is not a directory: ${dirPath}`);
      }
    });
  }
  
  // Validate screen paths
  template.screens.forEach(screen => {
    const screenPath = path.join(templateDir, screen.path);
    if (!fs.existsSync(screenPath)) {
      throw new Error(`Template ${templateId}: screen path does not exist: ${screen.path}`);
    }
    if (!fs.statSync(screenPath).isDirectory()) {
      throw new Error(`Template ${templateId}: screen path is not a directory: ${screen.path}`);
    }
    
    // Validate screen has mock data
    const mockDataPath = path.join(screenPath, 'mock-data', `${screen.id}.json`);
    if (!fs.existsSync(mockDataPath)) {
      throw new Error(`Template ${templateId}: screen ${screen.id} missing mock data: ${mockDataPath}`);
    }
    
    // Validate mock data JSON syntax
    try {
      const mockDataContent = fs.readFileSync(mockDataPath, 'utf8');
      JSON.parse(mockDataContent);
    } catch (jsonError) {
      throw new Error(`Template ${templateId}: screen ${screen.id} has invalid JSON in mock data: ${mockDataPath} - ${jsonError.message}`);
    }
  });
}

function validateManifest() {
  console.log('🔍 Validating manifest.json...');
  
  try {
    // Check if manifest exists
    if (!fs.existsSync(manifestPath)) {
      throw new Error('manifest.json not found');
    }
    
    // Parse JSON
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    // Validate structure
    if (!manifest.templates) {
      throw new Error('manifest.json missing "templates" property');
    }
    
    if (!manifest.metadata) {
      throw new Error('manifest.json missing "metadata" property');
    }
    
    // Discover actual template directories
    const discoveredTemplates = discoverTemplateDirs();
    const manifestTemplates = Object.keys(manifest.templates);
    
    console.log(`📁 Discovered template directories: ${discoveredTemplates.join(', ')}`);
    console.log(`📋 Manifest templates: ${manifestTemplates.join(', ')}`);
    
    // Check for missing templates in manifest
    const missingInManifest = discoveredTemplates.filter(dir => !manifestTemplates.includes(dir));
    if (missingInManifest.length > 0) {
      throw new Error(`Found template directories not registered in manifest.json: ${missingInManifest.join(', ')}`);
    }
    
    // Check for templates in manifest that don't exist
    const missingDirectories = manifestTemplates.filter(template => !discoveredTemplates.includes(template));
    if (missingDirectories.length > 0) {
      console.warn(`⚠️  Warning: Manifest references non-existent template directories: ${missingDirectories.join(', ')}`);
    }
    
    // Validate each template
    Object.entries(manifest.templates).forEach(([templateId, template]) => {
      console.log(`  Validating template: ${templateId}`);
      
      // Validate required fields
      const requiredFields = ['name', 'description', 'framework', 'sdk'];
      requiredFields.forEach(field => {
        if (!template[field]) {
          throw new Error(`Template ${templateId} missing "${field}"`);
        }
      });
      
      // Validate array fields
      const arrayFields = ['base_files', 'base_directories', 'screens'];
      arrayFields.forEach(field => {
        if (template[field] && !Array.isArray(template[field])) {
          throw new Error(`Template ${templateId} "${field}" must be an array`);
        }
      });
      
      // Ensure base_files and base_directories exist (can be empty for coming-soon templates)
      if (!template.base_files) template.base_files = [];
      if (!template.base_directories) template.base_directories = [];
      if (!template.screens) template.screens = [];
      
      // Validate screens structure
      template.screens.forEach((screen, index) => {
        const requiredScreenFields = ['id', 'name', 'description', 'path'];
        requiredScreenFields.forEach(field => {
          if (!screen[field]) {
            throw new Error(`Template ${templateId} screen ${index} missing "${field}"`);
          }
        });
        
        // Validate screen ID matches directory name (paths should be template-relative)
        const expectedPath = `src/screens/${screen.id}`;
        if (screen.path !== expectedPath) {
          console.warn(`⚠️  Warning: Screen ${screen.id} path ${screen.path} doesn't match expected pattern ${expectedPath}`);
        }
      });
      
      // Validate files and directories exist (skip for coming-soon templates)
      if (template.status !== 'coming-soon') {
        validateFilesExist(templateId, template);
      } else {
        console.log(`    Skipping file validation for coming-soon template: ${templateId}`);
      }
    });
    
    console.log('✅ manifest.json is valid!');
    return true;
    
  } catch (error) {
    console.error('❌ Manifest validation failed:');
    console.error(error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  validateManifest();
}

module.exports = { validateManifest };
