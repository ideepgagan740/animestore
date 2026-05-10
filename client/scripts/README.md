# scripts

## Purpose
Automation scripts for documentation maintenance, boundary validation, and AI-readable project governance.

## Responsibilities
- Keep architecture documentation fresh.
- Detect invalid cross-feature imports.
- Support pre-commit quality checks.

## Files
- `update-docs.js`: Generates README files for source folders and Mermaid architecture docs.
- `validate-boundaries.js`: Blocks feature modules from importing another feature's private internals.

## Usage

```bash
npm run update-docs
npm run validate:boundaries
```
