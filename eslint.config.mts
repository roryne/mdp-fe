import parser from '@typescript-eslint/parser'
import { defineConfig } from 'eslint/config'
import globals from 'globals'

import { plugins, rules } from './linter'

export default defineConfig([
  pluginReact.configs.flat.recommended,
  {
    files: ['./src/**/*.{mjs,mts,ts,tsx}', './linter/**/*.{mjs,mts,ts,tsx}'],
    ignores: ['**/build/**', '**/dist/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.serviceworker
      },
      parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: './tsconfig.eslint.json'
      },
      sourceType: 'module'
    },
    plugins: {
      import: plugins.import,
      'jsx-a11y': plugins.jsxA11y,
      react: plugins.react,
      'react-hooks': plugins['react-hooks']
    },
    rules,
    settings: {
      react: { version: 'detect' }
    }
  }
])
