import type { FC } from 'react'

import { conditionalClass, mergeClasses } from '@/utils/html'

import styles from './Button.module.css'
import type { TButtonIconProps } from './types'

const Icon: FC<TButtonIconProps> = ({ icon, isHidden, ...restProps }) => {
  if (icon === undefined) return null

  const className = mergeClasses(
    styles.iconWrapper,
    conditionalClass('hidden', isHidden)
  )

  return (
    <span aria-hidden="true" className={className} {...restProps}>
      {icon}
    </span>
  )
}

Icon.displayName = 'Button Icon'

export default Icon
