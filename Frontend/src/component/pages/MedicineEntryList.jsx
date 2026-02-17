import React from 'react'

const MedicineEntryList = () => {
    return (
        <div className='mx-10 m-10 flex flex-wrap'>
            <div className='shadow-lg border-l-4 shadow-green-600 border-green-800  flex flex-col gap-5 rounded-2xl w-100 p-3'>
                <div className='flex justify-between'>
                    <span>Date:06/02/2026</span>
                    <span>Day-1</span>
                </div>
                <div className='flex justify-around'>
                    <div className='flex flex-col items-center'>
                        <span>Medicine Type</span>
                        <span>Medicine</span>
                    </div>
                    <div className='flex flex-col items-center'>
                        <span>Medicine name</span>
                        <span>Water Cleaner</span>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <span>Medicine quantity:5 l</span>
                    <div className='flex gap-5'>
                        <button className='bg-green-700 cursor-pointer text-white px-5 rounded-lg font-bold'>Edit</button>
                        <button className='bg-red-700 cursor-pointer text-white px-5 rounded-lg font-bold'>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MedicineEntryList
