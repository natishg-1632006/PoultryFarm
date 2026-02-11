import React, { useEffect, useState } from 'react';
import { GiChicken } from "react-icons/gi";
import api from '../utils/api';

const Login = () => {

  return (
    <div className='h-svh flex flex-col items-center justify-center'>
      <p className='text-[50px] flex items-center'><GiChicken className='text-amber-600' />Login</p>
      <form className='flex flex-col gap-4 w-96 p-10 shadow-xl rounded-xl'>
        <label htmlFor="username" className='text-[15px] font-bold'>User name</label>
        <input type="text" id="username" name="username" className='outline-2 outline-amber-600 rounded-lg p-2 focus:outline-2 focus:outline-amber-500' placeholder='Enter username' />
        <label htmlFor="password" className='text-[15px] font-bold'>Password</label>
        <input type="password" id="password" name="password" className='outline-2 outline-amber-600 rounded-lg p-2 focus:outline-2 focus:outline-amber-500' placeholder='Enter password' />
        <button className='bg-amber-600 p-2 cursor-pointer rounded-lg text-[15px] font-bold text-white'>Login</button>
      </form>
    </div>
  )
}

export default Login
