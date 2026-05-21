import React from 'react'
import Login from './components/auth/Login.jsx'
import Register from './components/auth/Register.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateVocab from './components/vocab/CreateVocab.jsx'
import GetVocab from './components/vocab/GetVocab.jsx'
const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/create' element={<CreateVocab/>}/>
      <Route path='/get' element={<GetVocab/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App