import type { CSSProperties } from 'react'

// TODO Fix this by deleting export--unnecessary.
export {}

declare global {
  interface Window {
    __isLoading: boolean
  }
}

export interface IIconStyle extends CSSProperties {
  '--icon-default'?: string
  '--icon-hover'?: string
  '--icon-focus'?: string
}
