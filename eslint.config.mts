import reactPlugin from 'eslint-plugin-react'
// import reactHooks from 'eslint-plugin-react-hooks'
// import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import css from '@eslint/css'
import json from '@eslint/json'
import markdown from '@eslint/markdown'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  reactPlugin.configs.flat['jsx-runtime'],
  {
    files: ['**/*.json'],
    language: 'json/json',
    plugins: { json },
    rules: {}
  },
  {
    files: ['**/*.md'],
    language: 'markdown/commonmark',
    plugins: { markdown },
    rules: {}
  },
  {
    files: ['**/*.css'],
    language: 'css/css',
    plugins: { css },
    rules: {}
  }
])
