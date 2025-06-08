import { useState } from 'react'
// import './App.css'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

function App() {


  return (
    <>
    <BrowserRouter>
    <Navigation/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
      
    </>
  )
}

export default App
