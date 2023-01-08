import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useForgotPassword = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const forgotPassword = async (email) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/forgotPassword', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email})
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
      console.log("not ok")
    }
    if (response.ok) {
     localStorage.setItem('user', JSON.stringify(json))
      dispatch({type: 'LOGIN', payload: json})
      console.log(" ok")


      // update loading state
      setIsLoading(false)
    }
  }

  return { forgotPassword, isLoading, error }
}

///temp