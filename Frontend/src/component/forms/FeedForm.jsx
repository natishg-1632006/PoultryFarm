import React, { useState } from 'react'
import api from "../utils/api"
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify';

const FeedForm = () => {

    const { batch } = useAuth();
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
            const token = localStorage.getItem("token");
            if (token) {
                const res = await api.post("feed/addfeed", {
                    ...feed,
                    userid: batch._id,
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
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (

        <div className='max-h-screen p-5 mt-16 mb-5 flex justify-center items-center'>
            <div onSubmit={handleSubmit} className='w-100 shadow-lg p-3 rounded-xl'>
                <p className='text-center text-2xl font-bold text-amber-700'><span className='text-4xl text-amber-800'>F</span>eed Entry</p>

                <form className='flex flex-col gap-3 '>

                    <label htmlFor="feedpack" className='font-bold'>Feed</label>
                    <input type='number' id='feedpack' required name='feedpack' value={feed.feedpack} onChange={handelChange} placeholder='Enter feed' className='outline-2  outline-amber-600 rounded-lg p-2 ' />

                    <label htmlFor="feedcategory" className='font-bold'>Feed category</label>
                    <select id="feedcategory" required name='feedcategory' value={feed.feedcategory} onChange={handelChange} className='outline-2 outline-amber-600 rounded-lg p-3 0'>
                        <option value="">Select category</option>
                        <option value="New feed">New Feed</option>
                        <option value="Return feed">Return Feed</option>
                    </select>

                    <label htmlFor="feedType" className='font-bold'>Feed type</label>
                    <select id="feedType" required name='feedtype' value={feed.feedtype} onChange={handelChange} className='outline-2 outline-amber-600 rounded-lg p-3 0'>
                        <option value="">Select Type</option>
                        <option value="Pre-starter">Pre-starter</option>
                        <option value="Starter">Starter</option>
                        <option value="Finisher">Finisher</option>
                    </select>

                    <label htmlFor="deliveredDate" className='font-bold'>Date</label>
                    <div className='flex flex-col gap-2 border-2 p-2 w-full border-amber-600 rounded-lg justify-between'>
                        <input type="date" required id="deliveredDate" name='deliveredDate' value={feed.deliveredDate} onChange={handelChange} className='outline-none' />
                    </div>

                    <label htmlFor="deliveredby" className='font-bold'>Delivered by</label>
                    <input type='text' required id='deliveredby' name='deliveredby' value={feed.deliveredby} onChange={handelChange} placeholder='Enter name' className='outline-2  outline-amber-600 rounded-lg p-2 ' />

                    <label htmlFor="vehicleno" className='font-bold'>Vehicle no</label>
                    <input type='text' required id='vehicleno' name='vehicleno' value={feed.vehicleno} onChange={handelChange} placeholder='Enter feedback' className='outline-2 outline-amber-600 rounded-lg p-2 ' />

                    <button type='submit' className='bg-amber-600 p-2 cursor-pointer rounded-lg text-[15px] font-bold text-white'>Submit</button>
                </form>

            </div>
        </div>
    )
}

export default FeedForm;
