import React, { useState } from 'react'
import api from '../utils/api'
import { toast } from 'react-toastify'

const CompleteBatchForm = ({ batchId, onClose, onSuccess }) => {
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
            const res = await api.put(`batch/complete/${batchId}`, formData)
            if (res.data.success) {
                toast.success('Batch completed successfully')
                onSuccess()
                onClose()
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to complete batch')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50 p-4'>
            <div className='bg-white shadow-2xl rounded-3xl p-6 md:p-10 max-w-2xl w-full mx-4 border-2 border-green-500'>
                <div className='text-center mb-6'>
                    <div className='inline-block p-4 bg-green-100 rounded-full mb-4'>
                        <svg className='w-12 h-12 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                        </svg>
                    </div>
                    <h2 className='text-3xl md:text-4xl font-bold text-green-700 mb-2'>Complete Batch</h2>
                    <p className='text-gray-600'>Finalize batch with overall weight and feedback</p>
                </div>
                
                <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
                    <div className='md:col-span-2'>
                        <label className='block text-gray-700 font-bold mb-2'>Overall Weight (kg) *</label>
                        <input
                            type='number'
                            step='0.01'
                            name='overallweight'
                            value={formData.overallweight}
                            onChange={handleChange}
                            className='w-full border-2 border-green-500 rounded-xl p-3 outline-none focus:border-green-600 transition-all font-semibold'
                            placeholder='Enter total weight'
                            required
                        />
                    </div>

                    <div className='md:col-span-2'>
                        <label className='block text-gray-700 font-bold mb-2'>Feedback (Optional)</label>
                        <textarea
                            name='feedback'
                            value={formData.feedback}
                            onChange={handleChange}
                            className='w-full border-2 border-green-500 rounded-xl p-3 outline-none focus:border-green-600 transition-all resize-none'
                            placeholder='Enter your feedback about this batch...'
                            rows='4'
                        />
                    </div>

                    <div className='md:col-span-2 flex gap-4 pt-4'>
                        <button
                            type='button'
                            onClick={onClose}
                            disabled={loading}
                            className='flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 md:py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            disabled={loading}
                            className='flex-1 bg-green-600 hover:bg-green-700 text-white py-3 md:py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {loading ? 'Processing...' : 'Complete Batch'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CompleteBatchForm
