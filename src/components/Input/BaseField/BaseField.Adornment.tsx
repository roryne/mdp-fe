import type { TAdornmentProps } from './types'

const Adornment = ({ node, ...rest }: TAdornmentProps) => {
  if (node === null || node === undefined) return null

  return <div {...rest}>{node}</div>
}

Adornment.displayName = 'Adornment'

export default Adornment
