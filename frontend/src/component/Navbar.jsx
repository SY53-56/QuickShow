import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from "../assets/assets"
import { Menu, Search, TicketPlus, X } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { isSignedIn } = useUser()
  const { openSignIn } = useClerk()
  const navigate = useNavigate()

  return (
    <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5'>

      {/* Logo */}
      <Link to="/" className='max-md:flex-1'>
        <img src={assets.logo} alt="logo" className='w-36 h-auto' />
      </Link>

      {/* ✅ Sidebar (Mobile Menu) */}
      <div
        className={`
          fixed top-0 left-0 h-full w-[75%] sm:w-[60%] bg-black/90 text-white 
          flex flex-col items-start gap-8 font-medium px-8 py-20 z-40
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Close button */}
        <X
          onClick={() => setIsOpen(false)}
          className='absolute top-6 right-6 w-6 h-6 cursor-pointer text-gray-400 hover:text-white'
        />

        {/* Nav Links */}
        <Link onClick={() => { window.scrollTo(0, 0); setIsOpen(false) }} to="/">Home</Link>
        <Link onClick={() => { window.scrollTo(0, 0); setIsOpen(false) }} to="/movies">Movies</Link>
        <Link onClick={() => { window.scrollTo(0, 0); setIsOpen(false) }} to="/theaters">Theaters</Link>
        <Link onClick={() => { window.scrollTo(0, 0); setIsOpen(false) }} to="/releases">Releases</Link>
        <Link onClick={() => { window.scrollTo(0, 0); setIsOpen(false) }} to="/favorite">Favorite</Link>
      </div>

      {/* ✅ Background overlay when sidebar is open */}
      {isOpen && (
        <div
          className='fixed top-0 left-0 h-full w-full bg-black/50 backdrop-blur-sm z-30 transition-opacity duration-300'
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Right side (Search + Login/User + Menu) */}
      <div className='flex items-center gap-8'>
        <Search className='hidden md:block w-6 h-6 cursor-pointer text-gray-300 hover:text-white transition' />

        {!isSignedIn ? (
          <button
            onClick={() => openSignIn()}
            className='px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull 
            transition rounded-full font-medium cursor-pointer text-white'
          >
            Login
          </button>
        ) : (
          <UserButton afterSignOutUrl="/">
            <UserButton.MenuItems>
              <UserButton.Action
                label='My Booking'
                labelIcon={<TicketPlus width={15} />}
                onClick={() => navigate("/my-booking")}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}
      </div>

      {/* Mobile Menu Button */}
      <Menu
        onClick={() => setIsOpen(true)}
        className='max-md:ml-4 md:hidden w-8 h-8 cursor-pointer text-white'
      />
    </div>
  )
}
