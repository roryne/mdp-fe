import type { HTMLAttributes, JSX, Ref } from 'react'

import type { TTheme } from '@/theme/types'

type TTypographyCustomProps = Readonly<{
  /* Visual style to apply (maps to tokens). */
  variant: TTheme['variant']
  /* Semantic tag to render as. Defaults based on variant. */
  as?: keyof JSX.IntrinsicElements
  className?: string
  palette?: TTheme['palette']
  ref?: Ref<HTMLButtonElement> | undefined
  size?: TTheme['size']
}>

export type TTypographyProps = Readonly<
  HTMLAttributes<HTMLElement> & TTypographyCustomProps
>
