# Scripts Directory

This directory contains utility scripts for maintaining and updating the Anime Store backend.

## Architecture Diagram Maintenance

The `update-diagram.js` script helps maintain the architecture flow diagram (ARCHITECTURE_FLOW.md) by analyzing the codebase and suggesting updates.

### Usage

```bash
# Analyze the current codebase structure
npm run analyze-codebase

# Generate suggestions for diagram updates
npm run update-diagram suggest

# Validate that the current diagram matches the codebase
npm run validate-diagram

# Generate diagram update content
npm run update-diagram update
```

## AI-Driven README Maintenance

The same script now also automatically maintains comprehensive README.md documentation for all folders in the `src/` directory.

### Features

- **Automatic README Generation**: Creates README.md files for new folders
- **Smart Updates**: Updates existing READMEs when code changes
- **AI-Context Documentation**: Each README contains purpose, flow, dependencies, conventions, examples, Do's/Don'ts, and extension strategies
- **Component Analysis**: Documents classes, interfaces, exports, and test coverage

### Usage

```bash
# Update all README.md files in src/
npm run update-docs

# Run complete maintenance (docs + diagram validation)
npm run maintain-docs
```

### What Gets Updated

#### Layer READMEs (5 files)
- `src/domain/README.md`
- `src/application/README.md`
- `src/infrastructure/README.md`
- `src/presentation/README.md`
- `src/shared/README.md`

Each contains:
- Layer purpose and responsibilities
- Architecture flow and dependencies
- Coding conventions and best practices
- Directory structure overview
- Future extension guidelines

#### Directory READMEs (17+ files)
- `src/domain/entities/README.md`
- `src/application/use-cases/README.md`
- `src/infrastructure/database/README.md`
- etc.

Each contains:
- File-by-file component breakdown
- Class/interface/export counts
- Test coverage status
- Maintenance guidelines

## Complete Maintenance Workflow

```bash
# Run everything: update docs, validate diagram
npm run maintain-docs

# Or run individually:
npm run update-docs        # Update READMEs
npm run validate-diagram   # Check diagram accuracy
```

## Integration Examples

### Development Workflow
```bash
# After adding new components
npm run update-docs

# Before committing changes
npm run maintain-docs
```

### CI/CD Pipeline
```yaml
- name: Maintain Documentation
  run: npm run maintain-docs
```

## File Structure After Running

```
src/
├── domain/
│   ├── README.md           # Layer overview
│   ├── entities/
│   │   ├── README.md       # Directory details
│   │   └── *.ts
│   └── repositories/
│       ├── README.md
│       └── *.ts
├── application/
│   ├── README.md
│   └── use-cases/
│       ├── README.md
│       └── *.ts
└── ...
```

## Benefits

- **Always Current**: Documentation updates automatically with code changes
- **Comprehensive**: Covers all architectural layers and directories
- **AI-Friendly**: Provides context for AI agents working with the code
- **Human-Friendly**: Clear explanations for developers
- **Maintainable**: No manual documentation effort required

## Script Commands

| Command | Description |
|---------|-------------|
| `analyze` | Analyze codebase structure and output JSON |
| `suggest` | Generate diagram update suggestions |
| `validate` | Check if diagram is up-to-date with code |
| `update` | Generate diagram update content |
| `docs` | Update all README.md files |
| `all` | Run complete maintenance (docs + validate) |

## For AI Agents

When updating the codebase:

1. **After adding new components**: Run `npm run update-docs`
2. **Before updating diagram**: Run `npm run validate-diagram`
3. **For complete maintenance**: Run `npm run maintain-docs`
4. **When creating new folders**: READMEs are created automatically

## Future Enhancements

The script can be extended to:
- Generate API documentation from controllers
- Create component dependency graphs
- Include performance and complexity metrics
- Add security documentation
- Generate migration guides