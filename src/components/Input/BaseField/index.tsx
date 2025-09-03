import clsx from 'clsx'
import { forwardRef, useId, type ReactNode } from 'react'

import Label from '../Label'
import Adornment from './BaseField.Adornment'
import MessageArea from './BaseField.MessageArea'
import styles from './BaseField.module.scss'
import type { TBaseFieldMessage, TBaseFieldProps } from './types'

const getClasses = ({
  endNode,
  startNode,
  message,
  variant = 'outline'
}: {
  endNode?: ReactNode
  startNode?: ReactNode
  message?: TBaseFieldMessage
  variant?: 'filled' | 'outline'
}) => {
  const hasError = Boolean(message?.error)
  const hasInfo = Boolean(message?.info)
  const hasSuccess = Boolean(message?.success)

  return {
    base: clsx(styles.bf, {
      [styles[`bf--${variant}`]]: variant,
      [styles['bf--error']]: hasError,
      [styles['bf--info']]: !hasError && !hasSuccess && hasInfo,
      [styles['bf--success']]: !hasError && hasSuccess,
      [styles['bf--end-node']]: endNode,
      [styles['bf--start-node']]: startNode
    }),
    endNode: clsx(styles['bf__end-node']),
    input: clsx(styles.bf__input),
    label: clsx(styles.bf__label),
    messageArea: clsx(styles['bf-ma'], {
      [styles[`bf-ma--${variant}`]]: variant,
      [styles['bf-ma--error']]: hasError,
      [styles['bf-ma--info']]: !hasError && !hasSuccess && hasInfo,
      [styles['bf-ma--success']]: !hasError && hasSuccess
    }),
    startNode: clsx(styles['bf__start-node'])
  }
}

const hasText = (val: string) => val.trim().length > 0

const getDescribedBy = (
  id: string,
  message: { error?: string; info?: string; success?: string }
) => {
  const describedByIds: string[] = []

  if (hasText(message.error ?? '')) describedByIds.push(`${id}-error`)
  if (hasText(message.info ?? '')) describedByIds.push(`${id}-info`)
  else if (hasText(message.success ?? '')) describedByIds.push(`${id}-success`)

  return describedByIds.length ? describedByIds.join(' ') : undefined
}

const BaseField = forwardRef<HTMLInputElement, TBaseFieldProps>(
  (
    {
      endNode = null,
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
    const classes = getClasses({ endNode, message, startNode, variant })
    const { error, info, success } = message
    const displayMessage = ((error ?? '') || (success ?? '') || info) ?? ''

    return (
      <div>
        <div className={classes.base}>
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
