import { forwardRef } from 'react'

import { conditionalClass, mergeClasses } from '@/utils/html'

import Icon from './Button.Icon'
import Spinner from './Button.Spinner'
import styles from './Button.module.css'
import { EButton } from './enums'
import type { TButton, TButtonProps } from './types'

const ButtonBase = forwardRef<HTMLButtonElement, TButtonProps>(
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
    const classes = mergeClasses(
      styles.button,
      styles[`btn--${variant}`],
      styles[`btn--${size}`],
      restProps.className
    )

    return (
      <button
        aria-busy={isLoading || undefined}
        className={classes}
        disabled={restProps.disabled ?? isLoading}
        ref={ref}
        {...restProps}
      >
        <Icon data-test="btn--icon-left" icon={iconLeft} isHidden={isLoading} />
        <span className={conditionalClass(styles.hidden, isLoading)}>
          {label}
        </span>
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
