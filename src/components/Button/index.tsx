import clsx from 'clsx'

import { Spinner, Typography } from '@/components'
import { ETheme } from '@/theme/enums'
import { mapIconThemeToStyle } from '@/utils/theme/icons'

import ButtonIcon from './Button.Icon'
import styles from './styles/index.module.css'
import type { TButtonProps } from './types'

const initialTheme = Object.freeze({
  default: '',
  focus: '',
  hover: ''
})

const Button = ({
  fill = ETheme.Fill.Solid,
  iconLeft,
  iconRight,
  isLoading = false,
  text,
  palette = ETheme.Palette.Primary,
  ref,
  size = ETheme.Size.Component.Regular,
  theme = initialTheme,
  ...props
}: TButtonProps) => {
  const classes = {
    button: clsx(styles.button, {
      [styles[fill]]: fill,
      [styles[size]]: size,
      [styles[palette]]: palette,
      [styles['with-icon']]: Boolean(iconLeft) || Boolean(iconRight)
    }),
    icon: clsx(styles.icon, { [styles.hidden]: isLoading }),
    spinner: clsx(styles.spinner),
    text: clsx(styles.text, { [styles.hidden]: isLoading })
  }

  return (
    <button
      aria-busy={isLoading || undefined}
      aria-label={isLoading ? text : undefined}
      className={classes.button}
      disabled={props.disabled ?? isLoading}
      ref={ref}
      style={mapIconThemeToStyle(theme)}
      type={props.type ?? 'button'}
      {...props}
    >
      <ButtonIcon className={classes.icon} icon={iconLeft} />
      <Typography className={classes.text} size={size} variant="button">
        {text}
      </Typography>
      <Spinner className={classes.spinner} shouldShow={isLoading} />
      <ButtonIcon className={classes.icon} icon={iconRight} />
    </button>
  )
}

Button.displayName = 'Button'

export default Button
