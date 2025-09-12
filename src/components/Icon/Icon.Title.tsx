import type { HTMLProps } from 'react'

export const Title = ({
  title = '',
  ...props
}: HTMLProps<HTMLTitleElement>) => {
  if (title === '') return null

  return <title {...props}>{title}</title>
}
