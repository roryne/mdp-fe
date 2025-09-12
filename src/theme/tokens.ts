/* eslint-disable sort-keys */

const EColorsProps = [
  '050',
  '100',
  '150',
  '200',
  '250',
  '300',
  '350',
  '400',
  '450',
  '500',
  '550',
  '600',
  '650',
  '700',
  '750',
  '800',
  '850',
  '900',
  '950'
] as const

const EBwProps = [
  '000',
  '050',
  '100',
  '150',
  '200',
  '250',
  '300',
  '350',
  '400',
  '450',
  '500',
  '550',
  '600',
  '650',
  '700',
  '750',
  '800',
  '850',
  '900',
  '950',
  '1000'
] as const

const EColorTokens = {
  blue: EColorsProps,
  bw: EBwProps,
  green: EColorsProps,
  orange: EColorsProps,
  purple: EColorsProps,
  red: EColorsProps,
  yellow: EColorsProps
} as const

type TColorToken =
  `${keyof typeof EColorTokens}-${(typeof EColorTokens)[keyof typeof EColorTokens][number]}`

const ERadiusTokens = {
  0: '0rem',
  1: '0.125rem',
  2: '0.25rem',
  3: '0.375rem',
  4: '0.5rem',
  5: '0.625rem',
  6: '0.75rem',
  7: '0.875rem',
  8: '1rem',
  Full: '50%'
} as const

type TRadiusToken = keyof typeof ERadiusTokens

const ESizeTokens = {
  x: '1px',
  0: '0rem',
  1: '0.125rem',
  2: '0.25rem',
  3: '0.375rem',
  4: '0.5rem',
  5: '0.625rem',
  6: '0.75rem',
  7: '0.875rem',
  8: '1rem',
  9: '1.125rem',
  10: '1.25rem',
  11: '1.375rem',
  12: '1.5rem',
  13: '1.625rem',
  14: '1.75rem',
  15: '1.875rem',
  16: '2rem',
  18: '2.25rem',
  20: '2.5rem',
  22: '2.75rem',
  24: '3rem',
  26: '3.25rem',
  28: '3.5rem',
  30: '3.75rem',
  32: '4rem'
} as const
type TSizeToken = keyof typeof ESizeTokens

const ETypographyTokenProps = [
  'size',
  'weight',
  'lineHeight',
  'letterSpacing'
] as const

export const ETypographyTokens = {
  // Headings
  h1: ETypographyTokenProps,
  h2: ETypographyTokenProps,
  h3: ETypographyTokenProps,

  // Body text
  body: ETypographyTokenProps,

  // Subtitles / supporting text
  subtitle1: ETypographyTokenProps,
  subtitle2: ETypographyTokenProps,

  // UI-specific roles
  label: ETypographyTokenProps, // form labels, field labels
  button: ETypographyTokenProps, // text in buttons
  link: ETypographyTokenProps, // inline links

  // Decorative / auxiliary
  caption: ETypographyTokenProps, // annotations under content
  overline: ETypographyTokenProps, // all-caps labels above headings
  code: ETypographyTokenProps // monospace / inline code
} as const

export type TTypographyVariant = keyof typeof ETypographyTokens
type TTypographyProps = (typeof ETypographyTokenProps)[number]
type TTypographyToken = Record<TTypographyVariant, TTypographyProps>

export const ETokens = {
  Color: EColorTokens,
  Radius: ERadiusTokens,
  Size: ESizeTokens,
  Typography: ETypographyTokens
} as const

export type TTokens = {
  Color: TColorToken
  Radius: TRadiusToken
  Size: TSizeToken
  Typography: TTypographyToken
}
