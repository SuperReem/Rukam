import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useForgotPassword  = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const forgotPassword = async (email) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/user/forgotPassword', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email})
    })
    const json = await response.json()

    console.log(json )
    console.log("status")
    console.log(json.status )

    if (!response.ok) {
      console.log("Invalid User")
      setIsLoading(false)
      setError(json.error)
  } 
  else {
    console.log("??valid User")
    setIsLoading(false)
    // setEmail("");
    // setMessage(true)
  }
  }

  return { forgotPassword, isLoading, error }
}