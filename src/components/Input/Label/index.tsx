import type { FC } from 'react'

import type { TLabelProps } from './types'

const Label: FC<TLabelProps> = ({ label, id, shouldShow, ...rest }) => {
  const className = shouldShow ? rest.className : 'sr-only'

  return (
    <label className={className} htmlFor={id} {...rest}>
      {label}
    </label>
  )
}

export default Label
