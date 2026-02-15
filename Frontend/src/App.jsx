import { Route, Routes } from 'react-router-dom'
import Login from './component/pages/Login'
import Home from './component/pages/Home';
import NavBar from './component/pages/NavBar';
import DailyEntry from './component/pages/DailyEntry';
import FeedEntry from './component/pages/FeedEntry';
import MedicineEntry from './component/pages/MedicineEntry';
import BatchEntry from './component/pages/BatchEntry';
import ProtectedRoute from './component/utils/ProtectedRoute';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  return (
    <div className='relative'>
      <NavBar/>

      <Routes>

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

        {/* Daily Entry - Admin & User */}
        <Route 
          path='/dailyentry' 
          element={
            <ProtectedRoute allowedRoles={["admin", "user"]}>
              <DailyEntry/>
            </ProtectedRoute>
          } 
        />

        {/* Feed Entry - Admin & User */}
        <Route 
          path='/feed' 
          element={
            <ProtectedRoute allowedRoles={["admin", "user"]}>
              <FeedEntry/>
            </ProtectedRoute>
          } 
        />

        {/* Medicine Entry - Admin & User */}
        <Route 
          path='/medicine' 
          element={
            <ProtectedRoute allowedRoles={["admin", "user"]}>
              <MedicineEntry/>
            </ProtectedRoute>
          } 
        />

        {/* New Batch - Admin Only */}
        <Route 
          path='/newBatch' 
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <BatchEntry/>
            </ProtectedRoute>
          } 
        />

      </Routes>

      <ToastContainer />
    </div>
  )
}
export default App
