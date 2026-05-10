#!/usr/bin/env node

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function runPreCommitChecks() {
  try {
    console.log('🔍 Running linting with auto-fix...');
    execSync('npx lint-staged', { stdio: 'inherit' });

    console.log('\n🔍 Checking for syntax errors...');
    try {
      execSync('npx eslint src/**/*.ts --format compact', { stdio: 'inherit' });
      console.log('\n✅ No syntax errors found!');
      
      // Run documentation and analysis scripts
      console.log('\n📚 Updating diagrams...');
      execSync('npm run update-diagram', { stdio: 'inherit' });
      
      console.log('\n✔️ Validating diagrams...');
      execSync('npm run validate-diagram', { stdio: 'inherit' });
      
      console.log('\n🔎 Analyzing codebase...');
      execSync('npm run analyze-codebase', { stdio: 'inherit' });
      
      console.log('\n📖 Updating documentation...');
      execSync('npm run update-docs', { stdio: 'inherit' });
      
      console.log('\n🔧 Maintaining docs...');
      execSync('npm run maintain-docs', { stdio: 'inherit' });
      
      console.log('\n✅ All checks and updates completed successfully!');
      process.exit(0);
    } catch (error) {
      // eslint found errors
      console.log('\n⚠️  Syntax errors detected!');
      
      return new Promise((resolve) => {
        rl.question('Do you want to proceed with the commit anyway? (yes/no): ', (answer) => {
          rl.close();
          
          if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
            console.log('✅ Proceeding with commit (skipping doc updates)...');
            resolve(0);
          } else {
            console.log('❌ Commit aborted.');
            resolve(1);
          }
        });
      });
    }
  } catch (error) {
    console.error('❌ Pre-commit check failed:', error.message);
    process.exit(1);
  }
}

runPreCommitChecks().then(code => process.exit(code));
