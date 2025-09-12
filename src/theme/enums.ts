import { ETypographyTokens } from './tokens'

export const ETheme = {
  Fill: {
    Outlined: 'outlined',
    Solid: 'solid'
  },
  Palette: {
    Primary: 'primary',
    Warning: 'warning'
  },
  Size: {
    Component: {
      Compact: 'co',
      Regular: 'rg'
    },
    Icon: {
      Large: 'lg',
      Medium: 'md',
      Small: 'sm'
    }
  },
  Typography: {
    ...ETypographyTokens
  }
} as const
