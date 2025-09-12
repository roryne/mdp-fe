import type { TIconTheme } from '@/components/Icon/types'
import type { IIconStyle } from '@/global/namespace'

export const mapIconThemeToStyle = (theme: TIconTheme) =>
  ({
    ...(theme.default === '' ? {} : { '--icon-default': theme.default }),
    ...(theme.focus === '' ? {} : { '--icon-focus': theme.focus }),
    ...(theme.hover === '' ? {} : { '--icon-hover': theme.hover })
  }) as IIconStyle
