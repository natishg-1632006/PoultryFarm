import React, { useState } from 'react'
import BatchForm from './BatchForm'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import { toast } from 'react-toastify'

const DailyEntryForm = () => {

    const { batch } = useAuth();
    const [dailyEntry, setDailyEntry] = useState({
        mortality: "",
        feedcount: "",
        feedtype: "",
        unit: "",
        feedback: "",
        avgweight: "",
        createdAt: ""
    })


    const handelChange = (e) => {
        const { name, value } = e.target;
        setDailyEntry({
            ...dailyEntry,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("dailyentry/newentry", {
                ...dailyEntry,
                userid: batch.userid,
                batchid: batch._id
            });

            if (res.data.success) {
                toast.success("Today entry added successfully")
                setDailyEntry({
                    mortality: "",
                    feedcount: "",
                    feedtype: "",
                    unit: "",
                    feedback: "",
                    avgweight: "",
                    createdAt: ""
                });
            }
            else {
                toast.error("Promblem store data")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='max-h-screen p-5 mt-16 mb-5 flex justify-center items-center'>
            <div className='w-100 shadow-lg p-3 rounded-xl' >
                <p className='text-center text-2xl font-bold text-amber-700'><span className='text-4xl text-amber-800'>D</span>aily Entry</p>
                <form className='flex flex-col gap-3 ' onSubmit={handleSubmit}>

                    <label htmlFor="mortality" className='font-bold'>Mortality</label>
                    <input type='number' id='mortality' name='mortality' value={dailyEntry.mortality} onChange={handelChange} placeholder='Enter mortality' className='outline-2  outline-amber-600 rounded-lg p-2 ' />

                    <label htmlFor="feedcount" className='font-bold'>Feed</label>
                    <input type='number' required id='feedcount' name='feedcount' value={dailyEntry.feedcount} onChange={handelChange} placeholder='Enter feed' className='outline-2 outline-amber-600 rounded-lg p-2 ' />

                    <label htmlFor="feedType" className='font-bold'>Feed type</label>
                    <select id="feedType" required name='feedtype' value={dailyEntry.feedtype} onChange={handelChange} className='outline-2 outline-amber-600 rounded-lg p-3 0'>
                        <option value="">Select Type</option>
                        <option value="Pre-starter">Pre-starter</option>
                        <option value="Starter">Starter</option>
                        <option value="Finisher">Finisher</option>
                    </select>

                    <label htmlFor="avgweight" className='font-bold'>Avg weight</label>
                    <div className='border-2 p-2 border-amber-600 rounded-lg flex justify-between'>
                        <input type='number' required id="avgweight" name='avgweight' value={dailyEntry.avgweight} onChange={handelChange} placeholder='Enter avg weight' className='outline-none w-full p-0' />
                        <select id="unit" name='unit' value={dailyEntry.unit} onChange={handelChange} className='outline-none'>
                            <option value="">Select unit</option>
                            <option value="g">g</option>
                            <option value="kg">kg</option>
                        </select>
                    </div>

                    <label htmlFor="createdAt" className='font-bold'>Date</label>
                    <div className='flex flex-col gap-2 border-2 p-2 w-full border-amber-600 rounded-lg justify-between'>
                        <input type="date" required id="createdAt" name='createdAt' value={dailyEntry.createdAt} onChange={handelChange} className='outline-none' />
                    </div>

                    <label htmlFor="feedback" className='font-bold'>Feedback</label>
                    <textarea type='number' required id='feedback' name='feedback' value={dailyEntry.feedback} onChange={handelChange} placeholder='Enter feedback' className='outline-2 outline-amber-600 rounded-lg p-2 ' />

                    <button type='submit' className='bg-amber-600 p-2 cursor-pointer rounded-lg text-[15px] font-bold text-white'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default DailyEntryForm
