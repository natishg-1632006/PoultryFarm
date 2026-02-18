import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '../utils/api';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const { user, loading: authLoading } = useAuth();
    const [dashboardData, setDashboardData] = useState(null);
    const [historyData, setHistoryData] = useState(null);
    const [loading, setLoading] = useState(false);

    const getUserId = () => user?.userid || user?.userId || user?._id;

    const fetchDashboardData = async () => {
        const userId = getUserId();
        if (!userId) return;
        
        try {
            setLoading(true);
            if (user.role === 'admin') {
                const res = await api.get('batch/admin-dashboard');
                if (res.data.success) {
                    setDashboardData(res.data.data);
                } else {
                    setDashboardData(null);
                }
            } else {
                const res = await api.get(`batch/dashboard/${userId}`);
                if (res.data.success) {
                    setDashboardData(res.data.data);
                } else {
                    setDashboardData(null);
                }
            }
        } catch (error) {
            console.log('Error fetching dashboard:', error);
            setDashboardData(null);
        } finally {
            setLoading(false);
        }
    };

    const fetchHistoryData = async () => {
        const userId = getUserId();
        if (!userId) return;
        
        try {
            setLoading(true);
            if (user.role === 'admin') {
                const res = await api.get('batch/admin-history');
                if (res.data.success) {
                    setHistoryData(res.data.data);
                } else {
                    setHistoryData(null);
                }
            } else {
                const res = await api.get(`batch/history/${userId}`);
                if (res.data.success) {
                    setHistoryData(res.data.data);
                } else {
                    setHistoryData(null);
                }
            }
        } catch (error) {
            console.log('Error fetching history:', error);
            setHistoryData(null);
        } finally {
            setLoading(false);
        }
    };

    // Fetch dashboard data when user changes
    useEffect(() => {
        const userId = getUserId();
        if (!authLoading && userId) {
            setDashboardData(null);
            fetchDashboardData();
        } else if (!user) {
            setDashboardData(null);
        }
    }, [authLoading, user]);

    // Fetch history data when user changes
    useEffect(() => {
        const userId = getUserId();
        if (!authLoading && userId) {
            setHistoryData(null);
            fetchHistoryData();
        } else if (!user) {
            setHistoryData(null);
        }
    }, [authLoading, user]);

    const refreshDashboard = () => {
        fetchDashboardData();
    };

    const refreshHistory = () => {
        fetchHistoryData();
    };

    return (
        <DataContext.Provider value={{
            dashboardData,
            historyData,
            loading,
            refreshDashboard,
            refreshHistory
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
