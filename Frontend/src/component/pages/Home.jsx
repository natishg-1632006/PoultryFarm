import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import { useGlobal } from "../context/GlobalContext";


const Home = () => {
   const { user,getUsers,batch } = useAuth();
   const role=localStorage.getItem("role");
   const navigate=useNavigate();

   const newBatch=()=>{
      getUsers();
      navigate("/newbatch")
   }

   return (
      <div className='min-h-screen p-4 md:p-8 mt-16 mb-5 bg-gradient-to-br from-purple-50 to-white'>
         <div className='max-w-7xl mx-auto'>
            <h1 className='text-3xl md:text-5xl font-bold text-purple-700 mb-8 text-center'>Welcome to KG Farm</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
               {user && user.role === "user" && (
                  <>
                     <div onClick={()=>navigate("/dailyentry")} className='group cursor-pointer bg-white hover:bg-purple-50 border-l-6 border-purple-700 rounded-xl h-24 md:h-28 shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-between p-5 transform hover:scale-105'>
                        <p className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-purple-700">Daily Entry</p>
                        <IoIosArrowDroprightCircle className="text-3xl md:text-4xl font-bold text-purple-700 group-hover:text-purple-900" />
                     </div>
                     <div onClick={()=>navigate("/feed")} className='group cursor-pointer bg-white hover:bg-purple-50 border-l-6 border-purple-700 rounded-xl h-24 md:h-28 shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-between p-5 transform hover:scale-105'>
                        <p className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-purple-700">New Feed</p>
                        <IoIosArrowDroprightCircle className="text-3xl md:text-4xl font-bold text-purple-700 group-hover:text-purple-900" />
                     </div>
                     <div onClick={()=>navigate("/medicine")} className='group cursor-pointer bg-white hover:bg-purple-50 border-l-6 border-purple-700 rounded-xl h-24 md:h-28 shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-between p-5 transform hover:scale-105'>
                        <p className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-purple-700">Medicine</p>
                        <IoIosArrowDroprightCircle className="text-3xl md:text-4xl font-bold text-purple-700 group-hover:text-purple-900" />
                     </div>
                  </>
               )}
               <div onClick={()=>navigate("/dashboard")} className='group cursor-pointer bg-white hover:bg-purple-50 border-l-6 border-purple-700 rounded-xl h-24 md:h-28 shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-between p-5 transform hover:scale-105'>
                  <p className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-purple-700">Dashboard</p>
                  <IoIosArrowDroprightCircle className="text-3xl md:text-4xl font-bold text-purple-700 group-hover:text-purple-900" />
               </div>
               <div onClick={()=>navigate("/history")} className='group cursor-pointer bg-white hover:bg-purple-50 border-l-6 border-purple-700 rounded-xl h-24 md:h-28 shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-between p-5 transform hover:scale-105'>
                  <p className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-purple-700">History</p>
                  <IoIosArrowDroprightCircle className="text-3xl md:text-4xl font-bold text-purple-700 group-hover:text-purple-900" />
               </div>
               {user && user.role=="admin" && <div onClick={()=>newBatch()} className='group cursor-pointer bg-white hover:bg-purple-50 border-l-6 border-purple-700 rounded-xl h-24 md:h-28 shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-between p-5 transform hover:scale-105'>
                  <p className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-purple-700">New Batch</p>
                  <IoIosArrowDroprightCircle className="text-3xl md:text-4xl font-bold text-purple-700 group-hover:text-purple-900" />
               </div>}
            </div>
         </div>
      </div>
   )
}

export default Home
