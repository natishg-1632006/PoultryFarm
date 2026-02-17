import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import { useGlobal } from "../context/GlobalContext";


const Home = () => {
   const { user,getUsers,batch } = useAuth();
   const role=localStorage.getItem("role");
   const navigate=useNavigate();
   console.log(batch);
   
   const newBatch=()=>{
      getUsers();
      navigate("/newbatch")
   }

   return (
      <div className='min-h-screen p-5 mt-16 mb-5'>
         <div className='flex flex-wrap gap-8 '>
            <div onClick={()=>navigate("/dailyentry")}  className='w-80 cursor-pointer bg-purple-200 border-l-6 border-purple-700 rounded-lg h-20 shadow-lg flex items-center justify-between p-5'>
               <p className="text-2xl font-bold ">Daily entry</p>
               <IoIosArrowDroprightCircle className="text-3xl font-bold text-purple-800" />
            </div>
            <div className='w-80 bg-purple-300 border-l-6 border-purple-700 rounded-lg h-20 shadow-lg flex items-center justify-between p-5'>
               <p className="text-2xl font-bold ">New feed</p>
               <IoIosArrowDroprightCircle className="text-3xl font-bold text-purple-800" />
            </div>
            <div className='w-80 bg-purple-200 border-l-6 border-purple-700 rounded-lg h-20 shadow-lg flex items-center justify-between p-5'>
               <p className="text-2xl font-bold ">Dashboard</p>
               <IoIosArrowDroprightCircle className="text-3xl font-bold text-purple-800" />
            </div>
            <div className='w-80 bg-purple-300 border-l-6 border-purple-700 rounded-lg h-20 shadow-lg flex items-center justify-between p-5'>
               <p className="text-2xl font-bold">Medicine</p>
               <IoIosArrowDroprightCircle className="text-3xl font-bold text-purple-800" />
            </div>
           {user && user.role=="admin" && <div onClick={()=>newBatch()} className='w-80 bg-purple-200 border-l-6 border-purple-700 rounded-lg h-20 shadow-lg flex items-center justify-between p-5'>
               <p className="text-2xl font-bold">New batch</p>
               <IoIosArrowDroprightCircle className="text-3xl font-bold text-purple-800" />
            </div>}
            <div className='w-80 bg-purple-300 border-l-6 border-purple-700 rounded-lg h-20 shadow-lg flex items-center justify-between p-5'>
               <p className="text-2xl font-bold">History</p>
               <IoIosArrowDroprightCircle className="text-3xl font-bold text-purple-800" />
            </div>
         </div>
      </div>
   )
}

export default Home
