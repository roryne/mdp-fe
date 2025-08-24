import type { Linter } from 'eslint'

const reactHooks: Linter.RulesRecord = {
  'react-hooks/exhaustive-deps': 'error',
  'react-hooks/rules-of-hooks': 'error'
}

export default reactHooks
