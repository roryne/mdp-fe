import React from 'react'

import { HtmlUtils } from '@/utils'

import Icon from './Button.Icon'
import Spinner from './Button.Spinner'
import styles from './Button.module.css'
import { EButton } from './enums'
import type { TButton, TButtonProps } from './types'

export const getHiddenClass = (isHidden?: boolean) =>
  isHidden ? styles.hidden : ''

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

const Button: TButton = Object.assign(ButtonBase, { Icon, Spinner })

export default Button
