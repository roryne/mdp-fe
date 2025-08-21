import LeftChevronBlue from '@/assets/chevron/left-chevron-blue.svg'
import LeftChevronWhite from '@/assets/chevron/left-chevron-white.svg'
import LeftChevronRed from '@/assets/chevron/left-chevron-red.svg'
import RightChevronBlue from '@/assets/chevron/right-chevron-blue.svg'
import RightChevronWhite from '@/assets/chevron/right-chevron-white.svg'
import RightChevronRed from '@/assets/chevron/right-chevron-red.svg'
import type { TButtonProps } from '../types'

export const EIcon = {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
  Size: {
    Px: {
      Small: 12,
      Medium: 16,
      Large: 20
    },
    Rem: {
      Small: '0.75rem',
      Medium: '1rem',
      Large: '1.25rem'
    }
  }
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
}) => <img {...restProps} src={src} width={getIconSizePx(size)} />

export const allCases: TButtonProps[] = [
  { label: 'Submit', size: 'small', variant: 'primary' },
  { label: 'Submit', size: 'medium', variant: 'primary' },
  { label: 'Submit', size: 'large', variant: 'primary' },
  {
    iconLeft: getIcon({ src: LeftChevronWhite, size: EIcon.Small }),
    label: 'Submit',
    size: 'small',
    variant: 'primary'
  },
  {
    iconLeft: getIcon({ src: LeftChevronWhite, size: EIcon.Medium }),
    label: 'Submit',
    size: 'medium',
    variant: 'primary'
  },
  {
    iconLeft: getIcon({ src: LeftChevronWhite, size: EIcon.Large }),
    label: 'Submit',
    size: 'large',
    variant: 'primary'
  },
  {
    iconRight: getIcon({ src: RightChevronWhite, size: EIcon.Small }),
    label: 'Submit',
    size: 'small',
    variant: 'primary'
  },
  {
    iconRight: getIcon({ src: RightChevronWhite, size: EIcon.Medium }),
    label: 'Submit',
    size: 'medium',
    variant: 'primary'
  },
  {
    iconRight: getIcon({ src: RightChevronWhite, size: EIcon.Large }),
    label: 'Submit',
    size: 'large',
    variant: 'primary'
  },
  {
    iconLeft: getIcon({ src: LeftChevronWhite, size: EIcon.Small }),
    iconRight: getIcon({ src: RightChevronWhite, size: EIcon.Small }),
    label: 'Submit',
    size: 'small',
    variant: 'primary'
  },
  {
    iconLeft: getIcon({ src: LeftChevronWhite, size: EIcon.Medium }),
    iconRight: getIcon({ src: RightChevronWhite, size: EIcon.Medium }),
    label: 'Submit',
    size: 'medium',
    variant: 'primary'
  },
  {
    iconLeft: getIcon({ src: LeftChevronWhite, size: EIcon.Large }),
    iconRight: getIcon({ src: RightChevronWhite, size: EIcon.Large }),
    label: 'Submit',
    size: 'large',
    variant: 'primary'
  },
  { label: 'Submit', size: 'small', variant: 'secondary' },
  { label: 'Submit', size: 'medium', variant: 'secondary' },
  { label: 'Submit', size: 'large', variant: 'secondary' },
  {
    iconLeft: getIcon({ src: LeftChevronBlue, size: EIcon.Small }),
    label: 'Submit',
    size: 'small',
    variant: 'secondary'
  },
  {
    iconLeft: getIcon({ src: LeftChevronBlue, size: EIcon.Medium }),
    label: 'Submit',
    size: 'medium',
    variant: 'secondary'
  },
  {
    iconLeft: getIcon({ src: LeftChevronBlue, size: EIcon.Large }),
    label: 'Submit',
    size: 'large',
    variant: 'secondary'
  },
  {
    iconRight: getIcon({ src: RightChevronBlue, size: EIcon.Small }),
    label: 'Submit',
    size: 'small',
    variant: 'secondary'
  },
  {
    iconRight: getIcon({ src: RightChevronBlue, size: EIcon.Medium }),
    label: 'Submit',
    size: 'medium',
    variant: 'secondary'
  },
  {
    iconRight: getIcon({ src: RightChevronBlue, size: EIcon.Large }),
    label: 'Submit',
    size: 'large',
    variant: 'secondary'
  },
  {
    iconLeft: getIcon({ src: LeftChevronBlue, size: EIcon.Small }),
    iconRight: getIcon({ src: RightChevronBlue, size: EIcon.Small }),
    label: 'Submit',
    size: 'small',
    variant: 'secondary'
  },
  {
    iconLeft: getIcon({ src: LeftChevronBlue, size: EIcon.Medium }),
    iconRight: getIcon({ src: RightChevronBlue, size: EIcon.Medium }),
    label: 'Submit',
    size: 'medium',
    variant: 'secondary'
  },
  {
    iconLeft: getIcon({ src: LeftChevronBlue, size: EIcon.Large }),
    iconRight: getIcon({ src: RightChevronBlue, size: EIcon.Large }),
    label: 'Submit',
    size: 'large',
    variant: 'secondary'
  },
  { label: 'Submit', size: 'small', variant: 'warning' },
  { label: 'Submit', size: 'medium', variant: 'warning' },
  { label: 'Submit', size: 'large', variant: 'warning' },
  {
    iconLeft: getIcon({ src: LeftChevronRed, size: EIcon.Small }),
    label: 'Submit',
    size: 'small',
    variant: 'warning'
  },
  {
    iconLeft: getIcon({ src: LeftChevronRed, size: EIcon.Medium }),
    label: 'Submit',
    size: 'medium',
    variant: 'warning'
  },
  {
    iconLeft: getIcon({ src: LeftChevronRed, size: EIcon.Large }),
    label: 'Submit',
    size: 'large',
    variant: 'warning'
  },
  {
    iconRight: getIcon({ src: RightChevronRed, size: EIcon.Small }),
    label: 'Submit',
    size: 'small',
    variant: 'warning'
  },
  {
    iconRight: getIcon({ src: RightChevronRed, size: EIcon.Medium }),
    label: 'Submit',
    size: 'medium',
    variant: 'warning'
  },
  {
    iconRight: getIcon({ src: RightChevronRed, size: EIcon.Large }),
    label: 'Submit',
    size: 'large',
    variant: 'warning'
  },
  {
    iconLeft: getIcon({ src: LeftChevronRed, size: EIcon.Small }),
    iconRight: getIcon({ src: RightChevronRed, size: EIcon.Small }),
    label: 'Submit',
    size: 'small',
    variant: 'warning'
  },
  {
    iconLeft: getIcon({ src: LeftChevronRed, size: EIcon.Medium }),
    iconRight: getIcon({ src: RightChevronRed, size: EIcon.Medium }),
    label: 'Submit',
    size: 'medium',
    variant: 'warning'
  },
  {
    iconLeft: getIcon({ src: LeftChevronRed, size: EIcon.Large }),
    iconRight: getIcon({ src: RightChevronRed, size: EIcon.Large }),
    label: 'Submit',
    size: 'large',
    variant: 'warning'
  }
]

export const defaultProps = {
  label: 'Submit'
}

export const viewports = [
  { width: 1440, height: 900, name: 'desktop-large' },
  { width: 1024, height: 768, name: 'desktop-small' },
  { width: 768, height: 1024, name: 'tablet-portrait' },
  { width: 375, height: 812, name: 'mobile-portrait' }
]
