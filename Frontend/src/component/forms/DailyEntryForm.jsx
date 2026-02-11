import React from 'react'

const DailyEntryForm = () => {
    return (
        <div className='max-h-screen p-5 mt-16 mb-5 flex justify-center items-center'>
            <div className='w-100 shadow-lg p-3 rounded-xl'>
                <p className='text-center text-2xl font-bold text-amber-700'><span className='text-4xl text-amber-800'>D</span>aily Entry</p>
                <form className='flex flex-col gap-3 '>
                    <label htmlFor="mortality" className='font-bold'>Mortality</label>
                    <input type='number' id='mortality' placeholder='Enter mortality' className='outline-2  outline-amber-600 rounded-lg p-2 ' />

                    <label htmlFor="feed" className='font-bold'>Feed</label>
                    <input type='number' id='feed' placeholder='Enter feed' className='outline-2 outline-amber-600 rounded-lg p-2 ' />
    
                    <label htmlFor="feedType" className='font-bold'>Feed type</label>
                    <select id="feedType" className='outline-2 outline-amber-600 rounded-lg p-3 0'>
                        <option value="">Select Type</option>
                        <option value="Pre-starter">Pre-starter</option>
                        <option value="Starter">Starter</option>
                        <option value="Finisher">Finisher</option>
                    </select>

                    <label htmlFor="avg" className='font-bold'>Avg weight</label>
                    <div className='border-2 p-2 border-amber-600 rounded-lg flex justify-between'>
                    <input type='number' id="avg" placeholder='Enter avg weight' className='outline-none w-full p-0'/>
                    <select id="unit" className='outline-none'>
                        <option value="">Select unit</option>
                        <option value="g">g</option>
                        <option value="kg">kg</option>
                    </select>
                    </div>

                    <label htmlFor="date" className='font-bold'>Date</label>
                    <div className='flex flex-col gap-2 border-2 p-2 w-full border-amber-600 rounded-lg justify-between'>
                    <input type="date" id="date" className='outline-none'/>
                    </div>

                    <label htmlFor="feedback" className='font-bold'>Feedback</label>
                    <textarea type='number' id='feedback' placeholder='Enter feedback' className='outline-2 outline-amber-600 rounded-lg p-2 ' />

                    <button className='bg-amber-600 p-2 cursor-pointer rounded-lg text-[15px] font-bold text-white'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default DailyEntryForm
