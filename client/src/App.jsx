import React from 'react'
import Login from './components/auth/Login.jsx'
import Register from './components/auth/Register.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App