import type * as React from 'react'

import styles from './Button.module.scss'
import type { TButtonSpinnerProps } from './types'

const Spinner: React.FC<TButtonSpinnerProps> = ({
  shouldShow,
  ...restProps
}) => {
  if (!shouldShow) return null

  return (
    <span
      aria-hidden="true"
      className={styles.spinner}
      data-test="btn--spinner"
      {...restProps}
    />
  )
}

Spinner.displayName = 'Button Spinner'

export default Spinner
