import clsx from 'clsx'
import { type HTMLProps } from 'react'

import styles from './Icon.Interactive.module.css'
import { getIconSize } from './common'
import type { TInteractiveIconProps } from './types'

const getClasses = () => ({
  button: clsx(styles.ii__button),
  ii: clsx(styles.ii)
})

type TButtonProps = Omit<HTMLProps<HTMLButtonElement>, 'size' | 'type'>

const InteractiveIcon = ({
  label,
  ref,
  size = 'md',
  svg: Svg,
  ...buttonProps
}: TButtonProps & TInteractiveIconProps) => {
  const classes = getClasses()

  return (
    <div className={classes.ii}>
      <button
        aria-label={label}
        className={classes.button}
        ref={ref}
        type="button"
        {...buttonProps}
      >
        <Svg
          aria-hidden="true"
          focusable="false"
          height={getIconSize(size)}
          tabIndex={-1}
          width={getIconSize(size)}
        />
      </button>
    </div>
  )
}

InteractiveIcon.displayName = 'Interactive Icon'

export default InteractiveIcon
