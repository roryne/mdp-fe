import type * as React from 'react'

const StorybookSection = ({
  children
}: {
  readonly children: React.ReactNode
}) => <div className="sb-container--section">{children}</div>

StorybookSection.displayName = 'Storybook Section'

export default StorybookSection
