import { HtmlUtils } from '@/utils'

import { getHiddenClass } from '.'
import styles from './Button.module.css'
import type { TButtonIconProps } from './types'

const Icon: React.FC<TButtonIconProps> = ({ icon, isHidden, ...restProps }) => {
  if (!icon) return null

  const className = HtmlUtils.getClassName(
    styles.iconWrapper,
    getHiddenClass(isHidden)
  )

  return (
    <span aria-hidden="true" className={className} {...restProps}>
      {icon}
    </span>
  )
}

Icon.displayName = 'Button Icon'

export default Icon
