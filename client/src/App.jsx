import React from 'react'
import Login from './components/auth/Login.jsx'
import Register from './components/auth/Register.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateVocab from './components/vocab/CreateVocab.jsx'
import GetVocab from './components/vocab/GetVocab.jsx'
import GetPhrase from './components/vocab/GetPhrase.jsx'
import CreatePhrase from './components/vocab/CreatePhrase.jsx'
const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/createVocab' element={<CreateVocab/>}/>
      <Route path='/createPhrase' element={<CreatePhrase/>}/>
      <Route path='/getVocab' element={<GetVocab/>}/>
      <Route path='/getPhrase' element={<GetPhrase/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App