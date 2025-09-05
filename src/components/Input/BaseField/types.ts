import type {
  HTMLInputTypeAttribute,
  HTMLProps,
  InputHTMLAttributes,
  ReactNode
} from 'react'

export type TAdornmentCustomProps = Readonly<{
  node?: ReactNode
}>
export type TAdornmentProps = HTMLProps<HTMLDivElement> & TAdornmentCustomProps
export type TBaseFieldMessage = {
  error?: string
  info?: string
  success?: string
}
export type TBaseFieldCustomProps = Readonly<{
  label: string
  endNode?: ReactNode
  key?: number | string
  message?: TBaseFieldMessage
  shouldShowLabel?: boolean
  startNode?: ReactNode
  type?: HTMLInputTypeAttribute
  variant?: 'outline'
}>
export type TBaseFieldProps = InputHTMLAttributes<HTMLInputElement> &
  TBaseFieldCustomProps

export type TMessageCustomProps = Readonly<{
  message?: string
}>
export type TMessageProps = HTMLProps<HTMLDivElement> & TMessageCustomProps
