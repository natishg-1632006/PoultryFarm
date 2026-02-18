import React, { useState } from 'react'
import api from "../utils/api"
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MedicineForm = () => {
    const { batch } = useAuth();
    console.log(batch);
    
    const navigate=useNavigate();
    const [medicine, setMedicine] = useState({
        medicinetype: "",
        medicinename: "",
        quantity: "",
        unit: "",
        deliveredDate: ""
    })

    const handelChange = (e) => {
        const { name, value } = e.target;
        setMedicine({
            ...medicine,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const res = await api.post("medicine/addmedicine", {
                    ...medicine,
                    batchid: batch._id,
                    userid: batch.userid
                });

                if (res.data.success) {
                    setMedicine({
                        medicinetype: "",
                        medicinename: "",
                        quantity: "",
                        unit: "",
                        deliveredDate: ""
                    })
                    toast.success("Medicine data added")
                    navigate("/")
                }
                else {
                    toast.error("Medicine data not added")
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='min-h-screen p-4 md:p-8 mt-16 mb-5 flex justify-center items-center bg-gradient-to-br from-purple-50 to-white'>
            <div className='w-full max-w-2xl bg-white shadow-2xl p-6 md:p-10 rounded-3xl border-t-8 border-purple-600'>
                <div className='text-center mb-8'>
                    <p className='text-3xl md:text-4xl font-bold text-purple-700'>Medicine Entry</p>
                    <p className='text-sm text-gray-500 mt-2'>Record medicine or vaccination</p>
                </div>
                <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                        <label htmlFor="medicinetype" className='font-bold text-gray-700 mb-2 block'>Medicine Type</label>
                        <select id="medicinetype" required name='medicinetype' value={medicine.medicinetype} onChange={handelChange} className='w-full border-2 border-gray-300 focus:border-purple-600 rounded-xl p-3 transition-all outline-none'>
                            <option value="">Select type</option>
                            <option value="medicine">Medicine</option>
                            <option value="vaccination">Vaccination</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="deliveredDate" className='font-bold text-gray-700 mb-2 block'>Date</label>
                        <input type="date" required id="deliveredDate" name='deliveredDate' value={medicine.deliveredDate} onChange={handelChange} className='w-full border-2 border-gray-300 focus:border-purple-600 rounded-xl p-3 transition-all outline-none' />
                    </div>

                    <div className='md:col-span-2'>
                        <label htmlFor="medicinename" className='font-bold text-gray-700 mb-2 block'>Medicine Name</label>
                        <input type='text' required id='medicinename' name='medicinename' value={medicine.medicinename} onChange={handelChange} placeholder='Enter medicine name' className='w-full border-2 border-gray-300 focus:border-purple-600 rounded-xl p-3 transition-all outline-none' />
                    </div>

                    <div className='md:col-span-2'>
                        <label htmlFor="quantity" className='font-bold text-gray-700 mb-2 block'>Medicine Quantity</label>
                        <div className='flex gap-2'>
                            <input type='number' required id="quantity" name='quantity' value={medicine.quantity} onChange={handelChange} placeholder='Enter quantity' className='flex-1 border-2 border-gray-300 focus:border-purple-600 rounded-xl p-3 transition-all outline-none' />
                            <select id="unit" required name='unit' value={medicine.unit} onChange={handelChange} className='border-2 border-gray-300 focus:border-purple-600 rounded-xl p-3 transition-all outline-none'>
                                <option value="">Select unit</option>
                                <option value="ml">ml</option>
                                <option value="l">l</option>
                                <option value="g">g</option>
                                <option value="kg">kg</option>
                                <option value="tablet">tablet</option>
                                <option value="dose">dose</option>
                            </select>
                        </div>
                    </div>

                    <div className='md:col-span-2'>
                        <button type='submit' className='w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-3 rounded-xl text-lg font-bold transition-all transform hover:scale-105 shadow-lg'>Submit Medicine Entry</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MedicineForm
