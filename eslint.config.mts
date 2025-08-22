import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import tseslintparser from '@typescript-eslint/parser'
import pluginReact from 'eslint-plugin-react'
import json from '@eslint/json'
import markdown from '@eslint/markdown'
import css from '@eslint/css'
import { defineConfig } from 'eslint/config'
import prettier from 'eslint-plugin-prettier'

export default defineConfig([
  pluginReact.configs.flat.recommended,
  {
    ...tseslint.configs.recommended,
    files: ['**/*.{cts,mts,ts,tsx}'],
    languageOptions: {
      parser: tseslintparser,
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    plugins: {
      prettier
    },
    rules: {
      'prettier/prettier': 'error'
    }
  },
  {
    files: ['**/*.{js,mdx,mjs,cjs,jsx,tsx}'],
    plugins: { js },
    extends: ['eslint:recommended', 'prettier'],
    languageOptions: { globals: globals.browser },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
    }
  },
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended']
  },
  {
    files: ['**/*.md'],
    plugins: { markdown },
    language: 'markdown/commonmark',
    extends: ['markdown/recommended']
  },
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended']
  }
])
