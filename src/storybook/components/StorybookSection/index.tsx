import type { ReactNode } from 'react'

const StorybookSection = ({ children }: { readonly children: ReactNode }) => (
  <div className="sb-container--section">{children}</div>
)

StorybookSection.displayName = 'Storybook Section'

export default StorybookSection
