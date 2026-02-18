import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import { toast } from 'react-toastify'

const DailyEntryList = ({ entries, batchStatus, onUpdate }) => {
  const { user } = useAuth()
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({})

  const handleEdit = (entry) => {
    setEditingId(entry._id)
    setEditData(entry)
  }

  const handleUpdate = async (id) => {
    try {
      const res = await api.put(`dailyentry/${id}`, editData)
      if (res.data.success) {
        toast.success('Entry updated successfully')
        setEditingId(null)
        onUpdate()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update entry')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        const res = await api.delete(`dailyentry/${id}`)
        if (res.data.success) {
          toast.success('Entry deleted successfully')
          onUpdate()
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete entry')
      }
    }
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-4'>
      {entries.length === 0 ? (
        <p className='col-span-full text-center text-gray-500 text-lg py-10'>No daily entries found</p>
      ) : (
        entries.map((entry, index) => (
          <div key={entry._id} className='bg-gradient-to-br from-green-50 to-white shadow-xl border-l-6 border-green-600 rounded-2xl p-5 transform hover:scale-105 transition-all'>
            <div className='flex justify-between items-center mb-4 pb-3 border-b-2 border-green-200'>
              <span className='text-sm font-semibold text-gray-600'>{new Date(entry.createdAt).toLocaleDateString()}</span>
              <span className='bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold'>Day {index + 1}</span>
            </div>
            
            {editingId === entry._id ? (
              <div className='bg-white rounded-2xl p-4 border-2 border-blue-400 shadow-lg'>
                <h4 className='text-lg font-bold text-blue-700 mb-4 text-center'>Edit Entry</h4>
                <div className='space-y-3'>
                  <div>
                    <label className='text-xs font-bold text-gray-600 block mb-1'>Mortality</label>
                    <input type='number' value={editData.mortality} onChange={(e) => setEditData({...editData, mortality: e.target.value})} className='w-full border-2 border-gray-300 focus:border-blue-500 rounded-lg p-2 outline-none' />
                  </div>
                  <div>
                    <label className='text-xs font-bold text-gray-600 block mb-1'>Feed Count</label>
                    <input type='number' value={editData.feedcount} onChange={(e) => setEditData({...editData, feedcount: e.target.value})} className='w-full border-2 border-gray-300 focus:border-blue-500 rounded-lg p-2 outline-none' />
                  </div>
                  <div>
                    <label className='text-xs font-bold text-gray-600 block mb-1'>Feed Type</label>
                    <select value={editData.feedtype} onChange={(e) => setEditData({...editData, feedtype: e.target.value})} className='w-full border-2 border-gray-300 focus:border-blue-500 rounded-lg p-2 outline-none'>
                      <option value='Pre-starter'>Pre-starter</option>
                      <option value='Starter'>Starter</option>
                      <option value='Finisher'>Finisher</option>
                    </select>
                  </div>
                  <div>
                    <label className='text-xs font-bold text-gray-600 block mb-1'>Avg Weight</label>
                    <input type='number' value={editData.avgweight} onChange={(e) => setEditData({...editData, avgweight: e.target.value})} className='w-full border-2 border-gray-300 focus:border-blue-500 rounded-lg p-2 outline-none' />
                  </div>
                  <div>
                    <label className='text-xs font-bold text-gray-600 block mb-1'>Feedback</label>
                    <textarea value={editData.feedback} onChange={(e) => setEditData({...editData, feedback: e.target.value})} className='w-full border-2 border-gray-300 focus:border-blue-500 rounded-lg p-2 outline-none resize-none' rows='3' />
                  </div>
                  <div className='flex gap-2 pt-2'>
                    <button onClick={() => handleUpdate(entry._id)} className='flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 rounded-lg font-bold shadow-md transition-all'>Save</button>
                    <button onClick={() => setEditingId(null)} className='flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white py-2 rounded-lg font-bold shadow-md transition-all'>Cancel</button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className='grid grid-cols-2 gap-4 mb-4'>
                  <div className='bg-white rounded-xl p-3 text-center shadow-sm'>
                    <span className='text-xs text-gray-600 block mb-1'>Mortality</span>
                    <span className='text-xl font-bold text-red-600'>{entry.mortality}</span>
                  </div>
                  <div className='bg-white rounded-xl p-3 text-center shadow-sm'>
                    <span className='text-xs text-gray-600 block mb-1'>Feed</span>
                    <span className='text-xl font-bold text-blue-600'>{entry.feedcount}</span>
                  </div>
                  <div className='bg-white rounded-xl p-3 text-center shadow-sm'>
                    <span className='text-xs text-gray-600 block mb-1'>Category</span>
                    <span className='text-sm font-bold text-orange-600'>{entry.feedtype}</span>
                  </div>
                  <div className='bg-white rounded-xl p-3 text-center shadow-sm'>
                    <span className='text-xs text-gray-600 block mb-1'>Avg Weight</span>
                    <span className='text-sm font-bold text-purple-600'>{entry.avgweight} {entry.unit}</span>
                  </div>
                </div>
                <div className='bg-green-100 rounded-xl p-3 mt-3'>
                  <span className='text-xs text-gray-600 block mb-1'>Feedback</span>
                  <span className='text-sm text-gray-800'>{entry.feedback}</span>
                </div>
                {user?.role === 'admin' && batchStatus === 'Active' && (
                  <div className='flex gap-2 mt-3'>
                    <button onClick={() => handleEdit(entry)} className='flex-1 bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700'>Edit</button>
                    <button onClick={() => handleDelete(entry._id)} className='flex-1 bg-red-600 text-white py-2 rounded font-bold hover:bg-red-700'>Delete</button>
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

export default DailyEntryList