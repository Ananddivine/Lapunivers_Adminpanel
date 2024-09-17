import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/logo.png'
import navProfile from '../../assets/nav-profile.jpg'

const Navbar = ({setToken}) => {
  return (
    <div className='navbar'>
   <img src={navlogo} alt="" className='nav-logo' />
   <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
   <img src={navProfile} alt='' className='nav-profile'/>
    </div>
  )
}

export default Navbar;