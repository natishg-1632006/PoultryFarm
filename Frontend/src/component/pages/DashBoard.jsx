import React, { useState } from 'react'
import DailyEntryList from './DailyEntryList';
import FeedEntryList from './FeedEntryList';
import MedicineEntryList from './MedicineEntryList';

const DashBoard = () => {
    const [activeTab,setActiveTab]=useState("daily");
    return (
        <div className='mt-16 mb-16'>
               <p className='text-[40px] font-bold text-purple-700 text-center'>Dashboard</p>
        <div className='p-5 gap-x-5 flex justify-center flex-wrap gap-y-8'>
         
            <div className='w-100 md:w-full shadow-xl rounded-2xl p-5 flex flex-wrap justify-center gap-5'>
                <div className='w-40 md:w-80 md:h-30 border-l-6 shadow-lg border-purple-700 shadow-purple-600 rounded-2xl p-2  flex flex-col justify-center items-center' >
                    <p className='text-xl md:text-[40px] font-bold'>Total Chick</p>
                    <span className='text-xl md:text-[20px] font-bold'>4500</span>
                </div>
                <div className='w-40 md:w-80 md:h-30 border-l-6 shadow-lg border-purple-700 shadow-purple-600 rounded-2xl p-2  flex flex-col justify-center items-center' >
                    <p className='text-xl md:text-[40px] font-bold'>Current  Chick</p>
                    <span className='text-xl md:text-[20px] font-bold'>4500</span>
                </div>
                <div className='w-40 md:w-80 md:h-30 border-l-6 shadow-lg border-purple-700 shadow-purple-600 rounded-2xl p-2  flex flex-col justify-center items-center' >
                    <p className='text-xl md:text-[40px] font-bold'>Mortality</p>
                    <span className='text-xl md:text-[20px] font-bold'>45</span>
                </div>
                <div className='w-40 md:w-80 md:h-30 border-l-6 shadow-lg border-purple-700 shadow-purple-600 rounded-2xl p-2  flex flex-col justify-center items-center' >
                    <p className='text-xl md:text-[40px] font-bold'>Avg weight</p>
                    <span className='text-xl md:text-[20px] font-bold'>1.5 kg</span>
                </div>
            </div>

            <div className='w-100 md:w-full shadow-xl rounded-2xl p-5 gap-5 text-center'>
                <p className='text-2xl font-bold mb-5'>Feed</p>
                <div className='flex flex-col md:flex-row md:gap-x-5 md:justify-center md:flex-wrap  gap-y-5'>
                    <div className='flex justify-center gap-x-4'>
                        <div className='w-40 border-l-6 shadow-lg border-blue-700 shadow-blue-600 rounded-2xl p-2 text-center' >
                            <p className='text-md font-bold'>Pre-Starter</p>
                            <span className='text-md font-bold'>0</span>
                        </div>
                        <div className='w-40 border-l-6 shadow-lg border-orange-700 shadow-orange-600 rounded-2xl p-2 text-center' >
                            <p className='text-md font-bold'>Starter</p>
                            <span className='text-md font-bold'>0</span>
                        </div>
                        <div className='w-40 border-l-6 shadow-lg border-green-700 shadow-green-600 rounded-2xl p-2 text-center' >
                            <p className='text-md font-bold'>Finisher</p>
                            <span className='text-md font-bold'>0</span>
                        </div>

                    </div>
                    <div className='flex justify-center gap-x-4'>
                        <div className='w-40  border-l-6 shadow-lg border-purple-700 shadow-purple-600 rounded-2xl p-2 text-center' >
                            <p className='text-md font-bold'>Total</p>
                            <span className='text-md font-bold'>0</span>
                        </div>
                        <div className='w-40 border-l-6 shadow-lg border-purple-700 shadow-purple-600 rounded-2xl p-2 text-center' >
                            <p className='text-md font-bold'>Consumed</p>
                            <span className='text-md font-bold'>0</span>
                        </div>
                        <div className='w-40 border-l-6 shadow-lg border-purple-700 shadow-purple-600 rounded-2xl p-2 text-center' >
                            <p className='text-md font-bold'>Available</p>
                            <span className='text-md font-bold'>0</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
            <div >
                <div className='flex justify-around'>
                    <div onClick={()=>setActiveTab("daily")} className={` font-bold text-lg  cursor-pointer ${activeTab=="daily"?"border-b-6 border-purple-700":"text-gray-400"}`}>Daily entry</div>
                    <div  onClick={()=>setActiveTab("feed")} className={`font-bold text-lg  cursor-pointer ${activeTab=="feed"?"border-b-6 border-purple-700":"text-gray-400"}`}>Feed</div>
                    <div  onClick={()=>setActiveTab("medicine")} className={`font-bold text-lg  cursor-pointer ${activeTab=="medicine"?"border-b-6 border-purple-700":"text-gray-400"}`}>Medicine</div>
                </div>
            </div>
            {
              activeTab==="daily" && <DailyEntryList/>
            }
            {
              activeTab==="feed" && <FeedEntryList/>
            }
            {
              activeTab==="medicine" && <MedicineEntryList/>
            }
        </div>
    )
}

export default DashBoard
