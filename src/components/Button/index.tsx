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

const getHiddenClass = (isHidden?: boolean) => (isHidden ? styles.hidden : '')

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
    const ariaLabel = restProps['aria-label'] || label
    const classes = HtmlUtils.getClassName(
      styles.button,
      styles[`btn--${variant}`],
      styles[`btn--${size}`],
      restProps.className
    )
    const isDisabled = restProps.disabled || isLoading
    const hiddenClass = isLoading ? styles.hidden : ''

    return (
      <button
        {...restProps}
        aria-busy={isLoading || undefined}
        aria-label={ariaLabel}
        className={classes}
        disabled={isDisabled}
        ref={ref}
      >
        <Icon isHidden={isLoading} icon={iconLeft} testId="btn--icon-left" />
        <span className={hiddenClass}>{label}</span>
        <Spinner shouldShow={isLoading} />
        <Icon isHidden={isLoading} icon={iconRight} testId="btn--icon-right" />
      </button>
    )
  }
) as TButton

ButtonBase.displayName = 'Button'

const Icon: React.FC<TButtonIconProps> = ({ icon, isHidden, testId }) => {
  if (!icon) return null

  const className = HtmlUtils.getClassName(
    styles.iconWrapper,
    getHiddenClass(isHidden)
  )

  return (
    <span aria-hidden="true" className={className} data-testid={testId}>
      {icon}
    </span>
  )
}

Icon.displayName = 'Button Icon'

const Spinner: React.FC<TButtonSpinnerProps> = ({ shouldShow }) => {
  if (!shouldShow) return null

  return (
    <span
      aria-hidden="true"
      className={styles.spinner}
      data-testid="btn--spinner"
    />
  )
}

Spinner.displayName = 'Button Spinner'

const Button = Object.assign(ButtonBase, { Icon, Spinner })

export default Button
