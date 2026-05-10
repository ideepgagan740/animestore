import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettier from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

const config = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  prettier,
  {
    ignores: ['.next/**', 'coverage/**', 'storybook-static/**', 'node_modules/**'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@modules/*/*'],
              message: 'Feature modules must not import internals from other feature modules. Use public module APIs or shared services.',
            },
          ],
        },
      ],
    },
  },
];

export default config;
