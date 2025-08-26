import { type UserConfig } from '@commitlint/types'

const Configuration: UserConfig = {
  defaultIgnores: true,
  extends: ['@commitlint/config-conventional']
}

export default Configuration
