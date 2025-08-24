import type { Meta, StoryObj } from '@storybook/react-vite'

import { LeftChevronWhite, RightChevronWhite } from '@/assets'
import { Button } from '@/components'

import { EIcon, getIconSizePx } from './__tests__/common'
import { EButton } from './enums'
import type { TButtonProps } from './types'

const LeftIcon = ({ size }: { readonly size: TButtonProps['size'] }) => (
  <img
    alt="Left Arrow Icon"
    src={LeftChevronWhite}
    width={getIconSizePx(size)}
  />
)

const RightIcon = ({ size }: { readonly size: TButtonProps['size'] }) => (
  <img
    alt="Right Arrow Icon"
    src={RightChevronWhite}
    width={getIconSizePx(size)}
  />
)

const meta = {
  argTypes: {
    iconLeft: {
      // @ts-expect-error
      control: { type: '-' },
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'null' },
        type: { summary: 'ReactNode' }
      }
    },
    iconRight: {
      // @ts-expect-error
      control: { type: '-' },
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'null' },
        type: { summary: 'ReactNode' }
      }
    },
    isLoading: {
      control: 'boolean',
      description: 'Show loading spinner',
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
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' }
      }
    },
    size: {
      control: 'inline-radio',
      options: Object.values(EButton.Size),
      table: {
        category: 'Appearance',
        defaultValue: { summary: EButton.Size.Medium },
        type: { summary: Object.values(EButton.Size).join(' | ') }
      }
    },
    variant: {
      control: 'select',
      options: Object.values(EButton.Variant),
      table: {
        category: 'Appearance',
        defaultValue: { summary: EButton.Variant.Primary },
        type: { summary: Object.values(EButton.Variant).join(' | ') }
      }
    }
  },
  args: {
    iconLeft: undefined,
    iconRight: undefined,
    isLoading: false,
    label: 'Click Me',
    size: EButton.Size.Medium,
    variant: EButton.Variant.Primary
  },
  component: Button,
  title: 'Components/Button'
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof Button>

export const Base = {
  args: {
    variant: EButton.Variant.Primary
  }
} satisfies Story

export const Primary = {
  args: {
    variant: EButton.Variant.Primary
  }
} satisfies Story

export const Secondary = {
  args: {
    variant: EButton.Variant.Secondary
  }
} satisfies Story

export const Warning = {
  args: {
    variant: EButton.Variant.Warning
  }
} satisfies Story

export const SmallPrimary = {
  args: {
    size: 'small'
  }
} satisfies Story

export const MediumPrimary = {
  args: {
    size: 'medium'
  }
} satisfies Story

export const LargePrimary = {
  args: {
    size: 'large'
  }
} satisfies Story

export const PrimaryIconOnly = {
  args: {
    iconRight: <RightIcon size={EIcon.Medium} />,
    size: EButton.Size.Medium
  }
} satisfies Story

export const PrimaryWithRightIcon = {
  args: {
    iconRight: <RightIcon size={EIcon.Medium} />,
    size: EButton.Size.Medium
  }
} satisfies Story

export const PrimaryWithLeftIcon = {
  args: {
    iconLeft: <LeftIcon size={EIcon.Medium} />,
    size: EButton.Size.Medium
  }
} satisfies Story

export const PrimaryWithBothIcons = {
  args: {
    iconLeft: <LeftIcon size={EIcon.Medium} />,
    iconRight: <RightIcon size={EIcon.Medium} />,
    size: EButton.Size.Medium
  }
} satisfies Story

export const PrimaryLoading = {
  args: {
    isLoading: true
  }
} satisfies Story

export const PrimaryDisabled = {
  args: {
    disabled: true
  }
} satisfies Story
