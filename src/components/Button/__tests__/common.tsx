import LeftChevronBlue from '@/assets/chevron/left-chevron-blue.svg'
import LeftChevronRed from '@/assets/chevron/left-chevron-red.svg'
import LeftChevronWhite from '@/assets/chevron/left-chevron-white.svg'
import RightChevronBlue from '@/assets/chevron/right-chevron-blue.svg'
import RightChevronRed from '@/assets/chevron/right-chevron-red.svg'
import RightChevronWhite from '@/assets/chevron/right-chevron-white.svg'

import type { TButtonProps } from '../types'

export const EIcon = {
  Large: 'large',
  Medium: 'medium',
  Size: {
    Px: {
      Large: 20,
      Medium: 16,
      Small: 12
    },
    Rem: {
      Large: '1.25rem',
      Medium: '1rem',
      Small: '0.75rem'
    }
  },
  Small: 'small'
} as const

export const getIconSizePx = (size: TButtonProps['size']) => {
  switch (size) {
    case EIcon.Small:
      return EIcon.Size.Px.Small
    case EIcon.Medium:
      return EIcon.Size.Px.Medium
    case EIcon.Large:
      return EIcon.Size.Px.Large
    default:
      throw new Error('Could not get icon size pixels')
  }
}

const getIcon = ({
  src,
  size,
  ...restProps
}: {
  src: string
  size: TButtonProps['size']
}) => <img alt="Chevron" {...restProps} src={src} width={getIconSizePx(size)} />

export const allCases: TButtonProps[] = [
  { label: 'Submit', size: 'small', variant: 'primary' },
  { label: 'Submit', size: 'medium', variant: 'primary' },
  { label: 'Submit', size: 'large', variant: 'primary' },
  {
    iconLeft: getIcon({ size: EIcon.Small, src: LeftChevronWhite }),
    label: 'Submit',
    size: 'small',
    variant: 'primary'
  },
  {
    iconLeft: getIcon({ size: EIcon.Medium, src: LeftChevronWhite }),
    label: 'Submit',
    size: 'medium',
    variant: 'primary'
  },
  {
    iconLeft: getIcon({ size: EIcon.Large, src: LeftChevronWhite }),
    label: 'Submit',
    size: 'large',
    variant: 'primary'
  },
  {
    iconRight: getIcon({ size: EIcon.Small, src: RightChevronWhite }),
    label: 'Submit',
    size: 'small',
    variant: 'primary'
  },
  {
    iconRight: getIcon({ size: EIcon.Medium, src: RightChevronWhite }),
    label: 'Submit',
    size: 'medium',
    variant: 'primary'
  },
  {
    iconRight: getIcon({ size: EIcon.Large, src: RightChevronWhite }),
    label: 'Submit',
    size: 'large',
    variant: 'primary'
  },
  {
    iconLeft: getIcon({ size: EIcon.Small, src: LeftChevronWhite }),
    iconRight: getIcon({ size: EIcon.Small, src: RightChevronWhite }),
    label: 'Submit',
    size: 'small',
    variant: 'primary'
  },
  {
    iconLeft: getIcon({ size: EIcon.Medium, src: LeftChevronWhite }),
    iconRight: getIcon({ size: EIcon.Medium, src: RightChevronWhite }),
    label: 'Submit',
    size: 'medium',
    variant: 'primary'
  },
  {
    iconLeft: getIcon({ size: EIcon.Large, src: LeftChevronWhite }),
    iconRight: getIcon({ size: EIcon.Large, src: RightChevronWhite }),
    label: 'Submit',
    size: 'large',
    variant: 'primary'
  },
  { label: 'Submit', size: 'small', variant: 'secondary' },
  { label: 'Submit', size: 'medium', variant: 'secondary' },
  { label: 'Submit', size: 'large', variant: 'secondary' },
  {
    iconLeft: getIcon({ size: EIcon.Small, src: LeftChevronBlue }),
    label: 'Submit',
    size: 'small',
    variant: 'secondary'
  },
  {
    iconLeft: getIcon({ size: EIcon.Medium, src: LeftChevronBlue }),
    label: 'Submit',
    size: 'medium',
    variant: 'secondary'
  },
  {
    iconLeft: getIcon({ size: EIcon.Large, src: LeftChevronBlue }),
    label: 'Submit',
    size: 'large',
    variant: 'secondary'
  },
  {
    iconRight: getIcon({ size: EIcon.Small, src: RightChevronBlue }),
    label: 'Submit',
    size: 'small',
    variant: 'secondary'
  },
  {
    iconRight: getIcon({ size: EIcon.Medium, src: RightChevronBlue }),
    label: 'Submit',
    size: 'medium',
    variant: 'secondary'
  },
  {
    iconRight: getIcon({ size: EIcon.Large, src: RightChevronBlue }),
    label: 'Submit',
    size: 'large',
    variant: 'secondary'
  },
  {
    iconLeft: getIcon({ size: EIcon.Small, src: LeftChevronBlue }),
    iconRight: getIcon({ size: EIcon.Small, src: RightChevronBlue }),
    label: 'Submit',
    size: 'small',
    variant: 'secondary'
  },
  {
    iconLeft: getIcon({ size: EIcon.Medium, src: LeftChevronBlue }),
    iconRight: getIcon({ size: EIcon.Medium, src: RightChevronBlue }),
    label: 'Submit',
    size: 'medium',
    variant: 'secondary'
  },
  {
    iconLeft: getIcon({ size: EIcon.Large, src: LeftChevronBlue }),
    iconRight: getIcon({ size: EIcon.Large, src: RightChevronBlue }),
    label: 'Submit',
    size: 'large',
    variant: 'secondary'
  },
  { label: 'Submit', size: 'small', variant: 'warning' },
  { label: 'Submit', size: 'medium', variant: 'warning' },
  { label: 'Submit', size: 'large', variant: 'warning' },
  {
    iconLeft: getIcon({ size: EIcon.Small, src: LeftChevronRed }),
    label: 'Submit',
    size: 'small',
    variant: 'warning'
  },
  {
    iconLeft: getIcon({ size: EIcon.Medium, src: LeftChevronRed }),
    label: 'Submit',
    size: 'medium',
    variant: 'warning'
  },
  {
    iconLeft: getIcon({ size: EIcon.Large, src: LeftChevronRed }),
    label: 'Submit',
    size: 'large',
    variant: 'warning'
  },
  {
    iconRight: getIcon({ size: EIcon.Small, src: RightChevronRed }),
    label: 'Submit',
    size: 'small',
    variant: 'warning'
  },
  {
    iconRight: getIcon({ size: EIcon.Medium, src: RightChevronRed }),
    label: 'Submit',
    size: 'medium',
    variant: 'warning'
  },
  {
    iconRight: getIcon({ size: EIcon.Large, src: RightChevronRed }),
    label: 'Submit',
    size: 'large',
    variant: 'warning'
  },
  {
    iconLeft: getIcon({ size: EIcon.Small, src: LeftChevronRed }),
    iconRight: getIcon({ size: EIcon.Small, src: RightChevronRed }),
    label: 'Submit',
    size: 'small',
    variant: 'warning'
  },
  {
    iconLeft: getIcon({ size: EIcon.Medium, src: LeftChevronRed }),
    iconRight: getIcon({ size: EIcon.Medium, src: RightChevronRed }),
    label: 'Submit',
    size: 'medium',
    variant: 'warning'
  },
  {
    iconLeft: getIcon({ size: EIcon.Large, src: LeftChevronRed }),
    iconRight: getIcon({ size: EIcon.Large, src: RightChevronRed }),
    label: 'Submit',
    size: 'large',
    variant: 'warning'
  }
]

export const defaultProps = {
  label: 'Submit'
}
