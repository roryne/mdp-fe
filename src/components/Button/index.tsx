import clsx from 'clsx'

import { mapIconThemeToStyle } from '@/utils/theme/icons'

import Spinner from './Button.Spinner'
import styles from './Button.module.css'
import { EButton } from './enums'
import type { TButtonProps } from './types'

const initialTheme = {
  default: '',
  focus: '',
  hover: ''
}

const ButtonBase = ({
  fill = EButton.Fill.Solid,
  iconLeft,
  iconRight,
  isLoading = false,
  label,
  palette = EButton.Palette.Primary,
  ref,
  size = EButton.Size.Regular,
  theme = initialTheme,
  ...props
}: TButtonProps) => {
  const classes = {
    button: clsx(styles.btn, {
      [styles[fill]]: fill,
      [styles[size]]: size,
      [styles[palette]]: palette
    }),
    icon: clsx(styles.icon, { [styles.hidden]: isLoading }),
    label: clsx(styles.label, { [styles.hidden]: isLoading })
  }

  return (
    <button
      aria-busy={isLoading || undefined}
      className={classes.button}
      disabled={props.disabled ?? isLoading}
      ref={ref}
      style={mapIconThemeToStyle(theme)}
      {...props}
    >
      <span aria-hidden="true" className={classes.icon}>
        {iconLeft}
      </span>
      <span className={classes.label}>{label}</span>
      <Spinner shouldShow={isLoading} />
      <span aria-hidden="true" className={classes.icon}>
        {iconRight}
      </span>
    </button>
  )
}

ButtonBase.displayName = 'Button'

const Button = Object.assign(ButtonBase, { Spinner })

export default Button
