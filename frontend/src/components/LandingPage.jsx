import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LandingPage({ onContinue }) {
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Check if name already exists in localStorage
  useEffect(() => {
    const savedName = localStorage.getItem('userName')
    if (savedName) {
      setName(savedName)
    }
    setIsLoading(false)
  }, [])

  const handleContinue = () => {
    if (name.trim()) {
      localStorage.setItem('userName', name.trim())
      onContinue()
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && name.trim()) {
      handleContinue()
    }
  }

  if (isLoading) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Welcome</h1>
          <p className="text-black-600">Please enter your name to continue</p>
        </div>
        
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full"
            autoFocus
          />
          
          <Button
            onClick={handleContinue}
            disabled={!name.trim()}
            className="w-full h-14 text-lg font-semibold"
            size="lg"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

