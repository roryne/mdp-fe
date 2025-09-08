/* eslint-disable sort-keys */
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Icon, Input } from '@/components'

import { props } from './__tests__/common'
import type { TTextInputProps } from './types'
import ChevronRight from '../../../assets/chevron/right.svg?react'

const StartNode = () => <Icon svg={ChevronRight} />
const EndNode = () => <Icon svg={ChevronRight} />

const meta = {
  argTypes: {
    label: {
      control: 'text',
      table: {
        category: 'Appearance',
        type: { summary: 'string' }
      }
    },
    disabled: {
      control: 'boolean',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    endNode: {
      control: 'object',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'null' },
        type: { summary: 'Icon' }
      }
    },
    message: {
      control: 'object',
      table: {
        category: 'Appearance',
        defaultValue: { summary: "{ error: '', info: '', success: '' }" },
        type: { summary: '{ [key: string]: string }' }
      }
    },
    readOnly: {
      control: 'boolean',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    shouldShowLabel: {
      control: 'boolean',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    startNode: {
      control: 'object',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'null' },
        type: { summary: 'Icon' }
      }
    },
    variant: {
      control: 'inline-radio',
      options: ['outline'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'outline' },
        type: { summary: 'outline' }
      }
    }
  },
  args: {
    endNode: '',
    label: 'Label',
    message: { error: '', info: '', success: '' },
    variant: 'outline'
  },
  component: Input.Text,
  title: 'Components/Input.Text'
} satisfies Meta<TTextInputProps>

export default meta

type Story = StoryObj<typeof Input.Text>

export const Base = {
  args: {
    label: props.label,
    variant: 'outline'
  }
} satisfies Story

export const Outline = {
  args: {
    label: props.label,
    variant: 'outline'
  }
} satisfies Story

export const WithStartNode = {
  args: {
    label: props.label,
    startNode: <StartNode />
  }
} satisfies Story

export const WithEndNode = {
  args: {
    label: props.label,
    endNode: <EndNode />
  }
} satisfies Story

export const WithBothNodes = {
  args: {
    label: props.label,
    endNode: <EndNode />,
    startNode: <StartNode />
  }
} satisfies Story

export const LabelHidden = {
  args: {
    label: props.label,
    shouldShowLabel: false
  }
} satisfies Story

export const WithErrorMsg = {
  args: {
    label: props.label,
    message: { error: props.message.error }
  }
} satisfies Story

export const WithInfoMsg = {
  args: {
    label: props.label,
    message: { info: props.message.info }
  }
} satisfies Story

export const WithSuccessMsg = {
  args: {
    label: props.label,
    message: { success: props.message.success }
  }
} satisfies Story

export const Disabled = {
  args: {
    label: props.label,
    value: props.value,
    disabled: true
  }
} satisfies Story

export const ReadOnly = {
  args: {
    label: props.label,
    readOnly: true,
    value: props.value
  }
} satisfies Story
