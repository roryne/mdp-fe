import type { Linter } from 'eslint'

const reactHooks: Linter.RulesRecord = {
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'error'
}

export default reactHooks
