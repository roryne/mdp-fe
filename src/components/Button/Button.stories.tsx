import type { Meta, StoryObj } from '@storybook/react-vite'

import ChevronRight from '@/assets/chevron/right.svg?react'
import { Button, Icon } from '@/components'

import { EButton } from './enums'
import { getColorVar } from '../Icon/common'
import type { TIconProps } from '../Icon/types'

const iconTheme = {
  primary: {
    filled: {
      default: getColorVar('bw-1000')
    },
    outlined: {
      default: getColorVar('blue-400')
    }
  },
  warning: {
    filled: {
      default: getColorVar('bw-1000')
    },
    outlined: {
      default: getColorVar('red-400')
    }
  }
}
const PrimarySolidIcon = ({ size }: { readonly size?: TIconProps['size'] }) => (
  <Icon
    size={size ?? 'md'}
    svg={ChevronRight}
    theme={iconTheme.primary.filled}
  />
)
const PrimaryOutlinedIcon = ({
  size
}: {
  readonly size?: TIconProps['size']
}) => (
  <Icon
    size={size ?? 'md'}
    svg={ChevronRight}
    theme={iconTheme.primary.outlined}
  />
)
const WarningSolidIcon = ({ size }: { readonly size?: TIconProps['size'] }) => (
  <Icon
    size={size ?? 'md'}
    svg={ChevronRight}
    theme={iconTheme.warning.filled}
  />
)
const WarningOutlinedIcon = ({
  size
}: {
  readonly size?: TIconProps['size']
}) => (
  <Icon
    size={size ?? 'md'}
    svg={ChevronRight}
    theme={iconTheme.warning.outlined}
  />
)

const meta = {
  argTypes: {
    disabled: {
      control: 'boolean',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    fill: {
      control: 'select',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'solid' },
        type: { summary: Object.values(EButton.Fill).join(' | ') }
      }
    },
    iconLeft: {
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'Icon' }
      }
    },
    iconRight: {
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'Icon' }
      }
    },
    isLoading: {
      control: 'boolean',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    label: {
      control: 'text',
      table: {
        category: 'Appearance',
        defaultValue: { summary: '' },
        type: { summary: 'string' }
      }
    },
    palette: {
      control: 'select',
      options: Object.values(EButton.Palette),
      table: {
        category: 'Appearance',
        defaultValue: { summary: EButton.Palette.Primary },
        type: { summary: Object.values(EButton.Palette).join(' | ') }
      }
    },
    size: {
      control: 'select',
      options: Object.values(EButton.Size),
      table: {
        category: 'Appearance',
        defaultValue: { summary: EButton.Size.Regular },
        type: { summary: Object.values(EButton.Size).join(' | ') }
      }
    },
    theme: {
      control: 'object',
      description: 'SVG icon colors',
      table: {
        category: 'Appearance',
        defaultValue: { summary: "{ default: '', focus: '', hover: '' }" }
      }
    }
  },
  args: {
    iconLeft: undefined,
    iconRight: undefined,
    isLoading: false,
    label: 'Button',
    palette: EButton.Palette.Primary,
    size: EButton.Size.Regular,
    theme: { default: '', focus: '', hover: '' }
  },
  component: Button,
  title: 'Components/Button'
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof Button>

export const Base = {
  args: {
    label: 'Button'
  }
} satisfies Story

export const Primary = {
  args: {
    ...Base.args,
    palette: EButton.Palette.Primary
  }
} satisfies Story

export const PrimaryOutlined = {
  args: {
    ...Primary.args,
    fill: 'outlined'
  }
} satisfies Story

export const PrimaryOutlinedCompact = {
  args: {
    ...PrimaryOutlined.args,
    size: 'co'
  }
} satisfies Story

export const PrimaryOutlinedDisabled = {
  args: {
    ...PrimaryOutlined.args,
    disabled: true
  }
} satisfies Story

export const PrimaryOutlinedLoading = {
  args: {
    ...PrimaryOutlined.args,
    isLoading: true
  }
} satisfies Story

export const PrimarySolid = {
  args: {
    ...Primary.args,
    fill: 'solid'
  }
} satisfies Story

export const PrimarySolidCompact = {
  args: {
    ...PrimarySolid.args,
    size: 'co'
  }
} satisfies Story

export const PrimarySolidDisabled = {
  args: {
    ...PrimarySolid.args,
    disabled: true
  }
} satisfies Story

export const PrimarySolidLoading = {
  args: {
    ...PrimarySolid.args,
    isLoading: true
  }
} satisfies Story

export const PrimarySolidLeftIcon = {
  args: {
    ...PrimarySolid.args,
    iconLeft: <PrimarySolidIcon size="md" />
  }
} satisfies Story

export const PrimarySolidLeftIconDisabled = {
  args: {
    ...PrimarySolidLeftIcon.args,
    disabled: true
  }
} satisfies Story

export const PrimarySolidLeftIconLoading = {
  args: {
    ...PrimarySolidLeftIcon.args,
    isLoading: true
  }
} satisfies Story

export const PrimarySolidRightIcon = {
  args: {
    ...PrimarySolid.args,
    iconRight: <PrimarySolidIcon />
  }
} satisfies Story

export const PrimarySolidRightIconCompact = {
  args: {
    ...PrimarySolid.args,
    iconRight: <PrimarySolidIcon size="sm" />,
    size: 'co'
  }
} satisfies Story

export const PrimarySolidRightIconDisabled = {
  args: {
    ...PrimarySolidRightIcon.args,
    disabled: true
  }
} satisfies Story

export const PrimarySolidRightIconLoading = {
  args: {
    ...PrimarySolidRightIcon.args,
    isLoading: true
  }
} satisfies Story

export const PrimaryOutlinedLeftIcon = {
  args: {
    ...PrimaryOutlined.args,
    iconLeft: <PrimaryOutlinedIcon />
  }
} satisfies Story

export const PrimaryOutlinedLeftIconDisabled = {
  args: {
    ...PrimaryOutlinedLeftIcon.args,
    disabled: true
  }
} satisfies Story

export const PrimaryOutlinedLeftIconLoading = {
  args: {
    ...PrimaryOutlinedLeftIcon.args,
    isLoading: true
  }
} satisfies Story

export const PrimaryOutlinedRightIcon = {
  args: {
    ...PrimaryOutlined.args,
    iconRight: <PrimaryOutlinedIcon />
  }
} satisfies Story

export const PrimaryOutlinedRightIconCompact = {
  args: {
    ...PrimaryOutlined.args,
    iconRight: <PrimaryOutlinedIcon size="sm" />,
    size: 'co'
  }
} satisfies Story

export const PrimaryOutlinedRightIconDisabled = {
  args: {
    ...PrimaryOutlinedRightIcon.args,
    disabled: true
  }
} satisfies Story

export const PrimaryOutlinedRightIconLoading = {
  args: {
    ...PrimaryOutlinedRightIcon.args,
    isLoading: true
  }
} satisfies Story

export const Warning = {
  args: {
    ...Base.args,
    palette: EButton.Palette.Warning
  }
} satisfies Story

export const WarningOutlined = {
  args: {
    ...Warning.args,
    fill: 'outlined'
  }
} satisfies Story

export const WarningOutlinedCompact = {
  args: {
    ...WarningOutlined.args,
    size: 'co'
  }
} satisfies Story

export const WarningOutlinedDisabled = {
  args: {
    ...WarningOutlined.args,
    disabled: true
  }
} satisfies Story

export const WarningOutlinedLoading = {
  args: {
    ...WarningOutlined.args,
    isLoading: true
  }
} satisfies Story

export const WarningSolid = {
  args: {
    ...Warning.args,
    fill: 'solid'
  }
} satisfies Story

export const WarningSolidCompact = {
  args: {
    ...WarningSolid.args,
    size: 'co'
  }
} satisfies Story

export const WarningSolidDisabled = {
  args: {
    ...WarningSolid.args,
    disabled: true
  }
} satisfies Story

export const WarningSolidLoading = {
  args: {
    ...WarningSolid.args,
    isLoading: true
  }
} satisfies Story

export const WarningSolidLeftIcon = {
  args: {
    ...WarningSolid.args,
    iconLeft: <WarningSolidIcon />
  }
} satisfies Story

export const WarningSolidLeftIconDisabled = {
  args: {
    ...WarningSolidLeftIcon.args,
    disabled: true
  }
} satisfies Story

export const WarningSolidLeftIconLoading = {
  args: {
    ...WarningSolidLeftIcon.args,
    isLoading: true
  }
} satisfies Story

export const WarningSolidRightIcon = {
  args: {
    ...WarningSolid.args,
    iconRight: <WarningSolidIcon />
  }
} satisfies Story

export const WarningSolidRightIconCompact = {
  args: {
    ...WarningSolid.args,
    iconRight: <WarningSolidIcon size="sm" />,
    size: 'co'
  }
} satisfies Story

export const WarningSolidRightIconDisabled = {
  args: {
    ...WarningSolidRightIcon.args,
    disabled: true
  }
} satisfies Story

export const WarningSolidRightIconLoading = {
  args: {
    ...WarningSolidRightIcon.args,
    isLoading: true
  }
} satisfies Story

export const WarningOutlinedLeftIcon = {
  args: {
    ...WarningOutlined.args,
    iconLeft: <WarningOutlinedIcon />
  }
} satisfies Story

export const WarningOutlinedLeftIconDisabled = {
  args: {
    ...WarningOutlinedLeftIcon.args,
    disabled: true
  }
} satisfies Story

export const WarningOutlinedLeftIconLoading = {
  args: {
    ...WarningOutlinedLeftIcon.args,
    isLoading: true
  }
} satisfies Story

export const WarningOutlinedRightIcon = {
  args: {
    ...WarningOutlined.args,
    iconRight: <WarningOutlinedIcon />
  }
} satisfies Story

export const WarningOutlinedRightIconCompact = {
  args: {
    ...WarningOutlined.args,
    iconRight: <WarningOutlinedIcon size="sm" />,
    size: 'co'
  }
} satisfies Story

export const WarningOutlinedRightIconDisabled = {
  args: {
    ...WarningOutlinedRightIcon.args,
    disabled: true
  }
} satisfies Story

export const WarningOutlinedRightIconLoading = {
  args: {
    ...WarningOutlinedRightIcon.args,
    isLoading: true
  }
} satisfies Story
