import Input from '../..'
import type { TTextInputProps } from '../types'

export const Node = () => 'node'

export const props = {
  defaultValue: 'Default Value',
  label: 'Label',
  message: {
    error: 'Error message',
    info: 'Info message',
    success: 'Success message'
  },
  shouldShowLabel: true,
  value: 'Value',
  variant: 'outline'
} satisfies TTextInputProps

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
