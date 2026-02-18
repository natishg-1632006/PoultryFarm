import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import { toast } from 'react-toastify'

const MedicineEntryList = ({ medicines, batchStatus, onUpdate }) => {
    const { user } = useAuth()
    const [editingId, setEditingId] = useState(null)
    const [editData, setEditData] = useState({})

    const handleEdit = (medicine) => {
        setEditingId(medicine._id)
        setEditData(medicine)
    }

    const handleUpdate = async (id) => {
        try {
            const res = await api.put(`medicine/${id}`, editData)
            if (res.data.success) {
                toast.success('Medicine entry updated successfully')
                setEditingId(null)
                onUpdate()
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update medicine entry')
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this medicine entry?')) {
            try {
                const res = await api.delete(`medicine/${id}`)
                if (res.data.success) {
                    toast.success('Medicine entry deleted successfully')
                    onUpdate()
                }
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to delete medicine entry')
            }
        }
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-4'>
            {medicines.length === 0 ? (
                <p className='col-span-full text-center text-gray-500 text-lg py-10'>No medicine entries found</p>
            ) : (
                medicines.map((medicine) => (
                    <div key={medicine._id} className='bg-gradient-to-br from-purple-50 to-white shadow-xl border-l-6 border-purple-600 rounded-2xl p-5 transform hover:scale-105 transition-all'>
                        <div className='flex justify-between items-center mb-4 pb-3 border-b-2 border-purple-200'>
                            <span className='text-sm font-semibold text-gray-600'>{new Date(medicine.deliveredDate).toLocaleDateString()}</span>
                            <span className='bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold capitalize'>{medicine.medicinetype}</span>
                        </div>
                        
                        {editingId === medicine._id ? (
                            <div className='space-y-3'>
                                <input type='text' value={editData.medicinename} onChange={(e) => setEditData({...editData, medicinename: e.target.value})} className='w-full border rounded p-2' placeholder='Medicine Name' />
                                <select value={editData.medicinetype} onChange={(e) => setEditData({...editData, medicinetype: e.target.value})} className='w-full border rounded p-2'>
                                    <option value='vaccine'>Vaccine</option>
                                    <option value='antibiotic'>Antibiotic</option>
                                    <option value='vitamin'>Vitamin</option>
                                    <option value='other'>Other</option>
                                </select>
                                <input type='number' value={editData.quantity} onChange={(e) => setEditData({...editData, quantity: e.target.value})} className='w-full border rounded p-2' placeholder='Quantity' />
                                <select value={editData.unit} onChange={(e) => setEditData({...editData, unit: e.target.value})} className='w-full border rounded p-2'>
                                    <option value='ml'>ml</option>
                                    <option value='gm'>gm</option>
                                    <option value='ltr'>ltr</option>
                                    <option value='kg'>kg</option>
                                </select>
                                <div className='flex gap-2'>
                                    <button onClick={() => handleUpdate(medicine._id)} className='flex-1 bg-purple-600 text-white py-2 rounded font-bold'>Save</button>
                                    <button onClick={() => setEditingId(null)} className='flex-1 bg-gray-500 text-white py-2 rounded font-bold'>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className='bg-white rounded-xl p-4 mb-3 shadow-sm'>
                                    <span className='text-xs text-gray-600 block mb-2'>Medicine Name</span>
                                    <span className='text-lg font-bold text-purple-700'>{medicine.medicinename}</span>
                                </div>
                                <div className='bg-purple-100 rounded-xl p-4'>
                                    <span className='text-xs text-gray-600 block mb-2'>Quantity</span>
                                    <span className='text-xl font-bold text-purple-800'>{medicine.quantity} {medicine.unit}</span>
                                </div>
                                {user?.role === 'admin' && batchStatus === 'Active' && (
                                    <div className='flex gap-2 mt-3'>
                                        <button onClick={() => handleEdit(medicine)} className='flex-1 bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700'>Edit</button>
                                        <button onClick={() => handleDelete(medicine._id)} className='flex-1 bg-red-600 text-white py-2 rounded font-bold hover:bg-red-700'>Delete</button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))
            )}
        </div>
    )
}

export default MedicineEntryList