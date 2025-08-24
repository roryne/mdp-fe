import { EButton } from './enums'

export type TButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  readonly iconLeft?: React.ReactNode
  readonly iconRight?: React.ReactNode
  readonly isLoading?: boolean
  readonly size?: (typeof EButton.Size)[keyof typeof EButton.Size]
  readonly label: string
  readonly variant?: (typeof EButton.Variant)[keyof typeof EButton.Variant]
}

export type TButtonIconProps = React.HTMLAttributes<HTMLSpanElement> & {
  readonly icon: React.ReactNode
  readonly isHidden: boolean
}

export type TButtonSpinnerProps = React.HTMLAttributes<HTMLSpanElement> & {
  readonly shouldShow: boolean
}

export type TButton = React.ForwardRefExoticComponent<
  TButtonProps & React.RefAttributes<HTMLButtonElement>
> & {
  Icon: React.FC<TButtonIconProps>
  Spinner: React.FC<TButtonSpinnerProps>
}
