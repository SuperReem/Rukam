import { useState } from "react"
import { useSignup } from "../hooks/useSignup"



const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setuserType] = useState('')
  const {signup, error, isLoading} = useSignup()

  


  const handleSubmit = async (e) => {
    e.preventDefault()
    
    console.log(email, password, userType)

    await signup(email, password, userType)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />      <br/>

      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
      <br/>
      <input 
        type="text" 
        onChange={(e) => setuserType(e.target.value)} 
        value={userType} 
      />
      <br/>

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}
export default Signup