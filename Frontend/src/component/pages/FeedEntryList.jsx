import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import { toast } from 'react-toastify'

const FeedEntryList = ({ feeds, batchStatus, onUpdate }) => {
  const { user } = useAuth()
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({})

  const handleEdit = (feed) => {
    setEditingId(feed._id)
    setEditData(feed)
  }

  const handleUpdate = async (id) => {
    try {
      const res = await api.put(`feed/${id}`, editData)
      if (res.data.success) {
        toast.success('Feed entry updated successfully')
        setEditingId(null)
        onUpdate()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update feed entry')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this feed entry?')) {
      try {
        const res = await api.delete(`feed/${id}`)
        if (res.data.success) {
          toast.success('Feed entry deleted successfully')
          onUpdate()
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete feed entry')
      }
    }
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-4'>
      {feeds.length === 0 ? (
        <p className='col-span-full text-center text-gray-500 text-lg py-10'>No feed entries found</p>
      ) : (
        feeds.map((feed) => (
          <div key={feed._id} className='bg-gradient-to-br from-blue-50 to-white shadow-xl border-l-6 border-blue-600 rounded-2xl p-5 transform hover:scale-105 transition-all'>
            <div className='flex justify-between items-center mb-4 pb-3 border-b-2 border-blue-200'>
              <span className='text-sm font-semibold text-gray-600'>{new Date(feed.deliveredDate).toLocaleDateString()}</span>
              <span className='bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold'>{feed.vehicleno}</span>
            </div>
            
            {editingId === feed._id ? (
              <div className='space-y-3'>
                <input type='number' value={editData.feedpack} onChange={(e) => setEditData({...editData, feedpack: e.target.value})} className='w-full border rounded p-2' placeholder='Feed Pack' />
                <select value={editData.feedcategory} onChange={(e) => setEditData({...editData, feedcategory: e.target.value})} className='w-full border rounded p-2'>
                  <option value='Pre-starter'>Pre-starter</option>
                  <option value='Starter'>Starter</option>
                  <option value='Finisher'>Finisher</option>
                </select>
                <select value={editData.feedtype} onChange={(e) => setEditData({...editData, feedtype: e.target.value})} className='w-full border rounded p-2'>
                  <option value='Pellet'>Pellet</option>
                  <option value='Mash'>Mash</option>
                  <option value='Crumble'>Crumble</option>
                </select>
                <input type='text' value={editData.deliveredby} onChange={(e) => setEditData({...editData, deliveredby: e.target.value})} className='w-full border rounded p-2' placeholder='Delivered By' />
                <input type='text' value={editData.vehicleno} onChange={(e) => setEditData({...editData, vehicleno: e.target.value})} className='w-full border rounded p-2' placeholder='Vehicle No' />
                <div className='flex gap-2'>
                  <button onClick={() => handleUpdate(feed._id)} className='flex-1 bg-blue-600 text-white py-2 rounded font-bold'>Save</button>
                  <button onClick={() => setEditingId(null)} className='flex-1 bg-gray-500 text-white py-2 rounded font-bold'>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div className='grid grid-cols-3 gap-3 mb-4'>
                  <div className='bg-white rounded-xl p-3 text-center shadow-sm'>
                    <span className='text-xs text-gray-600 block mb-1'>Quantity</span>
                    <span className='text-xl font-bold text-blue-600'>{feed.feedpack}</span>
                  </div>
                  <div className='bg-white rounded-xl p-3 text-center shadow-sm col-span-2'>
                    <span className='text-xs text-gray-600 block mb-1'>Category</span>
                    <span className='text-sm font-bold text-orange-600'>{feed.feedcategory}</span>
                  </div>
                </div>
                <div className='bg-blue-100 rounded-xl p-3 mb-3'>
                  <span className='text-xs text-gray-600 block mb-1'>Feed Type</span>
                  <span className='text-sm font-bold text-blue-800'>{feed.feedtype}</span>
                </div>
                <div className='bg-blue-100 rounded-xl p-3'>
                  <span className='text-xs text-gray-600 block mb-1'>Delivered By</span>
                  <span className='text-sm font-bold text-blue-800'>{feed.deliveredby}</span>
                </div>
                {user?.role === 'admin' && batchStatus === 'Active' && (
                  <div className='flex gap-2 mt-3'>
                    <button onClick={() => handleEdit(feed)} className='flex-1 bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700'>Edit</button>
                    <button onClick={() => handleDelete(feed._id)} className='flex-1 bg-red-600 text-white py-2 rounded font-bold hover:bg-red-700'>Delete</button>
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

export default FeedEntryList