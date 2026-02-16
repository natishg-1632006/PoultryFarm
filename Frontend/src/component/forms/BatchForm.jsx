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

    const validUsers = users.filter((data) => {
        return data.role === "user"
    })

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
        <div>
            <div className='max-h-screen p-5 mt-16 mb-5 flex justify-center items-center'>
                <div className='w-100 shadow-lg p-3 rounded-xl'>
                    <p className='text-center text-2xl font-bold text-amber-700'><span className='text-4xl text-amber-800'>B</span>atch Entry</p>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-3 '>

                        <label htmlFor="totalchick" className='font-bold'>Total chick</label>
                        <input type='number' id='totalchick' required name='totalchick' onChange={handelChange} value={batchData.totalchick} placeholder='Enter total chick' className='outline-2  outline-amber-600 rounded-lg p-2 ' />

                        <label htmlFor="userid" className='font-bold'>Total chick</label>
                        <select id="userid" name='userid' required value={batchData.userid} onChange={handelChange} className='outline-2 outline-amber-600 rounded-lg p-3 0'>
                            <option value="">Select user</option>
                            {validUsers.map((data, index) => {
                                return <option value={data._id} key={index}> {data.username.charAt(0).toUpperCase() + data.username.slice(1)} - {data.email}</option>
                            })}
                        </select>


                        <label htmlFor="currentchick" className='font-bold'>Current chick</label>
                        <input type='number' id='currentchick' required name='currentchick' onChange={handelChange} value={batchData.currentchick} placeholder='Enter medicine name' className='outline-2  outline-amber-600 rounded-lg p-2 ' />

                        <label htmlFor="deliveredDate" className='font-bold'>Date</label>
                        <div className='flex flex-col gap-2 border-2 p-2 w-full border-amber-600 rounded-lg justify-between'>
                            <input type="date" id="deliveredDate" required name='deliveredDate' onChange={handelChange} value={batchData.deliveredDate} className='outline-none' />
                        </div>

                        <label htmlFor="deliveredby" className='font-bold'>Delivered by</label>
                        <input type='text' id='deliveredby' required name='deliveredby' onChange={handelChange} value={batchData.deliveredby} placeholder='Enter name' className='outline-2  outline-amber-600 rounded-lg p-2 ' />

                        <label htmlFor="vehicleno" className='font-bold'>Vehicle no</label>
                        <input type='text' id='vehicleno' required name='vehicleno' onChange={handelChange} value={batchData.vehicleno} placeholder='Enter feedback' className='outline-2 outline-amber-600 rounded-lg p-2 ' />

                        <button type='submit' className='bg-amber-600 p-2 cursor-pointer rounded-lg text-[15px] font-bold text-white'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BatchForm
