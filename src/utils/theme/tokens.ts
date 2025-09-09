export const getCssVarByToken = (
  group: string,
  value: string,
  modifier: string
) => {
  if (modifier) return `var(--${group}-${value}-${modifier})`
  return `var(--${group}-${value})`
}
