import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    
    const [data, setData] = useState({
        name: '',
        username: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const formHandler=async (e)=>{
        e.preventDefault()

        try {
          const response = await fetch("http://localhost:3000/api/auth/register",{
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
              alert("Registered successfully")
              Navigate("/getVocab")
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
    <div className='min-h-screen bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center px-4'>
      
      <div className='w-full max-w-md bg-white text-gray-800 rounded-2xl shadow-2xl p-8'>
        
        <h2 className='text-3xl font-bold text-center mb-6 text-orange-500'>
          Create Account
        </h2>

        <form
         onSubmit={formHandler}
         className='flex flex-col gap-4 mb-3'>
          
          <input
            name='name'
            value={data.name}
            onChange={changeHandle}
            type="text"
            placeholder='Name'
            className='px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400'
          />

          <input
            name='username'
            value={data.username}
            onChange={changeHandle}
            type="text"
            placeholder='Username'
            className='px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400'
          />

          <input
            name='email'
            value={data.email}
            onChange={changeHandle}
            type="email"
            placeholder='Email'
            className='px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400'
          />

          <input
            name='password'
            value={data.password}
            onChange={changeHandle}
            type="password"
            placeholder='Password'
            className='px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400'
          />

          <button
            className='mt-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition duration-200 shadow-md'
          >
            Sign Up
          </button>

        </form>
        <p className='text-center'>Have an account <Link to={'/login'} className='text-blue-700'>Login</Link></p>
      </div>
    </div>
  )
}

export default Register