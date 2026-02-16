import React from 'react'

const DashBoard = () => {
    return (
        <div className='mt-16 p-5 flex justify-center flex-wrap gap-y-8'>
            <div className='w-100 shadow-xl rounded-2xl p-5 flex flex-wrap gap-5'>
                <div className='w-40 bg-orange-200 border-l-6 shadow-lg border-orange-700 rounded-2xl p-2 text-center' >
                    <p className='text-xl font-bold'>Total Chick</p>
                    <span className='text-xl font-bold'>4500</span>
                </div>
                <div className='w-40  bg-orange-200 border-l-6 shadow-lg border-orange-700 rounded-2xl p-2 text-center' >
                    <p className='text-xl font-bold'>Current  Chick</p>
                    <span className='text-xl font-bold'>4500</span>
                </div>
                <div className='w-40 bg-orange-200 border-l-6 shadow-lg border-orange-700 rounded-2xl p-2 text-center' >
                    <p className='text-xl font-bold'>Mortality</p>
                    <span className='text-xl font-bold'>45</span>
                </div>
                <div className='w-40 bg-orange-200 border-l-6 shadow-lg border-orange-700 rounded-2xl p-2 text-center' >
                    <p className='text-xl font-bold'>Avg weight</p>
                    <span className='text-xl font-bold'>1.5 kg</span>
                </div>
            </div>

            <div className='w-100 shadow-xl rounded-2xl p-5 gap-5 text-center'>
                <p className='text-2xl font-bold'>Feed</p>
                <div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default DashBoard
