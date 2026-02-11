import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './component/pages/Login'
import Home from './component/pages/Home';
import NavBar from './component/pages/NavBar';
import DailyEntry from './component/pages/DailyEntry';
import FeedEntry from './component/pages/FeedEntry';

function App() {
  return (
    <div className='relative'>
    <NavBar/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/dailyentry' element={<DailyEntry/>}/>
        <Route path='/feed' element={<FeedEntry/>}/>
      </Routes>
    </div>
  )
}

export default App
