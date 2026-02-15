import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";


const Home = () => {
   const { user, loading } = useAuth();

   return (
      <div className='min-h-screen p-5 mt-16 mb-5'>
         <div className='flex flex-wrap gap-8 '>
            <div className='w-80 bg-amber-200 rounded-lg h-20 shadow-lg flex items-center justify-between p-5'>
               <p className="text-2xl font-bold text-amber-600">Daily entry</p>
               <IoIosArrowDroprightCircle className="text-3xl font-bold text-amber-800" />
            </div>
            <div className='w-80 bg-amber-200 rounded-lg h-20 shadow-lg flex items-center justify-between p-5'>
               <p className="text-2xl font-bold text-amber-600">New feed</p>
               <IoIosArrowDroprightCircle className="text-3xl font-bold text-amber-800" />
            </div>
            <div className='w-80 bg-amber-200 rounded-lg h-20 shadow-lg flex items-center justify-between p-5'>
               <p className="text-2xl font-bold text-amber-600">Dashboard</p>
               <IoIosArrowDroprightCircle className="text-3xl font-bold text-amber-800" />
            </div>
            <div className='w-80 bg-amber-200 rounded-lg h-20 shadow-lg flex items-center justify-between p-5'>
               <p className="text-2xl font-bold text-amber-600">Medicine</p>
               <IoIosArrowDroprightCircle className="text-3xl font-bold text-amber-800" />
            </div>
            <div className='w-80 bg-amber-200 rounded-lg h-20 shadow-lg flex items-center justify-between p-5'>
               <p className="text-2xl font-bold text-amber-600">New batch</p>
               <IoIosArrowDroprightCircle className="text-3xl font-bold text-amber-800" />
            </div>
            <div className='w-80 bg-amber-200 rounded-lg h-20 shadow-lg flex items-center justify-between p-5'>
               <p className="text-2xl font-bold text-amber-600">History</p>
               <IoIosArrowDroprightCircle className="text-3xl font-bold text-amber-800" />
            </div>
         </div>
      </div>
   )
}

export default Home
