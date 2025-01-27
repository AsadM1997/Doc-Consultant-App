import React from 'react'
import {Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'


const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar/>
      <Routes>
          <Route  path='/' element={<Home />}  />
      </Routes>
    </div>
  )
}

export default App