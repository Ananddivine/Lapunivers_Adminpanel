import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/admin/Admin'
import Login from './Components/Login/Login';

export const backendUrl = import.meta.env.VITE_BACKEND_URL

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');

  useEffect(() =>{
 localStorage.setItem('token', token)
  },[token])

  return (
    <div>
      { token === "" 
      ? <Login setToken={setToken} />
    :<>
     <Navbar setToken={setToken} />
     <Admin />
     
     </> }
     
    </div>
  )
}

export default App