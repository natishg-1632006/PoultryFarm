import React, { useState } from 'react'
import BatchForm from './BatchForm'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const DailyEntryForm = () => {

    const { batch, setBatch } = useAuth();
    const navigate = useNavigate();
    
    const [dailyEntry, setDailyEntry] = useState({
        mortality: 0,
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
                toast.success("Today entry added successfully");
                const batchRes = await api.get(`batch/${batch.userid}`);
                if (batchRes.data.success) {
                    setBatch(batchRes.data.batch);
                }
                setDailyEntry({
                    mortality: 0,
                    feedcount: "",
                    feedtype: "",
                    unit: "",
                    feedback: "",
                    avgweight: "",
                    createdAt: ""
                });
                navigate('/');
            }
            else {
                toast.error("Problem store data")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='min-h-screen p-4 md:p-8 mt-16 mb-5 flex justify-center items-center bg-gradient-to-br from-purple-50 to-white'>
            <div className='w-full max-w-2xl bg-white shadow-2xl p-6 md:p-10 rounded-3xl border-t-8 border-purple-600'>
                <div className='text-center mb-8'>
                    <p className='text-3xl md:text-4xl font-bold text-purple-700'>Daily Entry</p>
                    <p className='text-sm text-gray-500 mt-2'>Record today's farm activities</p>
                </div>
                <form className='grid grid-cols-1 md:grid-cols-2 gap-6' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="mortality" className='font-bold text-gray-700 mb-2 block'>Mortality</label>
                        <input type='number' id='mortality' name='mortality' value={dailyEntry.mortality} onChange={handelChange} placeholder='Enter mortality count' className='w-full border-2 border-gray-300 focus:border-purple-600 rounded-xl p-3 transition-all outline-none' />
                    </div>

                    <div>
                        <label htmlFor="feedcount" className='font-bold text-gray-700 mb-2 block'>Feed Count</label>
                        <input type='number' required id='feedcount' name='feedcount' value={dailyEntry.feedcount} onChange={handelChange} placeholder='Enter feed amount' className='w-full border-2 border-gray-300 focus:border-purple-600 rounded-xl p-3 transition-all outline-none' />
                    </div>

                    <div>
                        <label htmlFor="feedType" className='font-bold text-gray-700 mb-2 block'>Feed Type</label>
                        <select id="feedType" required name='feedtype' value={dailyEntry.feedtype} onChange={handelChange} className='w-full border-2 border-gray-300 focus:border-purple-600 rounded-xl p-3 transition-all outline-none'>
                            <option value="">Select Type</option>
                            <option value="Pre-starter">Pre-starter</option>
                            <option value="Starter">Starter</option>
                            <option value="Finisher">Finisher</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="avgweight" className='font-bold text-gray-700 mb-2 block'>Average Weight</label>
                        <div className='flex gap-2'>
                            <input type='number' required id="avgweight" name='avgweight' value={dailyEntry.avgweight} onChange={handelChange} placeholder='Weight' className='flex-1 border-2 border-gray-300 focus:border-purple-600 rounded-xl p-3 transition-all outline-none' />
                            <select id="unit" name='unit' value={dailyEntry.unit} onChange={handelChange} className='border-2 border-gray-300 focus:border-purple-600 rounded-xl p-3 transition-all outline-none'>
                                <option value="">Unit</option>
                                <option value="g">g</option>
                                <option value="kg">kg</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="createdAt" className='font-bold text-gray-700 mb-2 block'>Date</label>
                        <input type="date" required id="createdAt" name='createdAt' value={dailyEntry.createdAt} onChange={handelChange} className='w-full border-2 border-gray-300 focus:border-purple-600 rounded-xl p-3 transition-all outline-none' />
                    </div>

                    <div className='md:col-span-2'>
                        <label htmlFor="feedback" className='font-bold text-gray-700 mb-2 block'>Feedback</label>
                        <textarea required id='feedback' name='feedback' value={dailyEntry.feedback} onChange={handelChange} placeholder='Enter your observations' className='w-full border-2 border-gray-300 focus:border-purple-600 rounded-xl p-3 transition-all outline-none h-24 resize-none' />
                    </div>

                    <div className='md:col-span-2'>
                        <button type='submit' className='w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-3 rounded-xl text-lg font-bold transition-all transform hover:scale-105 shadow-lg'>Submit Entry</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DailyEntryForm
