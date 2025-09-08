import clsx from 'clsx'

import type { TIcon } from '@/components/Icon/types'

import type { TBaseFieldMessage } from './types'

export const hasText = (val: string) => val.trim().length > 0

export const getClasses = ({
  endNode,
  startNode,
  message,
  styles,
  variant = 'outline'
}: {
  endNode?: TIcon
  startNode?: TIcon
  message?: TBaseFieldMessage
  styles: CSSModuleClasses
  variant?: 'outline'
}) => {
  const hasError = Boolean(message?.error)
  const hasInfo = Boolean(message?.info)
  const hasSuccess = Boolean(message?.success)

  return {
    base: clsx(styles.bf, {
      [styles['bf--outline']]: true,
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

export const getDescribedBy = (
  id: string,
  message: { error?: string; info?: string; success?: string }
) => {
  const describedByIds: string[] = []

  if (hasText(message.error ?? '')) describedByIds.push(`${id}-error`)
  if (hasText(message.info ?? '')) describedByIds.push(`${id}-info`)
  else if (hasText(message.success ?? '')) describedByIds.push(`${id}-success`)

  return describedByIds.length ? describedByIds.join(' ') : undefined
}
