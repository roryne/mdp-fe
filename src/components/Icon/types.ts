import type { FC, HTMLProps, SVGProps } from 'react'

export type TIconTheme = Readonly<{
  default?: string
  focus?: string
  hover?: string
}>

type TIconCommonProps = Readonly<{
  svg?:
    | FC<
        SVGProps<SVGSVGElement> & {
          title?: string
          titleId?: string
          desc?: string
          descId?: string
        }
      >
    | undefined
  size?: 'lg' | 'md' | 'sm' | undefined
  theme?: TIconTheme | undefined
}>

export type TDecorativeIconProps = Readonly<{
  className?: HTMLProps<SVGElement>['className']
}> &
  TIconCommonProps
export type TInteractiveIconProps = Readonly<{
  label: string
  tabIndex?: HTMLProps<SVGElement>['tabIndex']
}> &
  TIconCommonProps

export type TIconProps = TDecorativeIconProps | TInteractiveIconProps

export type TIcon = FC<TIconProps>
export type TDecorativeIcon = FC<TDecorativeIconProps>
export type TInteractiveIcon = FC<TInteractiveIconProps>
