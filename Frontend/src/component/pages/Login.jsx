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
        login(res.data.user)
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("role",res.data.user.role);
        console.log(res.data.user);
        
        toast.success("Login success")
        navigate("/");
      }
      else{
        console.log(res);
        toast.error("Email or password incorrect");
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='h-svh flex flex-col items-center justify-center'>
      <p className='text-[50px] flex items-center'><GiChicken className='text-purple-600' />Login</p>
      <form onSubmit={handelUserSubmit} className='flex flex-col border-l-4 border-purple-700 shadow-purple-500 gap-4 w-96 p-10 shadow-2xl rounded-xl'>

        <label htmlFor="email" className='text-[15px] font-bold'>User name</label>
        <input type="email" id="email" name="email" required value={userData.email} onChange={handelChange} className='outline-2 outline-purple-600 rounded-lg p-2 focus:outline-2 focus:outline-purple-500' placeholder='Enter username' />

        <label htmlFor="password" className='text-[15px] font-bold'>Password</label>
        <input type="password" id="password" name="password" required value={userData.password} onChange={handelChange} className='outline-2 outline-purple-600 rounded-lg p-2 focus:outline-2 focus:outline-purple-500' placeholder='Enter password' />

        <button type='submit' className='bg-purple-600 p-2 cursor-pointer rounded-lg text-[15px] font-bold text-white' >Login</button>
      </form>
    </div>
  )
}

export default Login
