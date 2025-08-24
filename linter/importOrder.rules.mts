import type { Linter } from 'eslint'

const importOrder: Linter.RulesRecord = {
  'import/order': [
    'error',
    {
      alphabetize: { caseInsensitive: false, order: 'asc' },
      groups: [
        'builtin', // Node builtins: fs, path, etc.
        'external', // NPM deps: react, lodash, etc.
        'internal', // Your aliases: @/*
        ['parent', 'sibling', 'index'] // Relative imports
      ],
      'newlines-between': 'always',
      pathGroups: [
        {
          group: 'internal',
          pattern: '@/**',
          position: 'after'
        }
      ],
      pathGroupsExcludedImportTypes: ['builtin']
    }
  ]
}

export default importOrder
