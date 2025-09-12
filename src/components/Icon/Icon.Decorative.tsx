import clsx from 'clsx'

import styles from './Icon.Decorative.module.css'
import { getIconSize } from './common'
import type { TDecorativeIconProps } from './types'

const DecorativeIcon = ({
  className,
  size = 'md',
  svg: Svg
}: TDecorativeIconProps) => {
  if (Svg === undefined) return null

  const classes = clsx(className, { [styles.Svg]: Svg })

  return (
    <Svg
      aria-hidden="true"
      className={classes}
      height={getIconSize(size)}
      tabIndex={-1}
      width={getIconSize(size)}
    />
  )
}

DecorativeIcon.displayName = 'Decorative Icon'

export default DecorativeIcon
