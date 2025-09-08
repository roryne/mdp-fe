/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.svg' {
  import type { ForwardRefExoticComponent, RefAttributes } from 'react'

  const Component: ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>
  export default Component
}
