/* eslint-disable sort-keys */
import { Spy } from '@/utils/test/spy'

import Input from '../..'
import type { TBaseFieldProps } from '../../BaseField/types'
import type { TTextInputProps } from '../types'

const spy = new Spy()
const handleOnClickSpy = spy.fn

export const props = {
  'aria-label': 'Aria Label',
  defaultValue: 'Default Value',
  endNodeDecorational: <span data-testid="end-node">end node</span>,
  endNodeInteractive: (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/no-noninteractive-tabindex
    <span data-testid="end-node" onClick={handleOnClickSpy} tabIndex={0}>
      end
    </span>
  ),
  label: 'Label',
  message: {
    error: 'Error message',
    info: 'Info message',
    success: 'Success message'
  },
  placeholder: 'Placeholder',
  shouldShowLabel: true,
  spy,
  startNodeDecorational: <span data-testid="start-node">start node</span>,
  startNodeInteractive: (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/no-noninteractive-tabindex
    <span data-testid="start-node" onClick={handleOnClickSpy} tabIndex={0}>
      start
    </span>
  ),
  value: 'Value',
  variant: 'outline'
}

export const makeWrappedTextInput = (props: TTextInputProps) => {
  const { label } = props
  return (
    <div
      data-testid="wrapped-input"
      style={{
        display: 'flex',
        padding: '2rem'
      }}
    >
      <Input.Text {...props} label={label} />
    </div>
  )
}

const defaultAxeProps = {
  disabled: undefined,
  endNode: null,
  label: 'Label',
  message: {
    error: '',
    info: '',
    success: ''
  },
  readOnly: undefined,
  shouldFocus: false, // optional, used for tab/focus scenarios
  shouldShowLabel: true,
  startNode: null,
  variant: 'outline'
} as TBaseFieldProps & { shouldFocus: boolean }

export const axeScenarios = [
  // Baseline: visible label, no adornments/messages
  { ...defaultAxeProps },

  // Hidden label relying on label
  { ...defaultAxeProps, shouldShowLabel: false },

  // Hidden label relying on aria-label
  { ...defaultAxeProps, 'aria-label': 'Hidden Label', shouldShowLabel: false },

  // Message present (error)
  {
    ...defaultAxeProps,
    message: { ...defaultAxeProps.message, error: 'Error message' }
  },

  // Message present (info)
  {
    ...defaultAxeProps,
    message: {
      ...defaultAxeProps.message,
      info: 'Info message'
    }
  },

  // Message present (success)
  {
    ...defaultAxeProps,
    message: {
      ...defaultAxeProps.message,
      success: 'Success message'
    }
  },

  // Interactive start node (unfocused)
  {
    ...defaultAxeProps,
    startNode: props.startNodeInteractive
  },

  // Interactive end node (unfocused)
  { ...defaultAxeProps, endNode: props.endNodeInteractive },

  // Interactive start node (focused)
  {
    ...defaultAxeProps,
    shouldFocus: true,
    startNode: props.startNodeInteractive
  },

  // Interactive end node (focused)
  { ...defaultAxeProps, endNode: props.endNodeInteractive, shouldFocus: true },

  // Decorational start + end nodes (non-focusable)
  {
    ...defaultAxeProps,
    endNode: props.endNodeDecorational,
    startNode: props.startNodeDecorational
  },

  // Disabled input
  { ...defaultAxeProps, disabled: true },

  // Readonly input
  { ...defaultAxeProps, readOnly: true }
] satisfies (typeof defaultAxeProps)[]

const baseOutline = [{ meta: 'outline', variant: 'outline' }]

// Label variants
const labelVariants = [
  { meta: 'with-label', shouldShowLabel: true },
  { meta: 'no-label', shouldShowLabel: false }
]

// State variants
const stateVariants = [
  { meta: 'enabled', disabled: false },
  { meta: 'disabled', disabled: true }
]

const inputContentVariants = [
  { meta: 'empty-no-placeholder', placeholder: '', value: '' },
  { meta: 'with-placeholder', placeholder: props.placeholder, value: '' },
  { meta: 'with-value', value: props.value, placeholder: '' }
]

// Icon variants
const iconVariants = [
  { meta: 'no-icons', endNode: null, startNode: null },
  {
    meta: 'with-start-icon',
    endNode: null,
    startNode: props.startNodeDecorational
  },
  {
    meta: 'with-end-icon',
    endNode: props.endNodeDecorational,
    startNode: null
  },
  {
    meta: 'with-both-icons',
    startNode: props.startNodeDecorational,
    endNode: props.endNodeDecorational
  }
]

// Message variants
const messageVariants = [
  { meta: 'no-message', message: { error: '', info: '', success: '' } },
  {
    meta: 'with-error',
    message: { error: props.message.error, info: '', success: '' }
  },
  {
    meta: 'with-info',
    message: { error: '', info: props.message.info, success: '' }
  },
  {
    meta: 'with-success',
    message: { error: '', info: '', success: props.message.success }
  }
]

type Variant = Record<string, unknown> & { meta: string }

function cartesianProductWithProps(groups: Variant[][]) {
  const initial = [{ title: '', props: {} as Record<string, unknown> }]

  return groups.reduce(
    (acc, group) =>
      acc.flatMap((a) =>
        group.map((b) => {
          // merge non-meta props
          const mergedProps = {
            ...a.props,
            ...Object.fromEntries(
              Object.entries(b).filter(([k]) => k !== 'meta')
            )
          }

          // build title by concatenating meta strings
          const titleParts = [a.title, b.meta].filter(Boolean)
          const title = titleParts.join(' | ')

          return { title, props: mergedProps }
        })
      ),
    initial
  )
}

const outlineScenarios = cartesianProductWithProps([
  baseOutline,
  iconVariants,
  inputContentVariants,
  labelVariants,
  messageVariants,
  stateVariants
])

export const scenarios = {
  outline: outlineScenarios
} as const
