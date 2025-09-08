import { forwardRef, useId } from 'react'

import type { IIconStyle } from '@/global/namespace'
import { mapIconThemeToStyle } from '@/utils/theme/icons'

import Label from '../Label'
import Adornment from './BaseField.Adornment'
import MessageArea from './BaseField.MessageArea'
import styles from './BaseField.module.css'
import { getClasses, getDescribedBy } from './common'
import type { TBaseFieldProps } from './types'

const BaseField = forwardRef<HTMLInputElement, TBaseFieldProps>(
  (
    {
      endNode = null,
      iconTheme = {
        default: '',
        focus: '',
        hover: ''
      },
      label,
      message = {
        error: '',
        info: '',
        success: ''
      },
      shouldShowLabel = true,
      startNode = null,
      type,
      variant = 'outline',
      ...rest
    },
    ref
  ) => {
    const id = useId()
    const aria = {
      describedBy: getDescribedBy(id, message),
      invalid: Boolean(message.error) || undefined,
      label: rest['aria-label'] ?? label,
      readOnly: rest.readOnly ?? undefined
    }
    const classes = getClasses({ endNode, message, startNode, styles, variant })
    const displayMessage =
      ((message.error ?? '') || (message.success ?? '') || message.info) ?? ''
    const style: IIconStyle = mapIconThemeToStyle(iconTheme)

    return (
      <div>
        <div className={classes.base} style={style}>
          <Adornment className={classes.startNode} node={startNode} />
          <Label
            className={classes.label}
            id={id}
            label={label}
            shouldShow={shouldShowLabel}
          />
          <input
            aria-describedby={aria.describedBy}
            aria-invalid={aria.invalid}
            aria-label={aria.label}
            aria-readonly={aria.readOnly}
            className={classes.input}
            id={id}
            ref={ref}
            type={type}
            {...rest}
          />
          <Adornment className={classes.endNode} node={endNode} />
        </div>
        <MessageArea
          className={classes.messageArea}
          id={id}
          message={displayMessage}
        />
      </div>
    )
  }
)

BaseField.displayName = 'Base Field'

export default BaseField
