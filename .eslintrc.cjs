import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

export default defineConfig(
  {
    ignores: ['eslint.config.mjs', 'dist/', 'build/', 'coverage/', 'jest.config.js'],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginPrettier,

  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-duplicate-imports': 'error',
      'no-var': 'error',
      'no-console': ['warn', { allow: ['error'] }],
      'prefer-const': 'warn',
      'spaced-comment': ['warn', 'always'],
      'no-useless-catch': 'off',
      'no-unreachable': 'error',
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/return-await': ['error', 'always'],
      eqeqeq: ['warn', 'always'],
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'lines-between-class-members': ['error', 'always'],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let'], next: '*' },
        { blankLine: 'never', prev: ['const', 'let'], next: ['const', 'let'] },
      ],
    },
  },
);
