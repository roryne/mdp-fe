import { useCallback, useState } from 'react'

import { RightChevronWhite } from '@/assets'
import { Button } from '@/components'

export default function App() {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = useCallback(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000) // Simulate a network request
  }, [])

  return (
    <div style={{ padding: '1rem' }}>
      <Button
        iconRight={<img alt="Chevron" src={RightChevronWhite} width={16} />}
        isLoading={isLoading}
        label="Click Me"
        onClick={handleClick}
      />
    </div>
  )
}
