import React from 'react'

const BatchForm = () => {
    return (
        <div>
            <div className='max-h-screen p-5 mt-16 mb-5 flex justify-center items-center'>
                <div className='w-100 shadow-lg p-3 rounded-xl'>
                    <p className='text-center text-2xl font-bold text-amber-700'><span className='text-4xl text-amber-800'>B</span>atch Entry</p>
                    <form className='flex flex-col gap-3 '>

                        <label htmlFor="totalchick" className='font-bold'>Total chick</label>
                        <input type='number' id='totalchick' placeholder='Enter total chick' className='outline-2  outline-amber-600 rounded-lg p-2 ' />

                        <label htmlFor="currentchick" className='font-bold'>Current chick</label>
                        <input type='number' id='currentchick' placeholder='Enter medicine name' className='outline-2  outline-amber-600 rounded-lg p-2 ' />

                        <label htmlFor="date" className='font-bold'>Date</label>
                        <div className='flex flex-col gap-2 border-2 p-2 w-full border-amber-600 rounded-lg justify-between'>
                            <input type="date" id="date" className='outline-none' />
                        </div>

                        <label htmlFor="deliveredby" className='font-bold'>Delivered by</label>
                        <input type='text' id='deliveredby' placeholder='Enter name' className='outline-2  outline-amber-600 rounded-lg p-2 ' />

                        <label htmlFor="vehicleno" className='font-bold'>Vehicle no</label>
                        <input type='text' id='vehicleno' placeholder='Enter feedback' className='outline-2 outline-amber-600 rounded-lg p-2 ' />

                        <button className='bg-amber-600 p-2 cursor-pointer rounded-lg text-[15px] font-bold text-white'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BatchForm
