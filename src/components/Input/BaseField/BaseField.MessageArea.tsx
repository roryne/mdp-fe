import type { FC, HTMLProps } from 'react'

type TMessageCustomProps = {
  readonly message?: string
}

type TMessageProps = HTMLProps<HTMLDivElement> & TMessageCustomProps

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
