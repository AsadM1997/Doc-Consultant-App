import React from 'react'
import {Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Appointments from './pages/Appointments'



const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar/>
      <Routes>
          <Route  path='/' element={<Home />}  />
          <Route  path='/doctors'  element={<Doctors/>}  />
          <Route  path='/doc/:speciality'  element={<Doctors/>}  />
          <Route path='/login' element={<Login/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/my-appointments' element={<MyAppointments/>} />
          <Route path='/my-profile' element={<MyProfile/>} />
          <Route path='appointment:docId' element={<Appointments/>}  />
      </Routes>
    </div>
  )
}

export default App