import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './component/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/movieDetails'
import SeatLayouts from './pages/SeatLayouts'
import MyBooking from './pages/MyBooking'
import Favorite from './pages/Favorite'
import { Toaster } from 'react-hot-toast'
import Footer from './component/Footer'
function App() {

const isAdminRoutes = useLocation().pathname.startsWith("/admin")
  return (
    <>
    <Toaster/>
    {!isAdminRoutes && <Navbar/>}
    <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path='/movies' element={<Movies/>}/>
          <Route path='/movies/:id' element={< MovieDetails/>}/>
                <Route path='/movies/:id/:date' element={<SeatLayouts/>}/>
                      <Route path='/my-booking' element={<MyBooking/>}/>
                            <Route path='/favorite' element={<Favorite/>}/>
    </Routes>
    {!isAdminRoutes && <Footer/> }
    </>
  )
}

export default App
