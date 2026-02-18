import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import { toast } from 'react-toastify';

const BatchForm = () => {
    const { user, users, getUsers } = useAuth();

    useEffect(() => {
        if (user?.role === "admin") {
            getUsers();
        }
    }, [user]);

    const [batchData, setBatchData] = useState({
        totalchick: "",
        currentchick: "",
        deliveredby: "",
        vehicleno: "",
        deliveredDate: "",
        userid: ""
    })

    const handelChange = (e) => {
        const { name, value } = e.target;
        setBatchData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/batch/newbatch", batchData);
            if (response.data.success) {
                toast.success(`New batch Created ${response.data.data.batchname}`);
                setBatchData({
                    totalchick: "",
                    currentchick: "",
                    deliveredby: "",
                    vehicleno: "",
                    deliveredDate: "",
                    userid: ""
                })
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='min-h-screen mt-16 mb-16 p-4 md:p-8 bg-gradient-to-br from-purple-50 to-white flex justify-center items-center'>
            <div className='w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-6 md:p-10'>
                <p className='text-3xl md:text-4xl font-bold text-purple-700 text-center mb-8'>Create New Batch</p>
                <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>

                    <div className='md:col-span-2'>
                        <label htmlFor="userid" className='block text-gray-700 font-bold mb-2'>Select User *</label>
                        <select id="userid" name='userid' required value={batchData.userid} onChange={handelChange} className='w-full border-2 border-purple-600 rounded-xl p-3 outline-none font-semibold'>
                            <option value="">Select user</option>
                            {users.map((data, index) => {
                                return <option value={data._id} key={index}> {data.username.charAt(0).toUpperCase() + data.username.slice(1)} - {data.email}</option>
                            })}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="totalchick" className='block text-gray-700 font-bold mb-2'>Total Chicks *</label>
                        <input type='number' id='totalchick' required name='totalchick' onChange={handelChange} value={batchData.totalchick} placeholder='Enter total chicks' className='w-full border-2 border-purple-600 rounded-xl p-3 outline-none' />
                    </div>

                    <div>
                        <label htmlFor="currentchick" className='block text-gray-700 font-bold mb-2'>Current Chicks *</label>
                        <input type='number' id='currentchick' required name='currentchick' onChange={handelChange} value={batchData.currentchick} placeholder='Enter current chicks' className='w-full border-2 border-purple-600 rounded-xl p-3 outline-none' />
                    </div>

                    <div>
                        <label htmlFor="deliveredDate" className='block text-gray-700 font-bold mb-2'>Delivered Date *</label>
                        <input type="date" id="deliveredDate" required name='deliveredDate' onChange={handelChange} value={batchData.deliveredDate} className='w-full border-2 border-purple-600 rounded-xl p-3 outline-none' />
                    </div>

                    <div>
                        <label htmlFor="deliveredby" className='block text-gray-700 font-bold mb-2'>Delivered By *</label>
                        <input type='text' id='deliveredby' required name='deliveredby' onChange={handelChange} value={batchData.deliveredby} placeholder='Enter name' className='w-full border-2 border-purple-600 rounded-xl p-3 outline-none' />
                    </div>

                    <div className='md:col-span-2'>
                        <label htmlFor="vehicleno" className='block text-gray-700 font-bold mb-2'>Vehicle Number *</label>
                        <input type='text' id='vehicleno' required name='vehicleno' onChange={handelChange} value={batchData.vehicleno} placeholder='Enter vehicle number' className='w-full border-2 border-purple-600 rounded-xl p-3 outline-none' />
                    </div>

                    <div className='md:col-span-2'>
                        <button type='submit' className='w-full bg-purple-600 hover:bg-purple-700 text-white p-3 md:p-4 rounded-xl text-lg font-bold transition-all transform hover:scale-105 shadow-lg'>Create Batch</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BatchForm