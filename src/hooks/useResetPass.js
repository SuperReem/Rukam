import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useResetPass  = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const resetPass = async (resetLink , newPass) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/user/resetPassword', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ resetLink, newPass})
    })
    const json = await response.json()

    console.log(json )
    console.log("reset status")
    console.log(json.status )

    if (!response.ok) {
      console.log(" reset Invalid User")
      setIsLoading(false)
      setError(json.error)
  } 
  else {
    console.log("reset ??valid User")
    setIsLoading(false)
    // setEmail("");
    // setMessage(true)
  }
  }

  return { resetPass, isLoading, error }
}