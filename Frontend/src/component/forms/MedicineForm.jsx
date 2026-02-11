import React from 'react'

const MedicineForm = () => {
    return (
        <div>

            <div className='max-h-screen p-5 mt-16 mb-5 flex justify-center items-center'>
                <div className='w-100 shadow-lg p-3 rounded-xl'>
                    <p className='text-center text-2xl font-bold text-amber-700'><span className='text-4xl text-amber-800'>M</span>edicine Entry</p>
                    <form className='flex flex-col gap-3 '>

                        <label htmlFor="medicinename" className='font-bold'>Medicine Type</label>
                        <select id="feedcategory" className='outline-2 outline-amber-600 rounded-lg p-3 0'>
                            <option value="">Select type</option>
                            <option value="Pre-starter">Medicine</option>
                            <option value="Starter">Vaccination</option>
                        </select>

                        <label htmlFor="date" className='font-bold'>Date</label>
                        <div className='flex flex-col gap-2 border-2 p-2 w-full border-amber-600 rounded-lg justify-between'>
                            <input type="date" id="date" className='outline-none' />
                        </div>

                        <label htmlFor="medicinename" className='font-bold'>Medicine name</label>
                        <input type='number' id='medicinename' placeholder='Enter medicine name' className='outline-2  outline-amber-600 rounded-lg p-2 ' />

                        <label htmlFor="quantity" className='font-bold'>Medicine quantity</label>
                        <div className='border-2 p-2 border-amber-600 rounded-lg flex justify-between'>
                            <input type='number' id="quantity" placeholder='Enter medicine quantity' className='outline-none w-full p-0' />
                            <select id="unit" className='outline-none'>
                                <option value="">Select unit</option>
                                <option value="ml">ml</option>
                                <option value="l">l</option>
                                <option value="g">g</option>
                                <option value="kg">kg</option>
                                <option value="tablet">tablet</option>
                                <option value="dose">dose</option>
                            </select>
                        </div>

                        <button className='bg-amber-600 p-2 cursor-pointer rounded-lg text-[15px] font-bold text-white'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MedicineForm
