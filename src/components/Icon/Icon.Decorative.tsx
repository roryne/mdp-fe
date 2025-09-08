import styles from './Icon.Decorative.module.css'
import { getIconSize } from './common'
import type { TDecorativeIconProps } from './types'

const DecorativeIcon = ({ size = 'md', svg: Svg }: TDecorativeIconProps) => (
  <Svg
    aria-hidden="true"
    className={styles.Svg}
    height={getIconSize(size)}
    tabIndex={-1}
    width={getIconSize(size)}
  />
)

DecorativeIcon.displayName = 'Decorative Icon'

export default DecorativeIcon
