import { isValidElement } from 'react'

import type { TButtonIconProps } from './types'

const ButtonIcon = ({ className, icon }: TButtonIconProps) => {
  if (icon === undefined) return null

  if (isValidElement(icon)) {
    return {
      ...icon,
      props: { ...(icon.props ?? null), 'aria-hidden': true, className }
    }
  }
}

ButtonIcon.displayName = 'Button Icon'

export default ButtonIcon
