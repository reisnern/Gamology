import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'

import Auth from '../utils/auth'
import { LOGIN_USER } from '../utils/mutations'

function Login (props) {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' })
  const [login, { error }] = useMutation(LOGIN_USER)
  console.log(error)
  const handleFormSubmit = async (event) => {
    event.preventDefault()

    try {
      const mutationResponse = await login({ variables: { email: userFormData.email, password: userFormData.password } })
      const token = mutationResponse.data.login.token

      Auth.login(token)
    } catch (error) {
      console.log('Error: ' + error)
    }
  }

  const change = (event) => {
    const { name, value } = event.target
    setUserFormData({
      ...userFormData,
      [name]: value
    })
  }

  return (
        <div className="form-container">
            <h2 className="form-header">Login</h2>

            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input id="email" name="email" type="current-email" onBlur={change}/>
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input id="password" name="password" type="password" onBlur={change}/>
                </div>

                <button type="submit">Submit</button>
            </form>

            <Link to="/signup">Actually Lets Sign Up Instead</Link>
        </div>
  )
}

export default Login
