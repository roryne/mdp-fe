import { ETokens, type TTokens } from '@/theme/tokens'

export const getColorVar = (color: TTokens['Color'] | 'currentColor') =>
  color === 'currentColor' ? color : `var(--colors-${color})`

export const getIconSize = (size: 'lg' | 'md' | 'sm') => {
  switch (size) {
    case 'lg':
      return ETokens.Size[12]
    case 'md':
      return ETokens.Size[8]
    case 'sm':
    default:
      return ETokens.Size[6]
  }
}
