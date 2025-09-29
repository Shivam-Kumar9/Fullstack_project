import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Register from '../Pages/SignIn'
import Login from '../Pages/Login'
import Notes from '../Pages/Notes'

function Routing() {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/notes' element={<Notes/>} />
    </Routes>
  )
}

export default Routing