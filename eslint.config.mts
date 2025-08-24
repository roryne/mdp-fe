import parser from '@typescript-eslint/parser'
import eslint from '@eslint/js'
import globals from 'globals'
import tsEslint from 'typescript-eslint'

import { plugins, rules as linterRules } from './linter'

export default tsEslint.config([
  eslint.configs.recommended,
  tsEslint.configs.base,
  {
    files: ['./src/**/*.{mjs,mts,ts,tsx}', './linter/**/*.{mjs,mts,ts,tsx}'],
    ignores: ['**/build/**', '**/dist/**', './src/**/*.css'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.serviceworker
      },
      parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        project: './tsconfig.eslint.json',
        projectService: true,
        sourceType: 'module',
        tsconfigRootDir: __dirname
      },
      sourceType: 'module'
    },
    plugins: {
      import: plugins.import,
      'jsx-a11y': plugins.jsxA11y,
      react: plugins.react,
      'react-hooks': plugins['react-hooks']
    },
    rules: { ...linterRules },
    settings: {
      react: { version: 'detect' }
    }
  }
  // {
  //   files: ['./src/**/*.css'],
  //   plugins: { css: plugins.css },
  //   rules: { ...cssRules }
  // }
])
