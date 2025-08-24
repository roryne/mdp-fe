/* eslint-disable sort-keys */
import type { Linter } from 'eslint'

const css: Linter.RulesRecord = {
  // Possible Errors
  'css/no-dupe-properties': 'error',
  'css/no-invalid-color-hex': 'error',
  'css/no-shorthand-property-overrides': 'error',
  'css/no-unknown-property': 'error',
  'css/no-unknown-unit': 'error',

  // Best Practices
  'css/named-color': ['error', 'always'],
  'css/no-length-zero-unit': 'error',
  'css/no-useless-color-alpha': 'error',

  // Stylistic Issues
  'css/color-hex-style': 'error',
  'css/no-number-trailing-zeros': 'error',
  'css/number-leading-zero': ['error', 'always'],
  'css/property-casing': 'error'
}

export default css
