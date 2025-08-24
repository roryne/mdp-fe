import type * as React from 'react'

const StorybookExample = ({ children }: React.PropsWithChildren) => (
  <div className="sb-container--example">{children}</div>
)

StorybookExample.displayName = 'Storybook Example'

export default StorybookExample
