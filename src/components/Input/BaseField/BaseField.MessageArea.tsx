import type { FC } from 'react'

import type { TMessageProps } from './types'

const MessageArea: FC<TMessageProps> = ({ message, ...rest }) => {
  if (message === '' || message === undefined) return null

  return (
    <div {...rest}>
      <span>{message}</span>
    </div>
  )
}

MessageArea.displayName = 'Message Area'

export default MessageArea
