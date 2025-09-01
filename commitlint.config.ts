import { type UserConfig } from '@commitlint/types'

const Configuration: UserConfig = {
  defaultIgnores: true,
  extends: ['@commitlint/config-conventional'],
  ignores: [(message) => message.startsWith('wip')]
}

export default Configuration
