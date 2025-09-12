import type { ETheme } from './enums'

type TFill = Readonly<(typeof ETheme.Fill)[keyof typeof ETheme.Fill]>
type TPalette = Readonly<(typeof ETheme.Palette)[keyof typeof ETheme.Palette]>
type TComponentSize = Readonly<
  (typeof ETheme.Size.Component)[keyof typeof ETheme.Size.Component]
>
type TTypographyVariant = Readonly<keyof typeof ETheme.Typography>

export type TTheme = Readonly<{
  palette: TPalette
  fill: TFill
  size: TComponentSize
  variant: TTypographyVariant
}>
