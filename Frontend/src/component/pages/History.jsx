import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import { useNavigate } from 'react-router-dom'

const History = () => {
    const { user, loading: authLoading } = useAuth()
    const { historyData, loading } = useData()
    const navigate = useNavigate()

    if (authLoading || loading) {
        return (
            <div className='min-h-screen mt-16 flex items-center justify-center'>
                <p className='text-xl text-purple-700'>Loading...</p>
            </div>
        )
    }

    const stats = historyData?.stats || {}
    const batches = historyData?.batches || []

    return (
        <div className='min-h-screen mt-16 mb-16 p-4 md:p-8 bg-gradient-to-br from-purple-50 to-white'>
            <div className='max-w-7xl mx-auto'>
                <p className='text-3xl md:text-5xl font-bold text-purple-700 text-center mb-10'>History</p>
                
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-12'>
                    <div className='bg-gradient-to-br from-purple-100 to-purple-50 border-l-6 border-purple-700 shadow-xl rounded-2xl p-4 md:p-6 flex flex-col justify-center items-center transform hover:scale-105 transition-all'>
                        <p className='text-sm md:text-lg font-bold text-gray-700 text-center'>Total Chicks</p>
                        <span className='text-2xl md:text-4xl font-bold text-purple-700'>{stats.totalChicks || 0}</span>
                    </div>
                    <div className='bg-gradient-to-br from-blue-100 to-blue-50 border-l-6 border-blue-700 shadow-xl rounded-2xl p-4 md:p-6 flex flex-col justify-center items-center transform hover:scale-105 transition-all'>
                        <p className='text-sm md:text-lg font-bold text-gray-700 text-center'>Total Batches</p>
                        <span className='text-2xl md:text-4xl font-bold text-blue-700'>{stats.totalBatches || 0}</span>
                    </div>
                    <div className='bg-gradient-to-br from-red-100 to-red-50 border-l-6 border-red-700 shadow-xl rounded-2xl p-4 md:p-6 flex flex-col justify-center items-center transform hover:scale-105 transition-all'>
                        <p className='text-sm md:text-lg font-bold text-gray-700 text-center'>Total Mortality</p>
                        <span className='text-2xl md:text-4xl font-bold text-red-700'>{stats.totalMortality || 0}</span>
                    </div>
                    <div className='bg-gradient-to-br from-green-100 to-green-50 border-l-6 border-green-700 shadow-xl rounded-2xl p-4 md:p-6 flex flex-col justify-center items-center transform hover:scale-105 transition-all'>
                        <p className='text-sm md:text-lg font-bold text-gray-700 text-center'>Chicks Delivered</p>
                        <span className='text-2xl md:text-4xl font-bold text-green-700'>{stats.chicksDelivered || 0}</span>
                    </div>
                    <div className='bg-gradient-to-br from-orange-100 to-orange-50 border-l-6 border-orange-700 shadow-xl rounded-2xl p-4 md:p-6 flex flex-col justify-center items-center transform hover:scale-105 transition-all'>
                        <p className='text-sm md:text-lg font-bold text-gray-700 text-center'>Total Feed</p>
                        <span className='text-2xl md:text-4xl font-bold text-orange-700'>{stats.totalFeed || 0}</span>
                    </div>
                </div>

                <div className='mt-10'>
                    <p className='text-2xl md:text-4xl font-bold text-purple-700 text-center mb-8'>All Batches</p>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
                        {batches.length === 0 ? (
                            <p className='col-span-full text-center text-gray-500 text-lg'>No batches found</p>
                        ) : (
                            batches.map((batch) => (
                                <div key={batch._id} className='bg-white shadow-2xl border-l-6 border-purple-700 rounded-2xl p-5 md:p-6 transform hover:scale-105 transition-all'>
                                    <div className='flex justify-between items-center mb-4'>
                                        <h3 className='text-lg md:text-xl font-bold text-gray-800'>{batch.batchname}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs md:text-sm font-bold ${batch.batchStatus === 'Active' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
                                            {batch.batchStatus}
                                        </span>
                                    </div>
                                    {user?.role === "admin" && batch.username && (
                                        <p className='text-sm text-purple-600 font-semibold mb-2'>User: {batch.username}</p>
                                    )}
                                    <div className='space-y-2 mb-5 text-sm md:text-base'>
                                        <p><span className='font-bold text-gray-700'>Total Chicks:</span> <span className='text-purple-700 font-semibold'>{batch.totalchick}</span></p>
                                        <p><span className='font-bold text-gray-700'>Delivered:</span> <span className='text-purple-700 font-semibold'>{new Date(batch.delivereddate).toLocaleDateString()}</span></p>
                                        <p><span className='font-bold text-gray-700'>Delivered By:</span> <span className='text-purple-700 font-semibold'>{batch.deliveredby}</span></p>
                                    </div>
                                    <button 
                                        onClick={() => navigate(`/batch-dashboard/${batch._id}`)}
                                        className='w-full bg-purple-600 text-white py-2 md:py-3 rounded-lg font-bold hover:bg-purple-700 transition-all transform hover:scale-105'
                                    >
                                        View Details
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default History
