import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { Create } from './pages/Create'
import { Toaster } from './components/ui/toaster'
import Blue from './pages/Blue'
import Login from './pages/Login'
import Signup from './pages/Signup'


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:id' element={<Blue />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App