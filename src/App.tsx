import './theme/styles.css'

import Chevron from '@/assets/chevron/right.svg?react'
import { Button, Icon } from '@/components'

export default function App() {
  return (
    <main
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        padding: '1rem 2rem'
      }}
    >
      <Button text="Button" />
      <Button iconRight={<Icon svg={Chevron} />} text="Button" />
      <Button isLoading text="Button" />
      <Button iconRight={<Icon svg={Chevron} />} isLoading text="Button" />
      <Button iconRight={<span>Right</span>} text="Button" />
      <Button size="co" text="Button" />
      <Button isLoading size="co" text="Button" />
    </main>
  )
}
