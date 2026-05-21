import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"

const Login = () => {

    const navigate = useNavigate()
    const [data, setData] = useState({
            email: '',
            password: ''
        })
    
    const formHandler=async (e)=>{
        e.preventDefault()

        try {
          const response = await fetch("http://localhost:3000/api/auth/login",{
            method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              credentials: "include",
              body: JSON.stringify(data)
          })
          const result = await response.json()
  
          console.log(result)
  
          if (response.ok) {
              alert("Logged in successfully")
              navigate('/get')
          } else {
              alert(result.message)
          }

        } catch (error) {
          console.log(error)
        }
    }
    
    const changeHandle=(e)=>{
        const {name, value} = e.target
        setData((prev)=>({
            ...prev,
            [name]: value
        }))
    }
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center px-4'>
      
      <div className='w-full max-w-md bg-white text-gray-800 rounded-2xl shadow-2xl p-8'>
        
        <h2 className='text-3xl font-bold text-center mb-6 text-blue-600'>
          Welcome Back
        </h2>

        <form
        onSubmit={formHandler}
        className='flex flex-col gap-4 mb-4'>
          
          <input
            name='email'
            value={data.email}
            onChange={changeHandle}
            type="email"
            placeholder='Email'
            className='px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
          />

          <input
            name='password'
            value={data.password}
            onChange={changeHandle}
            type="password"
            placeholder='Password'
            className='px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
          />

          <button
            className='mt-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200 shadow-md'
          >
            Login
          </button>

        </form>
        <p className='text-center'>Don't have an account <Link to={'/'} className='text-blue-700'>Signup</Link></p>
        
      </div>
    </div>
  )
}

export default Login