export type TShortcutLabel = {
  id: number
  name: string
}

export type TShortcutStory = {
  id: number
  name: string
  workflow_state_id: number
  labels: TShortcutLabel[]
}
