import * as cssPlugin from 'eslint-plugin-css'
import importOrderPlugin from 'eslint-plugin-import'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'
import * as reactHooksPlugins from 'eslint-plugin-react-hooks'

import css from './css.rules.mts'
import importOrder from './importOrder.rules.mts'
import js from './js.rules.mjs'
import jsxA11y from './jsxA11y.rules.mts'
import react from './react.rules.mts'
import reactHooks from './reactHooks.rules.mts'
import ts from './ts.rules.mts'

export const cssRules = css

export const plugins = {
  css: cssPlugin,
  import: importOrderPlugin,
  jsxA11y: jsxA11yPlugin,
  react: reactPlugin,
  'react-hooks': reactHooksPlugins
}

export const rules = {
  ...importOrder,
  ...js,
  ...jsxA11y,
  ...react,
  ...reactHooks,
  ...ts
}
