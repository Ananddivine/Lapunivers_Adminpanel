import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({setToken}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://lapuniversbackend-production.up.railway.app/adminlogin', { email, password });
     
      if (response.data.success) {
        // Store the token in localStorage or as a cookie for further requests
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token);
        toast.success('Login Successful');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              type='email'
              placeholder='Email id'
              required
            />
          </div>
          <div>
            <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              type='password'
              placeholder='Password'
              required
            />
          </div>
          <button className='mt-2 w-full px-4 py-2 rounded-md text-white bg-black' type='submit'>
            Submit
          </button>
        </form>
      </div>
     <ToastContainer />
    </div>
  );
};

export default Login;
