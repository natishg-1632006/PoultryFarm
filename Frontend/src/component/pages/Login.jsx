import React, { useEffect, useState } from 'react';
import { GiChicken } from "react-icons/gi";
import api from '../utils/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {

  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate=useNavigate();
  const {login}=useAuth();

  const handelChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    })
  }

  const handelUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("auth/login",
        { email: userData.email, password: userData.password }
      );

      if(res.data.success){
        login(res.data.user, res.data.activeBatch);
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("role",res.data.user.role);
        toast.success("Login success");
        navigate("/");
      }
      else{
        toast.error("Email or password incorrect");
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-purple-50 to-white p-4'>
      <div className='bg-white shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-md border-t-8 border-purple-600'>
        <div className='flex items-center justify-center mb-8'>
          <GiChicken className='text-6xl md:text-7xl text-purple-600 mr-3' />
          <p className='text-4xl md:text-5xl font-bold text-gray-800'>Login</p>
        </div>
        <form onSubmit={handelUserSubmit} className='flex flex-col gap-6'>
          <div>
            <label htmlFor="email" className='text-sm font-bold text-gray-700 mb-2 block'>Email Address</label>
            <input type="email" id="email" name="email" required value={userData.email} onChange={handelChange} className='w-full border-2 border-gray-300 focus:border-purple-600 rounded-xl p-3 transition-all outline-none' placeholder='Enter your email' />
          </div>

          <div>
            <label htmlFor="password" className='text-sm font-bold text-gray-700 mb-2 block'>Password</label>
            <input type="password" id="password" name="password" required value={userData.password} onChange={handelChange} className='w-full border-2 border-gray-300 focus:border-purple-600 rounded-xl p-3 transition-all outline-none' placeholder='Enter your password' />
          </div>

          <button type='submit' className='bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-3 rounded-xl text-lg font-bold transition-all transform hover:scale-105 shadow-lg mt-4'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
