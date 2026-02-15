import { useEffect, useState } from "react";
import { GiChicken } from "react-icons/gi";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const NavBar = () => {
  const [isTokenFound,setIsTokenFound]=useState(false);
  const {logout}=useAuth();
  const navigate=useNavigate();
   const location = useLocation();

  useEffect(()=>{
    const token=localStorage.getItem("token");
    setIsTokenFound(!!token);
  },[location]);
  return (
    <div className='max-w-screen flex justify-between p-2 items-center fixed top-0 left-0 right-0 h-15 bg-amber-600'>
      <p className="flex items-center text-[35px] gap-2 text-yellow-50"><GiChicken className='text-amber-100 text-[50px]' /> KG Farm</p>
      {isTokenFound && (<button onClick={logout} className="bg-amber-300 cursor-pointer px-4 py-1 rounded-2xl font-bold">Log out</button>)}
    </div>
  )
}

export default NavBar
