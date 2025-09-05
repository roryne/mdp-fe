import './global/styles.css'

import { useCallback, useState } from 'react'

import { RightChevronWhite } from '@/assets'
import { Button, Input } from '@/components'

export default function App() {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = useCallback(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000) // Simulate a network request
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        gap: '3rem',
        padding: '2rem'
      }}
    >
      <Button
        iconRight={<img alt="Chevron" src={RightChevronWhite} width={16} />}
        isLoading={isLoading}
        label="Button"
        onClick={handleClick}
      />
      <Input.Text label="Label" />
    </div>
  )
}
