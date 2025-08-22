import React from 'react'
import { HtmlUtils } from '@/utils'
import styles from './Button.module.css'
import { EButton } from './enums'
import type {
  TButton,
  TButtonIconProps,
  TButtonProps,
  TButtonSpinnerProps
} from './types'

const getHiddenClass = (isHidden: boolean) => (isHidden ? styles.hidden : '')

const ButtonBase = React.forwardRef<HTMLButtonElement, TButtonProps>(
  (
    {
      label,
      iconLeft = null,
      iconRight = null,
      isLoading = false,
      size = EButton.Size.Medium,
      variant = EButton.Variant.Primary,
      ...restProps
    },
    ref
  ) => {
    const classes = HtmlUtils.getClassName(
      styles.button,
      styles[`btn--${variant}`],
      styles[`btn--${size}`],
      restProps.className
    )

    return (
      <button
        aria-busy={isLoading || undefined}
        className={classes}
        disabled={restProps.disabled || isLoading}
        ref={ref}
        {...restProps}
      >
        <Icon data-test="btn--icon-left" icon={iconLeft} isHidden={isLoading} />
        <span className={getHiddenClass(isLoading)}>{label}</span>
        <Spinner shouldShow={isLoading} />
        <Icon
          data-test="btn--icon-right"
          icon={iconRight}
          isHidden={isLoading}
        />
      </button>
    )
  }
)

ButtonBase.displayName = 'Button'

const Icon: React.FC<TButtonIconProps> = ({ icon, isHidden, ...restProps }) => {
  if (!icon) return null

  const className = HtmlUtils.getClassName(
    styles.iconWrapper,
    getHiddenClass(isHidden)
  )

  return (
    <span aria-hidden="true" className={className} {...restProps}>
      {icon}
    </span>
  )
}

Icon.displayName = 'Button Icon'

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

const Button: TButton = Object.assign(ButtonBase, { Icon, Spinner })

export default Button
