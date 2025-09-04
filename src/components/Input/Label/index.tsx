import type { FC } from 'react'

import type { TLabelProps } from './types'

const Label: FC<TLabelProps> = ({ label, id, shouldShow, ...rest }) => {
  const renderedLabel = shouldShow ? label : ''

  return (
    <label htmlFor={id} {...rest}>
      {renderedLabel}
    </label>
  )
}

export default Label
