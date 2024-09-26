import React from 'react';
import navlogo from '../../assets/logo.png';
import navProfileAnand from '../../assets/nav-profile.jpg'; // Update the path based on your file structure
import navProfileSecondAdmin from '../../assets/arun-navprofile.jpeg'; // Update the path based on your file structure
import './Navbar.css';

const profileImages = {
  "anand@gmail.com": navProfileAnand,
  "Arunrajini@gmail.com": navProfileSecondAdmin,
};

const Navbar = ({ setToken }) => {
  const userEmail = localStorage.getItem('userEmail'); // Retrieve the logged-in user's email
  const profileImage = profileImages[userEmail] || navProfileAnand; // Use a default if not found

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail'); // Clear user email on logout
    setToken('');
  };

  return (
    <div className='navbar'>
      <img src={navlogo} alt="" className='nav-logo' />
      <button onClick={handleLogout} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>
        Logout
      </button>
      <img src={profileImage} alt='' className='nav-profile' />
    </div>
  );
};

export default Navbar;
