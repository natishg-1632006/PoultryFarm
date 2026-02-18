import React, { useState } from 'react'
import api from "../utils/api"
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const FeedForm = () => {

    const { batch } = useAuth();
    const navigate = useNavigate();
    const [feed, setFeed] = useState({
        feedpack: "",
        feedcategory: "",
        feedtype: "",
        deliveredDate: "",
        deliveredby: "",
        vehicleno: ""
    })

    const handelChange = (e) => {
        const { name, value } = e.target;
        setFeed({
            ...feed,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("feed/addfeed", {
                ...feed,
                userid: batch.userid,
                batchid: batch._id
            })
            if (res.data.success) {
                setFeed({
                    feedpack: "",
                    feedcategory: "",
                    feedtype: "",
                    deliveredDate: "",
                    deliveredby: "",
                    vehicleno: ""
                })
                toast.success("Feed added")
                navigate('/');
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (

        <div className='min-h-screen p-4 md:p-8 mt-16 mb-5 flex justify-center items-center bg-gradient-to-br from-purple-50 to-white'>
            <div className='w-full max-w-2xl bg-white shadow-2xl p-6 md:p-10 rounded-3xl border-t-8 border-purple-600'>
                <div className='text-center mb-8'>
                    <p className='text-3xl md:text-4xl font-bold text-purple-700'>Feed Entry</p>
                    <p className='text-sm text-gray-500 mt-2'>Add new feed delivery</p>
                </div>

                <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                        <label htmlFor="feedpack" className='font-bold text-gray-700 mb-2 block'>Feed Quantity</label>
                        <input type='number' id='feedpack' required name='feedpack' value={feed.feedpack} onChange={handelChange} placeholder='Enter feed quantity' className='w-full border-2 border-gray-300 focus:border-purple-600 rounded-xl p-3 transition-all outline-none' />
                    </div>

                    <div>
                        <label htmlFor="feedcategory" className='font-bold text-gray-700 mb-2 block'>Feed Category</label>
                        <select id="feedcategory" required name='feedcategory' value={feed.feedcategory} onChange={handelChange} className='w-full border-2 border-gray-300 focus:border-purple-600 rounded-xl p-3 transition-all outline-none'>
                            <option value="">Select category</option>
                            <option value="New feed">New Feed</option>
                            <option value="Return feed">Return Feed</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="feedType" className='font-bold text-gray-700 mb-2 block'>Feed Type</label>
                        <select id="feedType" required name='feedtype' value={feed.feedtype} onChange={handelChange} className='w-full border-2 border-gray-300 focus:border-purple-600 rounded-xl p-3 transition-all outline-none'>
                            <option value="">Select Type</option>
                            <option value="Pre-starter">Pre-starter</option>
                            <option value="Starter">Starter</option>
                            <option value="Finisher">Finisher</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="deliveredDate" className='font-bold text-gray-700 mb-2 block'>Delivery Date</label>
                        <input type="date" required id="deliveredDate" name='deliveredDate' value={feed.deliveredDate} onChange={handelChange} className='w-full border-2 border-gray-300 focus:border-purple-600 rounded-xl p-3 transition-all outline-none' />
                    </div>

                    <div>
                        <label htmlFor="deliveredby" className='font-bold text-gray-700 mb-2 block'>Delivered By</label>
                        <input type='text' required id='deliveredby' name='deliveredby' value={feed.deliveredby} onChange={handelChange} placeholder='Enter name' className='w-full border-2 border-gray-300 focus:border-purple-600 rounded-xl p-3 transition-all outline-none' />
                    </div>

                    <div>
                        <label htmlFor="vehicleno" className='font-bold text-gray-700 mb-2 block'>Vehicle Number</label>
                        <input type='text' required id='vehicleno' name='vehicleno' value={feed.vehicleno} onChange={handelChange} placeholder='Enter vehicle number' className='w-full border-2 border-gray-300 focus:border-purple-600 rounded-xl p-3 transition-all outline-none' />
                    </div>

                    <div className='md:col-span-2'>
                        <button type='submit' className='w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-3 rounded-xl text-lg font-bold transition-all transform hover:scale-105 shadow-lg'>Submit Feed Entry</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default FeedForm;
