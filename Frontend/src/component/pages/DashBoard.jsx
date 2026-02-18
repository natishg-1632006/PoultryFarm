import React, { useState, useEffect } from 'react'
import DailyEntryList from './DailyEntryList';
import FeedEntryList from './FeedEntryList';
import MedicineEntryList from './MedicineEntryList';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import api from '../utils/api';
import CompleteBatchForm from '../forms/CompleteBatchForm';

const DashBoard = () => {
    const [activeTab, setActiveTab] = useState("daily");
    const { user, loading: authLoading } = useAuth();
    const { dashboardData, loading, refreshDashboard } = useData();
    const [feedStats, setFeedStats] = useState({ preStarter: 0, starter: 0, finisher: 0, total: 0, consumed: 0, available: 0 });
    const [showCompleteForm, setShowCompleteForm] = useState(false);

    useEffect(() => {
        if (dashboardData) {
            const data = Array.isArray(dashboardData) ? dashboardData[0] : dashboardData;
            if (data?.entries && data?.feeds) {
                calculateFeedStats(data.entries, data.feeds);
            }
        }
    }, [dashboardData]);

    const calculateFeedStats = (entries, feeds) => {
        const stats = { preStarter: 0, starter: 0, finisher: 0, total: 0, consumed: 0, available: 0 };
        
        feeds.forEach(feed => {
            const feedAmount = feed.feedpack || 0;
            if (feed.feedtype === "Pre-starter") stats.preStarter += feedAmount;
            if (feed.feedtype === "Starter") stats.starter += feedAmount;
            if (feed.feedtype === "Finisher") stats.finisher += feedAmount;
            stats.total += feedAmount;
        });
        
        entries.forEach(entry => {
            stats.consumed += entry.feedcount || 0;
        });
        
        stats.available = stats.total - stats.consumed;
        setFeedStats(stats);
    };

    const calculateMortality = (entries) => {
        return entries.reduce((total, entry) => total + (entry.mortality || 0), 0);
    };

    const data = Array.isArray(dashboardData) ? dashboardData[0] : dashboardData;
    const batchData = data?.batch || {};
    const latestEntry = data?.entries?.[0] || {};
    const totalMortality = calculateMortality(data?.entries || []);
    const currentChick = (batchData.totalchick || 0) - totalMortality;

    return (
        <div className='min-h-screen mt-16 mb-16 bg-gradient-to-br from-purple-50 to-white'>
            <div className='max-w-7xl mx-auto px-4 py-8'>
                <p className='text-3xl md:text-5xl font-bold text-purple-700 text-center mb-8'>Dashboard</p>
                
                {(authLoading || loading) && (
                    <div className='bg-white rounded-3xl shadow-2xl p-8 text-center'>
                        <p className='text-xl text-purple-700'>Loading...</p>
                    </div>
                )}

                {!authLoading && !loading && !dashboardData && (
                    <div className='bg-white rounded-3xl shadow-2xl p-8 text-center'>
                        <p className='text-xl text-gray-600'>No active batch found.</p>
                    </div>
                )}

                {!authLoading && !loading && dashboardData && (
                    <>
                {user?.role === "admin" && data?.batch?.batchStatus === "Active" && (
                    <div className='bg-white rounded-3xl shadow-2xl p-4 mb-8 text-center'>
                        <button
                            onClick={() => setShowCompleteForm(true)}
                            className='bg-green-600 text-white py-3 px-8 rounded-xl font-bold hover:bg-green-700 transition-all transform hover:scale-105'
                        >
                            Complete Batch
                        </button>
                    </div>
                )}

                <div className='bg-white rounded-3xl shadow-2xl p-4 md:p-8 mb-8'>
                    <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
                        <div className='bg-gradient-to-br from-purple-100 to-purple-50 border-l-6 border-purple-700 shadow-lg rounded-2xl p-4 flex flex-col justify-center items-center transform hover:scale-105 transition-all'>
                            <p className='text-sm md:text-lg lg:text-2xl font-bold text-gray-700'>Total Chick</p>
                            <span className='text-2xl md:text-3xl lg:text-4xl font-bold text-purple-700'>{batchData.totalchick || 0}</span>
                        </div>
                        <div className='bg-gradient-to-br from-green-100 to-green-50 border-l-6 border-green-700 shadow-lg rounded-2xl p-4 flex flex-col justify-center items-center transform hover:scale-105 transition-all'>
                            <p className='text-sm md:text-lg lg:text-2xl font-bold text-gray-700'>Current Chick</p>
                            <span className='text-2xl md:text-3xl lg:text-4xl font-bold text-green-700'>{currentChick}</span>
                        </div>
                        <div className='bg-gradient-to-br from-red-100 to-red-50 border-l-6 border-red-700 shadow-lg rounded-2xl p-4 flex flex-col justify-center items-center transform hover:scale-105 transition-all'>
                            <p className='text-sm md:text-lg lg:text-2xl font-bold text-gray-700'>Mortality</p>
                            <span className='text-2xl md:text-3xl lg:text-4xl font-bold text-red-700'>{totalMortality}</span>
                        </div>
                        <div className='bg-gradient-to-br from-blue-100 to-blue-50 border-l-6 border-blue-700 shadow-lg rounded-2xl p-4 flex flex-col justify-center items-center transform hover:scale-105 transition-all'>
                            <p className='text-sm md:text-lg lg:text-2xl font-bold text-gray-700'>Avg Weight</p>
                            <span className='text-2xl md:text-3xl lg:text-4xl font-bold text-blue-700'>{latestEntry.avgweight || 0} {latestEntry.unit || 'g'}</span>
                        </div>
                    </div>
                </div>

                <div className='bg-white rounded-3xl shadow-2xl p-4 md:p-8 mb-8'>
                    <p className='text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800'>Feed Statistics</p>
                    <div className='grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4'>
                        <div className='bg-gradient-to-br from-blue-100 to-blue-50 border-l-4 border-blue-700 shadow-md rounded-xl p-3 text-center transform hover:scale-105 transition-all'>
                            <p className='text-xs md:text-sm font-bold text-gray-700'>Pre-Starter</p>
                            <span className='text-lg md:text-xl font-bold text-blue-700'>{feedStats.preStarter}</span>
                        </div>
                        <div className='bg-gradient-to-br from-orange-100 to-orange-50 border-l-4 border-orange-700 shadow-md rounded-xl p-3 text-center transform hover:scale-105 transition-all'>
                            <p className='text-xs md:text-sm font-bold text-gray-700'>Starter</p>
                            <span className='text-lg md:text-xl font-bold text-orange-700'>{feedStats.starter}</span>
                        </div>
                        <div className='bg-gradient-to-br from-green-100 to-green-50 border-l-4 border-green-700 shadow-md rounded-xl p-3 text-center transform hover:scale-105 transition-all'>
                            <p className='text-xs md:text-sm font-bold text-gray-700'>Finisher</p>
                            <span className='text-lg md:text-xl font-bold text-green-700'>{feedStats.finisher}</span>
                        </div>
                        <div className='bg-gradient-to-br from-purple-100 to-purple-50 border-l-4 border-purple-700 shadow-md rounded-xl p-3 text-center transform hover:scale-105 transition-all'>
                            <p className='text-xs md:text-sm font-bold text-gray-700'>Total</p>
                            <span className='text-lg md:text-xl font-bold text-purple-700'>{feedStats.total}</span>
                        </div>
                        <div className='bg-gradient-to-br from-pink-100 to-pink-50 border-l-4 border-pink-700 shadow-md rounded-xl p-3 text-center transform hover:scale-105 transition-all'>
                            <p className='text-xs md:text-sm font-bold text-gray-700'>Consumed</p>
                            <span className='text-lg md:text-xl font-bold text-pink-700'>{feedStats.consumed}</span>
                        </div>
                        <div className='bg-gradient-to-br from-indigo-100 to-indigo-50 border-l-4 border-indigo-700 shadow-md rounded-xl p-3 text-center transform hover:scale-105 transition-all'>
                            <p className='text-xs md:text-sm font-bold text-gray-700'>Available</p>
                            <span className='text-lg md:text-xl font-bold text-indigo-700'>{feedStats.available}</span>
                        </div>
                    </div>
                </div>

                <div className='bg-white rounded-3xl shadow-2xl overflow-hidden'>
                    <div className='flex flex-col sm:flex-row gap-2 p-2 sm:p-4 bg-gray-50'>
                        <button onClick={() => setActiveTab("daily")} className={`py-2 sm:py-3 px-4 sm:px-6 rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all ${activeTab == "daily" ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-gray-100 shadow"}`}>📊 Daily Entry</button>
                        <button onClick={() => setActiveTab("feed")} className={`py-2 sm:py-3 px-4 sm:px-6 rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all ${activeTab == "feed" ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-gray-100 shadow"}`}>🌾 Feed</button>
                        <button onClick={() => setActiveTab("medicine")} className={`py-2 sm:py-3 px-4 sm:px-6 rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all ${activeTab == "medicine" ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-gray-100 shadow"}`}>💊 Medicine</button>
                    </div>
                    <div className='p-2 sm:p-4'>
                        {activeTab === "daily" && <DailyEntryList entries={data?.entries || []} batchStatus={data?.batch?.batchStatus} onUpdate={refreshDashboard} />}
                        {activeTab === "feed" && <FeedEntryList feeds={data?.feeds || []} batchStatus={data?.batch?.batchStatus} onUpdate={refreshDashboard} />}
                        {activeTab === "medicine" && <MedicineEntryList medicines={data?.medicines || []} batchStatus={data?.batch?.batchStatus} onUpdate={refreshDashboard} />}
                    </div>
                </div>
                    </>
                )}

                {showCompleteForm && (
                    <CompleteBatchForm
                        batchId={data?.batch?._id}
                        onClose={() => setShowCompleteForm(false)}
                        onSuccess={() => {
                            refreshDashboard();
                        }}
                    />
                )}
            </div>
        </div>
    )
}

export default DashBoard
