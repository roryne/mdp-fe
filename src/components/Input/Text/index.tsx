import type { FC } from 'react'

import BaseField from '../BaseField'
import type { TTextInputProps } from './types'

const TextInput: FC<TTextInputProps> = ({ ...rest }) => (
  <BaseField {...rest} type="text" />
)

export default TextInput
