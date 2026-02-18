import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../utils/api'
import { toast } from 'react-toastify'

const CompleteBatch = () => {
    const { batchid } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        overallweight: '',
        feedback: ''
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!formData.overallweight) {
            toast.error('Overall weight is required')
            return
        }

        try {
            setLoading(true)
            const res = await api.put(`batch/complete/${batchid}`, formData)
            if (res.data.success) {
                toast.success('Batch completed successfully')
                navigate('/dashboard')
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to complete batch')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen p-4 md:p-8 mt-16 mb-5 flex justify-center items-center bg-gradient-to-br from-green-50 to-white'>
            <div className='w-full max-w-2xl bg-white shadow-2xl p-6 md:p-10 rounded-3xl border-t-8 border-green-600'>
                <div className='text-center mb-8'>
                    <p className='text-3xl md:text-4xl font-bold text-green-700'>Complete Batch</p>
                    <p className='text-sm text-gray-500 mt-2'>Finalize batch with overall weight and feedback</p>
                </div>
                    
                <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='md:col-span-2'>
                        <label className='font-bold text-gray-700 mb-2 block'>Overall Weight (kg) *</label>
                        <input
                            type='number'
                            step='0.01'
                            name='overallweight'
                            value={formData.overallweight}
                            onChange={handleChange}
                            className='w-full border-2 border-gray-300 focus:border-green-600 rounded-xl p-3 transition-all outline-none'
                            placeholder='Enter total weight'
                            required
                        />
                    </div>

                    <div className='md:col-span-2'>
                        <label className='font-bold text-gray-700 mb-2 block'>Feedback (Optional)</label>
                        <textarea
                            name='feedback'
                            value={formData.feedback}
                            onChange={handleChange}
                            className='w-full border-2 border-gray-300 focus:border-green-600 rounded-xl p-3 transition-all outline-none h-24 resize-none'
                            placeholder='Enter your feedback about this batch...'
                        />
                    </div>

                    <div className='md:col-span-2'>
                        <button
                            type='submit'
                            disabled={loading}
                            className='w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-3 rounded-xl text-lg font-bold transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {loading ? 'Processing...' : 'Complete Batch'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CompleteBatch
