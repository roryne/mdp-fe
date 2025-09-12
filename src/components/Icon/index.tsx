import DecorativeIcon from './Icon.Decorative'
import InteractiveIcon from './Icon.Interactive'
import type { TIconProps, TInteractiveIconProps } from './types'

function isInteractiveIconProps(
  props: TIconProps
): props is TInteractiveIconProps {
  return Object.keys(props).some((k) => k.startsWith('on'))
}

const Icon = (props: TIconProps) =>
  isInteractiveIconProps(props) ?
    <InteractiveIcon {...props} />
  : <DecorativeIcon {...props} />

Icon.displayName = 'Icon'

export default Icon
