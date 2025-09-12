import type { Meta, StoryObj } from '@storybook/react-vite'

import ChevronRight from '@/assets/chevron/right.svg?react'
import { Button, Icon } from '@/components'
import { ETheme } from '@/theme/enums'

import { getColorVar } from '../Icon/common'

const iconTheme = {
  primary: {
    outlined: {
      default: getColorVar('blue-400')
    },
    solid: {
      default: getColorVar('bw-1000')
    }
  },
  warning: {
    outlined: {
      default: getColorVar('red-400')
    },
    solid: {
      default: getColorVar('bw-1000')
    }
  }
}

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
      options: Object.values(ETheme.Fill),
      table: {
        category: 'Appearance',
        defaultValue: { summary: ETheme.Fill.Solid },
        type: { summary: Object.values(ETheme.Fill).join(' | ') }
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
    palette: {
      control: 'select',
      options: Object.values(ETheme.Palette),
      table: {
        category: 'Appearance',
        defaultValue: { summary: ETheme.Palette.Primary },
        type: { summary: Object.values(ETheme.Palette).join(' | ') }
      }
    },
    size: {
      control: 'select',
      options: Object.values(ETheme.Size.Component),
      table: {
        category: 'Appearance',
        defaultValue: { summary: ETheme.Size.Component.Regular },
        type: { summary: Object.values(ETheme.Size).join(' | ') }
      }
    },
    text: {
      control: 'text',
      table: {
        category: 'Appearance',
        defaultValue: { summary: '' },
        type: { summary: 'string' }
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
    fill: ETheme.Fill.Solid,
    iconLeft: undefined,
    iconRight: undefined,
    isLoading: false,
    palette: ETheme.Palette.Primary,
    size: ETheme.Size.Component.Regular,
    text: 'Button',
    theme: { default: '', focus: '', hover: '' }
  },
  component: Button,
  title: 'Components/Button'
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof Button>

export const Base = {
  args: {
    text: 'Button'
  }
} satisfies Story

export const Primary = {
  args: {
    ...Base.args,
    palette: ETheme.Palette.Primary
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
    iconLeft: (
      <Icon size="md" svg={ChevronRight} theme={iconTheme.primary.solid} />
    )
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
    iconRight: (
      <Icon size="md" svg={ChevronRight} theme={iconTheme.primary.solid} />
    )
  }
} satisfies Story

export const PrimarySolidRightIconCompact = {
  args: {
    ...PrimarySolid.args,
    iconRight: (
      <Icon size="sm" svg={ChevronRight} theme={iconTheme.primary.solid} />
    ),
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
    iconLeft: (
      <Icon size="md" svg={ChevronRight} theme={iconTheme.primary.outlined} />
    )
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
    iconRight: (
      <Icon size="md" svg={ChevronRight} theme={iconTheme.primary.outlined} />
    )
  }
} satisfies Story

export const PrimaryOutlinedRightIconCompact = {
  args: {
    ...PrimaryOutlined.args,
    iconRight: (
      <Icon size="sm" svg={ChevronRight} theme={iconTheme.primary.outlined} />
    ),
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
    palette: ETheme.Palette.Warning
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
    iconLeft: (
      <Icon size="md" svg={ChevronRight} theme={iconTheme.warning.solid} />
    )
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
    iconRight: (
      <Icon size="md" svg={ChevronRight} theme={iconTheme.warning.solid} />
    )
  }
} satisfies Story

export const WarningSolidRightIconCompact = {
  args: {
    ...WarningSolid.args,
    iconRight: (
      <Icon size="sm" svg={ChevronRight} theme={iconTheme.warning.solid} />
    ),
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
    iconLeft: (
      <Icon size="md" svg={ChevronRight} theme={iconTheme.warning.solid} />
    )
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
    iconRight: (
      <Icon size="md" svg={ChevronRight} theme={iconTheme.warning.outlined} />
    )
  }
} satisfies Story

export const WarningOutlinedRightIconCompact = {
  args: {
    ...WarningOutlined.args,
    iconRight: (
      <Icon size="sm" svg={ChevronRight} theme={iconTheme.warning.outlined} />
    ),
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
