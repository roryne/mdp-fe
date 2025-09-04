export type TLabelCustomProps = Readonly<{
  label: string
  shouldShow: boolean
}>
export type TLabelProps = React.LabelHTMLAttributes<HTMLLabelElement> &
  TLabelCustomProps
