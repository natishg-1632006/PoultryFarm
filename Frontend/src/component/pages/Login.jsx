import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const Login = () => {

  return (
    <div className='h-full'>
      <form className='flex flex-col w-96'>
        <label htmlFor="username">User name</label>
        <input type="text" id="username" name="username" placeholder='Enter username' />
        <label htmlFor="password">User name</label>
        <input type="password" id="password" name="password" placeholder='Enter password' />
      </form>
    </div>
  )
}

export default Login
