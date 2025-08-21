import { EButton } from './enums'

export type TButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  isLoading?: boolean
  size?: (typeof EButton.Size)[keyof typeof EButton.Size]
  label: string
  variant?: (typeof EButton.Variant)[keyof typeof EButton.Variant]
}

export type TButtonIconProps = React.HTMLAttributes<HTMLSpanElement> & {
  icon: React.ReactNode
  isHidden: boolean
}

export type TButtonSpinnerProps = React.HTMLAttributes<HTMLSpanElement> & {
  shouldShow: boolean
}

export type TButton = React.ForwardRefExoticComponent<
  TButtonProps & React.RefAttributes<HTMLButtonElement>
> & {
  Icon: React.FC<TButtonIconProps>
  Spinner: React.FC<TButtonSpinnerProps>
}
