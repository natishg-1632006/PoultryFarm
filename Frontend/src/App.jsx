import { Route, Routes, useLocation } from 'react-router-dom'
import Login from './component/pages/Login'
import Home from './component/pages/Home';
import NavBar from './component/pages/NavBar';
import DailyEntry from './component/pages/DailyEntry';
import FeedEntry from './component/pages/FeedEntry';
import MedicineEntry from './component/pages/MedicineEntry';
import BatchEntry from './component/pages/BatchEntry';
import ProtectedRoute from './component/utils/ProtectedRoute';
import { ToastContainer, toast } from 'react-toastify';
import DashBoard from './component/pages/DashBoard';
import History from './component/pages/History';
import BatchDashboard from './component/pages/BatchDashboard';
import CompleteBatch from './component/pages/CompleteBatch';
import { useAuth } from './component/context/AuthContext';

function App() {
  const { user } = useAuth();
  const location = useLocation();
  
  return (
    <div className='relative'>
      <NavBar/>

      <Routes key={user?.userid || 'no-user'} location={location}>

        <Route path='/login' element={<Login/>}/>

        {/* Home - Admin & User */}
        <Route 
          path='/' 
          element={
            <ProtectedRoute allowedRoles={["admin", "user"]}>
              <Home/>
            </ProtectedRoute>
          } 
        />

        {/* Daily Entry - User Only */}
        <Route 
          path='/dailyentry' 
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <DailyEntry/>
            </ProtectedRoute>
          } 
        />

        {/* Feed Entry - User Only */}
        <Route 
          path='/feed' 
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <FeedEntry/>
            </ProtectedRoute>
          } 
        />

        {/* Medicine Entry - User Only */}
        <Route 
          path='/medicine' 
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <MedicineEntry/>
            </ProtectedRoute>
          } 
        />

        <Route 
          path='/dashBoard' 
          element={
            <ProtectedRoute allowedRoles={["admin", "user"]}>
              <DashBoard key={user?.userid} />
            </ProtectedRoute>
          } 
        />

        <Route 
          path='/history' 
          element={
            <ProtectedRoute allowedRoles={["admin", "user"]}>
              <History key={user?.userid} />
            </ProtectedRoute>
          } 
        />

        <Route 
          path='/batch-dashboard/:batchid' 
          element={
            <ProtectedRoute allowedRoles={["admin", "user"]}>
              <BatchDashboard/>
            </ProtectedRoute>
          } 
        />

        {/* New Batch - Admin Only */}
        <Route 
          path='/newbatch' 
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <BatchEntry/>
            </ProtectedRoute>
          } 
        />

        {/* Complete Batch - Admin Only */}
        <Route 
          path='/complete-batch/:batchid' 
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <CompleteBatch/>
            </ProtectedRoute>
          } 
        />

      </Routes>

      <ToastContainer />
    </div>
  )
}
export default App
