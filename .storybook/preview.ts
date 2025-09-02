import type { Preview } from '@storybook/react-vite'
import '@/global/styles.module.css'
import '@/storybook/components/storybook-docs.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
