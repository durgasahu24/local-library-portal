import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import BookCard from './components/BookCard.jsx'
import BookDetailPage from './pages/BookDetailPage.jsx'
import BooksPage from './pages/BooksPage.jsx'


function App() {


  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/books' element={<BooksPage />} />
          <Route path='/bookdetail/:id' element={<BookDetailPage />} />
        </Routes>
        <Footer />

      </BrowserRouter>

    </>
  )
}

export default App
