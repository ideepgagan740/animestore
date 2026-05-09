#!/usr/bin/env node

/**
 * Architecture Diagram and Documentation Update Script
 *
 * This script analyzes the codebase and helps maintain:
 * 1. The architecture flow diagram (ARCHITECTURE_FLOW.md)
 * 2. README.md files in each folder with AI-context-driven documentation
 *
 * Usage:
 * - npm run update-diagram (checks for updates)
 * - npm run update-diagram --auto (attempts auto-update)
 * - npm run update-diagram --validate (validates current diagram)
 * - npm run update-docs (updates all README.md files)
 */

const fs = require('fs');
const path = require('path');

class ArchitectureAnalyzer {
  constructor() {
    this.basePath = path.join(__dirname, '..', 'src');
    this.layers = {
      domain: 'Domain Layer 🧠',
      application: 'Application Layer 🎯',
      infrastructure: 'Infrastructure Layer 🔌',
      presentation: 'Presentation Layer 🌐',
      shared: 'Shared Layer 🛠️'
    };
    this.layerDescriptions = {
      domain: {
        purpose: 'Contains business entities, value objects, and domain rules',
        responsibilities: 'Define core business logic, entities, and domain events',
        flow: 'Entities are used by Application Layer use cases',
        dependencies: 'No external dependencies - pure business logic',
        conventions: 'Entities should be pure, no external imports except other domain objects',
        examples: 'UserEntity, ProductEntity, OrderEntity',
        dos: ['Keep entities pure', 'Use domain events', 'Validate business rules'],
        donts: ['Import infrastructure code', 'Use external libraries', 'Handle HTTP requests'],
        extensions: 'Add new entities, value objects, or domain services as business needs grow'
      },
      application: {
        purpose: 'Contains use cases and application services',
        responsibilities: 'Orchestrate domain objects, handle business workflows',
        flow: 'Use cases call domain entities and infrastructure services',
        dependencies: 'Domain layer, Infrastructure interfaces',
        conventions: 'Use cases should be thin, focus on orchestration',
        examples: 'RegisterUserUseCase, CreateOrderUseCase',
        dos: ['Use dependency injection', 'Return DTOs', 'Handle application logic'],
        donts: ['Import infrastructure implementations', 'Handle HTTP details', 'Access databases directly'],
        extensions: 'Add new use cases for new business requirements'
      },
      infrastructure: {
        purpose: 'Contains external concerns and implementations',
        responsibilities: 'Database access, external APIs, framework integrations',
        flow: 'Implements repository interfaces, provides external services',
        dependencies: 'Domain interfaces, external libraries',
        conventions: 'Implement interfaces defined in Domain layer',
        examples: 'MongoUserRepository, RedisCacheService',
        dos: ['Implement domain interfaces', 'Handle external errors', 'Use external libraries'],
        donts: ['Contain business logic', 'Import presentation code', 'Expose internal details'],
        extensions: 'Add new repository implementations or external service integrations'
      },
      presentation: {
        purpose: 'Contains HTTP handlers, controllers, and API endpoints',
        responsibilities: 'Handle HTTP requests, validate input, format responses',
        flow: 'Controllers call application use cases, return HTTP responses',
        dependencies: 'Application layer, web framework',
        conventions: 'Controllers should be thin, focus on HTTP concerns',
        examples: 'AuthController, ProductController',
        dos: ['Validate requests', 'Handle HTTP errors', 'Format responses'],
        donts: ['Contain business logic', 'Access databases', 'Import infrastructure directly'],
        extensions: 'Add new controllers for new API endpoints'
      },
      shared: {
        purpose: 'Contains common utilities and cross-cutting concerns',
        responsibilities: 'Logging, configuration, common types, utilities',
        flow: 'Used by all layers as needed',
        dependencies: 'Minimal - only standard libraries and utilities',
        conventions: 'Keep utilities generic and reusable',
        examples: 'Logger, Config, Common types',
        dos: ['Provide utilities', 'Handle cross-cutting concerns', 'Keep dependencies minimal'],
        donts: ['Contain business logic', 'Import layer-specific code', 'Create circular dependencies'],
        extensions: 'Add new utilities as the application grows'
      }
    };
  }

  /**
   * Analyze the entire codebase structure
   */
  analyzeCodebase() {
    console.log('🔍 Analyzing codebase structure...\n');

    const analysis = {};

    for (const [layerKey, layerName] of Object.entries(this.layers)) {
      const layerPath = path.join(this.basePath, layerKey);
      if (fs.existsSync(layerPath)) {
        analysis[layerKey] = this.analyzeLayer(layerPath, layerName);
      }
    }

    return analysis;
  }

  /**
   * Analyze a specific layer
   */
  analyzeLayer(layerPath, layerName) {
    const analysis = {
      name: layerName,
      directories: {},
      files: []
    };

    const items = fs.readdirSync(layerPath);

    for (const item of items) {
      const itemPath = path.join(layerPath, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        analysis.directories[item] = this.analyzeDirectory(itemPath);
      } else if (item.endsWith('.ts')) {
        analysis.files.push(this.analyzeFile(itemPath));
      }
    }

    return analysis;
  }

  /**
   * Analyze a directory
   */
  analyzeDirectory(dirPath) {
    const files = fs.readdirSync(dirPath)
      .filter(file => file.endsWith('.ts'))
      .map(file => this.analyzeFile(path.join(dirPath, file)));

    return { files };
  }

  /**
   * Analyze a TypeScript file
   */
  analyzeFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(this.basePath, filePath);

    // Extract class/interface names and their types
    const classes = this.extractClasses(content);
    const interfaces = this.extractInterfaces(content);
    const exports = this.extractExports(content);

    return {
      path: relativePath,
      classes,
      interfaces,
      exports,
      hasTests: this.hasTestFile(filePath)
    };
  }

  /**
   * Extract class names from file content
   */
  extractClasses(content) {
    const classRegex = /export\s+class\s+(\w+)/g;
    const classes = [];
    let match;

    while ((match = classRegex.exec(content)) !== null) {
      classes.push(match[1]);
    }

    return classes;
  }

  /**
   * Extract interface names from file content
   */
  extractInterfaces(content) {
    const interfaceRegex = /export\s+interface\s+(\w+)/g;
    const interfaces = [];
    let match;

    while ((match = interfaceRegex.exec(content)) !== null) {
      interfaces.push(match[1]);
    }

    return interfaces;
  }

  /**
   * Extract exports from file content
   */
  extractExports(content) {
    const exportRegex = /export\s+(?:const|function|class|interface)\s+(\w+)/g;
    const exports = [];
    let match;

    while ((match = exportRegex.exec(content)) !== null) {
      exports.push(match[1]);
    }

    return exports;
  }

  /**
   * Check if a test file exists for the given file
   */
  hasTestFile(filePath) {
    const testPath = filePath.replace(/\.ts$/, '.test.ts');
    const specPath = filePath.replace(/\.ts$/, '.spec.ts');
    return fs.existsSync(testPath) || fs.existsSync(specPath);
  }

  /**
   * Generate diagram update suggestions
   */
  generateSuggestions(analysis) {
    console.log('💡 Generating diagram update suggestions...\n');

    const suggestions = [];

    // Check Domain Layer
    if (analysis.domain) {
      const entities = analysis.domain.directories.entities?.files || [];
      const entityClasses = entities.flatMap(f => f.classes);
      suggestions.push(`Domain Entities: ${entityClasses.join(', ')}`);

      const repos = analysis.domain.directories.repositories?.files || [];
      const repoInterfaces = repos.flatMap(f => f.interfaces);
      suggestions.push(`Repository Interfaces: ${repoInterfaces.join(', ')}`);
    }

    // Check Application Layer
    if (analysis.application) {
      const useCases = analysis.application.directories['use-cases']?.files || [];
      const useCaseClasses = useCases.flatMap(f => f.classes);
      suggestions.push(`Use Cases: ${useCaseClasses.join(', ')}`);

      const dtos = analysis.application.directories.dtos?.files || [];
      const dtoInterfaces = dtos.flatMap(f => f.interfaces);
      suggestions.push(`DTOs: ${dtoInterfaces.join(', ')}`);
    }

    // Check Infrastructure Layer
    if (analysis.infrastructure) {
      const repos = analysis.infrastructure.directories.repositories?.files || [];
      const repoClasses = repos.flatMap(f => f.classes);
      suggestions.push(`Repository Implementations: ${repoClasses.join(', ')}`);
    }

    // Check Presentation Layer
    if (analysis.presentation) {
      const controllers = analysis.presentation.directories.controllers?.files || [];
      const controllerClasses = controllers.flatMap(f => f.classes);
      suggestions.push(`Controllers: ${controllerClasses.join(', ')}`);

      const routes = analysis.presentation.directories.routes?.files || [];
      suggestions.push(`Routes: ${routes.length} route files`);
    }

    return suggestions;
  }

  /**
   * Validate current diagram against codebase
   */
  validateDiagram() {
    console.log('✅ Validating architecture diagram...\n');

    const diagramPath = path.join(__dirname, '..', 'ARCHITECTURE_FLOW.md');

    if (!fs.existsSync(diagramPath)) {
      console.log('❌ ARCHITECTURE_FLOW.md not found!');
      return false;
    }

    const diagramContent = fs.readFileSync(diagramPath, 'utf8');
    const analysis = this.analyzeCodebase();

    // Basic validation - check if major components are mentioned
    const validations = [];

    // Check entities
    const entities = analysis.domain?.directories.entities?.files.flatMap(f => f.classes) || [];
    const mentionedEntities = entities.filter(entity =>
      diagramContent.includes(entity.replace('Entity', ''))
    );
    validations.push(`Entities: ${mentionedEntities.length}/${entities.length} documented`);

    // Check use cases
    const useCases = analysis.application?.directories['use-cases']?.files.flatMap(f => f.classes) || [];
    const mentionedUseCases = useCases.filter(uc =>
      diagramContent.includes(uc.replace('UseCase', ''))
    );
    validations.push(`Use Cases: ${mentionedUseCases.length}/${useCases.length} documented`);

    // Check controllers
    const controllers = analysis.presentation?.directories.controllers?.files.flatMap(f => f.classes) || [];
    const mentionedControllers = controllers.filter(ctrl =>
      diagramContent.includes(ctrl.replace('Controller', ''))
    );
    validations.push(`Controllers: ${mentionedControllers.length}/${controllers.length} documented`);

    console.log('Validation Results:');
    validations.forEach(v => console.log(`  - ${v}`));

    return true;
  }

  /**
   * Generate a simple diagram update
   */
  generateDiagramUpdate() {
    const analysis = this.analyzeCodebase();
    const timestamp = new Date().toISOString();

    let updateContent = `%% Updated: ${timestamp}\n`;

    // Add new components found
    if (analysis.domain?.directories.entities) {
      const entities = analysis.domain.directories.entities.files
        .flatMap(f => f.classes)
        .filter(cls => cls.endsWith('Entity'));

      updateContent += `%% New Domain Entities: ${entities.join(', ')}\n`;
    }

    if (analysis.application?.directories['use-cases']) {
      const useCases = analysis.application.directories['use-cases'].files
        .flatMap(f => f.classes)
        .filter(cls => cls.endsWith('UseCase'));

      updateContent += `%% New Use Cases: ${useCases.join(', ')}\n`;
    }

    console.log('📝 Generated diagram update content:');
    console.log(updateContent);

    return updateContent;
  }

  /**
   * Update README.md files for all folders
   */
  updateReadmeFiles() {
    console.log('📚 Updating README.md files...\n');

    const analysis = this.analyzeCodebase();
    let updatedCount = 0;
    let createdCount = 0;

    // Update layer-level READMEs
    for (const [layerKey, layerAnalysis] of Object.entries(analysis)) {
      const layerPath = path.join(this.basePath, layerKey);
      const readmePath = path.join(layerPath, 'README.md');

      const content = this.generateLayerReadme(layerKey, layerAnalysis);

      if (fs.existsSync(readmePath)) {
        const existing = fs.readFileSync(readmePath, 'utf8');
        if (existing !== content) {
          fs.writeFileSync(readmePath, content);
          console.log(`✅ Updated: ${path.relative(this.basePath, readmePath)}`);
          updatedCount++;
        }
      } else {
        fs.writeFileSync(readmePath, content);
        console.log(`🆕 Created: ${path.relative(this.basePath, readmePath)}`);
        createdCount++;
      }

      // Update subdirectory READMEs
      for (const [dirName, dirAnalysis] of Object.entries(layerAnalysis.directories)) {
        const dirPath = path.join(layerPath, dirName);
        const dirReadmePath = path.join(dirPath, 'README.md');

        const dirContent = this.generateDirectoryReadme(layerKey, dirName, dirAnalysis);

        if (fs.existsSync(dirReadmePath)) {
          const existing = fs.readFileSync(dirReadmePath, 'utf8');
          if (existing !== dirContent) {
            fs.writeFileSync(dirReadmePath, dirContent);
            console.log(`✅ Updated: ${path.relative(this.basePath, dirReadmePath)}`);
            updatedCount++;
          }
        } else {
          fs.writeFileSync(dirReadmePath, dirContent);
          console.log(`🆕 Created: ${path.relative(this.basePath, dirReadmePath)}`);
          createdCount++;
        }
      }
      // Update subdirectory READMEs
      for (const [dirName, dirAnalysis] of Object.entries(layerAnalysis.directories)) {
        const dirPath = path.join(layerPath, dirName);
        const dirReadmePath = path.join(dirPath, 'README.md');

        const dirContent = this.generateDirectoryReadme(layerKey, dirName, dirAnalysis);

        if (fs.existsSync(dirReadmePath)) {
          const existing = fs.readFileSync(dirReadmePath, 'utf8');
          if (existing !== dirContent) {
            fs.writeFileSync(dirReadmePath, dirContent);
            console.log(`✅ Updated: ${path.relative(this.basePath, dirReadmePath)}`);
            updatedCount++;
          }
        } else {
          fs.writeFileSync(dirReadmePath, dirContent);
          console.log(`🆕 Created: ${path.relative(this.basePath, dirReadmePath)}`);
          createdCount++;
        }
      }
    }

    console.log(`\n📊 README Update Complete:`);
    console.log(`  - Updated: ${updatedCount} files`);
    console.log(`  - Created: ${createdCount} files`);
    console.log(`  - Total: ${updatedCount + createdCount} files processed`);
  }

  /**
   * Generate README content for a layer
   */
  generateLayerReadme(layerKey, layerAnalysis) {
    const desc = this.layerDescriptions[layerKey];
    const timestamp = new Date().toISOString().split('T')[0];

    let content = `# ${desc.purpose.charAt(0).toUpperCase() + desc.purpose.slice(1)}

*Last updated: ${timestamp}*

## Overview

**Purpose**: ${desc.purpose}

**Responsibilities**: ${desc.responsibilities}

## Architecture Flow

${desc.flow}

## Dependencies

${desc.dependencies}

## Conventions

${desc.conventions}

## Examples

${desc.examples}

## Directory Structure

`;

    // Add directory structure
    for (const [dirName, dirAnalysis] of Object.entries(layerAnalysis.directories)) {
      const fileCount = dirAnalysis.files.length;
      const classCount = dirAnalysis.files.flatMap(f => f.classes).length;
      const interfaceCount = dirAnalysis.files.flatMap(f => f.interfaces).length;

      content += `- **${dirName}/** (${fileCount} files, ${classCount} classes, ${interfaceCount} interfaces)\n`;
    }

    content += `
## Do's and Don'ts

### ✅ Do's
${desc.dos.map(item => `- ${item}`).join('\n')}

### ❌ Don'ts
${desc.donts.map(item => `- ${item}`).join('\n')}

## Future Extensions

${desc.extensions}

## Related Components

`;

    // Add related components based on analysis
    if (layerAnalysis.directories) {
      for (const [dirName, dirAnalysis] of Object.entries(layerAnalysis.directories)) {
        const components = [
          ...dirAnalysis.files.flatMap(f => f.classes),
          ...dirAnalysis.files.flatMap(f => f.interfaces)
        ].slice(0, 5); // Limit to 5 components

        if (components.length > 0) {
          content += `- **${dirName}**: ${components.join(', ')}\n`;
        }
      }
    }

    return content;
  }

  /**
   * Generate README content for a directory
   */
  generateDirectoryReadme(layerKey, dirName, dirAnalysis) {
    const timestamp = new Date().toISOString().split('T')[0];
    const layerDesc = this.layerDescriptions[layerKey];

    let content = `# ${dirName.charAt(0).toUpperCase() + dirName.slice(1)}

*Last updated: ${timestamp}*

## Overview

Part of the **${layerDesc.purpose}** in the ${layerDesc.name}.

## Files

`;

    // List all files with their components
    dirAnalysis.files.forEach(file => {
      const relativePath = file.path.split('/').pop();
      content += `### ${relativePath}\n`;

      if (file.classes.length > 0) {
        content += `- **Classes**: ${file.classes.join(', ')}\n`;
      }
      if (file.interfaces.length > 0) {
        content += `- **Interfaces**: ${file.interfaces.join(', ')}\n`;
      }
      if (file.exports.length > 0) {
        content += `- **Exports**: ${file.exports.join(', ')}\n`;
      }
      if (file.hasTests) {
        content += `- **Tests**: ✅ Available\n`;
      }

      content += '\n';
    });

    content += `## Component Summary

- **Total Files**: ${dirAnalysis.files.length}
- **Classes**: ${dirAnalysis.files.flatMap(f => f.classes).length}
- **Interfaces**: ${dirAnalysis.files.flatMap(f => f.interfaces).length}
- **Test Coverage**: ${dirAnalysis.files.filter(f => f.hasTests).length}/${dirAnalysis.files.length} files

## Dependencies

This directory belongs to the ${layerKey} layer and follows its architectural constraints.

## Maintenance Notes

When adding new components to this directory:
1. Ensure they follow the layer's conventions
2. Add appropriate tests
3. Update this README (automated via \`npm run update-docs\`)
4. Update the architecture diagram if needed

`;

    return content;
  }
}

// CLI Interface
function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'analyze';

  const analyzer = new ArchitectureAnalyzer();

  switch (command) {
    case 'analyze':
      const analysis = analyzer.analyzeCodebase();
      console.log('\n📊 Codebase Analysis Complete');
      console.log(JSON.stringify(analysis, null, 2));
      break;

    case 'suggest':
      const analysis2 = analyzer.analyzeCodebase();
      const suggestions = analyzer.generateSuggestions(analysis2);
      console.log('\n💡 Diagram Update Suggestions:');
      suggestions.forEach(s => console.log(`  - ${s}`));
      break;

    case 'validate':
      analyzer.validateDiagram();
      break;

    case 'update':
      const update = analyzer.generateDiagramUpdate();
      console.log('\n🔄 To apply this update, add the following to ARCHITECTURE_FLOW.md:');
      console.log(update);
      break;

    case 'update-docs':
    case 'docs':
      analyzer.updateReadmeFiles();
      break;

    case 'all':
      console.log('🔄 Running complete maintenance...\n');
      analyzer.updateReadmeFiles();
      console.log('\n' + '='.repeat(50));
      analyzer.validateDiagram();
      break;

    default:
      console.log('Usage: node update-diagram.js [command]');
      console.log('');
      console.log('Commands:');
      console.log('  analyze     - Analyze codebase structure');
      console.log('  suggest     - Generate diagram update suggestions');
      console.log('  validate    - Validate current diagram against code');
      console.log('  update      - Generate diagram update content');
      console.log('  docs        - Update all README.md files');
      console.log('  all         - Run complete maintenance (docs + validate)');
      console.log('');
      console.log('NPM Scripts:');
      console.log('  npm run analyze-codebase');
      console.log('  npm run update-diagram suggest');
      console.log('  npm run validate-diagram');
      console.log('  npm run update-docs');
  }
}

if (require.main === module) {
  main();
}

module.exports = ArchitectureAnalyzer;