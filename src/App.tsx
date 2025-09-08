import './global/styles/styles.css'

import { Button } from '@/components'

export default function App() {
  return (
    <main>
      <h1>Button</h1>
      <section style={{ padding: '1rem 2rem' }}>
        <Button label="Button" />
      </section>
    </main>
  )
}
