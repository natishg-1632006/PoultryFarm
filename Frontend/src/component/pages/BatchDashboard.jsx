import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import DailyEntryList from './DailyEntryList'
import FeedEntryList from './FeedEntryList'
import MedicineEntryList from './MedicineEntryList'
import api from '../utils/api'

const BatchDashboard = () => {
    const { batchid } = useParams()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState("daily")
    const [dashboardData, setDashboardData] = useState(null)
    const [feedStats, setFeedStats] = useState({ preStarter: 0, starter: 0, finisher: 0, total: 0, consumed: 0, available: 0 })

    useEffect(() => {
        fetchBatchDashboard()
    }, [batchid])

    const fetchBatchDashboard = async () => {
        try {
            const res = await api.get(`batch/batch-dashboard/${batchid}`)
            if (res.data.success) {
                setDashboardData(res.data.data)
                calculateFeedStats(res.data.data.entries, res.data.data.feeds)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const calculateFeedStats = (entries, feeds) => {
        const stats = { preStarter: 0, starter: 0, finisher: 0, total: 0, consumed: 0, available: 0 }
        
        feeds.forEach(feed => {
            const feedAmount = feed.feedpack || 0
            if (feed.feedtype === "Pre-starter") stats.preStarter += feedAmount
            if (feed.feedtype === "Starter") stats.starter += feedAmount
            if (feed.feedtype === "Finisher") stats.finisher += feedAmount
            stats.total += feedAmount
        })
        
        entries.forEach(entry => {
            stats.consumed += entry.feedcount || 0
        })
        
        stats.available = stats.total - stats.consumed
        setFeedStats(stats)
    }

    const calculateMortality = (entries) => {
        return entries.reduce((total, entry) => total + (entry.mortality || 0), 0)
    }

    const batchData = dashboardData?.batch || {}
    const latestEntry = dashboardData?.entries?.[0] || {}
    const totalMortality = calculateMortality(dashboardData?.entries || [])
    const currentChick = (batchData.totalchick || 0) - totalMortality

    return (
        <div className='mt-16 mb-16'>
            <div className='flex justify-between items-center px-10 mb-5'>
                <button onClick={() => navigate('/history')} className='bg-gray-600 text-white px-4 py-2 rounded-lg font-bold'>
                    ← Back
                </button>
                <p className='text-[40px] font-bold text-purple-700'>{batchData.batchname}</p>
                <div></div>
            </div>

            <div className='p-5 gap-x-5 flex justify-center flex-wrap gap-y-8'>
                <div className='w-100 md:w-full shadow-xl rounded-2xl p-5 flex flex-wrap justify-center gap-5'>
                    <div className='w-40 md:w-80 md:h-30 border-l-6 shadow-lg border-purple-700 shadow-purple-600 rounded-2xl p-2 flex flex-col justify-center items-center'>
                        <p className='text-xl md:text-[40px] font-bold'>Total Chick</p>
                        <span className='text-xl md:text-[20px] font-bold'>{batchData.totalchick || 0}</span>
                    </div>
                    <div className='w-40 md:w-80 md:h-30 border-l-6 shadow-lg border-purple-700 shadow-purple-600 rounded-2xl p-2 flex flex-col justify-center items-center'>
                        <p className='text-xl md:text-[40px] font-bold'>Current Chick</p>
                        <span className='text-xl md:text-[20px] font-bold'>{currentChick}</span>
                    </div>
                    <div className='w-40 md:w-80 md:h-30 border-l-6 shadow-lg border-purple-700 shadow-purple-600 rounded-2xl p-2 flex flex-col justify-center items-center'>
                        <p className='text-xl md:text-[40px] font-bold'>Mortality</p>
                        <span className='text-xl md:text-[20px] font-bold'>{totalMortality}</span>
                    </div>
                    <div className='w-40 md:w-80 md:h-30 border-l-6 shadow-lg border-purple-700 shadow-purple-600 rounded-2xl p-2 flex flex-col justify-center items-center'>
                        <p className='text-xl md:text-[40px] font-bold'>Avg weight</p>
                        <span className='text-xl md:text-[20px] font-bold'>{latestEntry.avgweight || 0} {latestEntry.unit || 'g'}</span>
                    </div>
                </div>

                <div className='w-100 md:w-full shadow-xl rounded-2xl p-5 gap-5 text-center'>
                    <p className='text-2xl font-bold mb-5'>Feed</p>
                    <div className='flex flex-col md:flex-row md:gap-x-5 md:justify-center md:flex-wrap gap-y-5'>
                        <div className='flex justify-center gap-x-4'>
                            <div className='w-40 border-l-6 shadow-lg border-blue-700 shadow-blue-600 rounded-2xl p-2 text-center'>
                                <p className='text-md font-bold'>Pre-Starter</p>
                                <span className='text-md font-bold'>{feedStats.preStarter}</span>
                            </div>
                            <div className='w-40 border-l-6 shadow-lg border-orange-700 shadow-orange-600 rounded-2xl p-2 text-center'>
                                <p className='text-md font-bold'>Starter</p>
                                <span className='text-md font-bold'>{feedStats.starter}</span>
                            </div>
                            <div className='w-40 border-l-6 shadow-lg border-green-700 shadow-green-600 rounded-2xl p-2 text-center'>
                                <p className='text-md font-bold'>Finisher</p>
                                <span className='text-md font-bold'>{feedStats.finisher}</span>
                            </div>
                        </div>
                        <div className='flex justify-center gap-x-4'>
                            <div className='w-40 border-l-6 shadow-lg border-purple-700 shadow-purple-600 rounded-2xl p-2 text-center'>
                                <p className='text-md font-bold'>Total</p>
                                <span className='text-md font-bold'>{feedStats.total}</span>
                            </div>
                            <div className='w-40 border-l-6 shadow-lg border-purple-700 shadow-purple-600 rounded-2xl p-2 text-center'>
                                <p className='text-md font-bold'>Consumed</p>
                                <span className='text-md font-bold'>{feedStats.consumed}</span>
                            </div>
                            <div className='w-40 border-l-6 shadow-lg border-purple-700 shadow-purple-600 rounded-2xl p-2 text-center'>
                                <p className='text-md font-bold'>Available</p>
                                <span className='text-md font-bold'>{feedStats.available}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='px-2 sm:px-4 mb-8'>
                <div className='bg-white rounded-3xl shadow-2xl overflow-hidden max-w-7xl mx-auto'>
                    <div className='flex flex-col sm:flex-row gap-2 p-2 sm:p-4 bg-gray-50'>
                        <button onClick={() => setActiveTab("daily")} className={`py-2 sm:py-3 px-4 sm:px-6 rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all ${activeTab == "daily" ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-gray-100 shadow"}`}>📊 Daily Entry</button>
                        <button onClick={() => setActiveTab("feed")} className={`py-2 sm:py-3 px-4 sm:px-6 rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all ${activeTab == "feed" ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-gray-100 shadow"}`}>🌾 Feed</button>
                        <button onClick={() => setActiveTab("medicine")} className={`py-2 sm:py-3 px-4 sm:px-6 rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all ${activeTab == "medicine" ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-gray-100 shadow"}`}>💊 Medicine</button>
                    </div>
                    <div className='p-2 sm:p-4'>
                        {activeTab === "daily" && <DailyEntryList entries={dashboardData?.entries || []} />}
                        {activeTab === "feed" && <FeedEntryList feeds={dashboardData?.feeds || []} />}
                        {activeTab === "medicine" && <MedicineEntryList medicines={dashboardData?.medicines || []} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BatchDashboard
