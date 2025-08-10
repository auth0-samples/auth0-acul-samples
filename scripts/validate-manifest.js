#!/usr/bin/env node

/**
 * Validates the manifest.json file structure and content
 * Used by CI to ensure the manifest is properly formatted for auth0-cli integration
 */

const fs = require('fs');
const path = require('path');

const manifestPath = path.join(__dirname, '..', 'manifest.json');

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
    
    // Validate each template
    Object.entries(manifest.templates).forEach(([templateId, template]) => {
      console.log(`  Validating template: ${templateId}`);
      
      if (!template.name) {
        throw new Error(`Template ${templateId} missing "name"`);
      }
      
      if (!template.description) {
        throw new Error(`Template ${templateId} missing "description"`);
      }
      
      if (!template.framework) {
        throw new Error(`Template ${templateId} missing "framework"`);
      }
      
      if (!template.sdk) {
        throw new Error(`Template ${templateId} missing "sdk"`);
      }
      
      if (!Array.isArray(template.base_files)) {
        throw new Error(`Template ${templateId} "base_files" must be an array`);
      }
      
      if (!Array.isArray(template.screens)) {
        throw new Error(`Template ${templateId} "screens" must be an array`);
      }
      
      // Validate screens
      template.screens.forEach((screen, index) => {
        if (!screen.id) {
          throw new Error(`Template ${templateId} screen ${index} missing "id"`);
        }
        
        if (!screen.name) {
          throw new Error(`Template ${templateId} screen ${index} missing "name"`);
        }
        
        if (!screen.path) {
          throw new Error(`Template ${templateId} screen ${index} missing "path"`);
        }
        
        // Check if screen path exists
        const screenPath = path.join(__dirname, '..', screen.path);
        if (!fs.existsSync(screenPath)) {
          console.warn(`⚠️  Warning: Screen path does not exist: ${screen.path}`);
        }
      });
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
