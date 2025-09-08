import type { FC } from 'react'

import styles from './Button.module.css'
import type { TButtonSpinnerProps } from './types'

const Spinner: FC<TButtonSpinnerProps> = ({ shouldShow }) => {
  if (!shouldShow) return null

  return <span aria-hidden="true" className={styles.spinner} />
}

Spinner.displayName = 'Button Spinner'

export default Spinner
