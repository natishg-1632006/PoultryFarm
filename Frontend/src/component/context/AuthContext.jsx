import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import api from '../utils/api';


const userContext = createContext();

const AuthContext = ({ children }) => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await api.get("auth/verify", {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
          if (res.data.success) {
            setUser(res.data.user);
          }
          else {
            setUser(null);
            setLoading(false);
          }
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    verifyUser();
  }, [])

  const login = (user) => {
    setUser(user);
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  }

  const getUsers=async()=>{
      try {
         const token = localStorage.getItem("token");
        if (token) {
          const res = await api.get("auth/getUsers")
          setUsers(res.data.data);
        }
      } catch (error) {
        console.log(error.message);
        
      }
  }

  return (
    <userContext.Provider value={{ user, login, logout, getUsers, users }}>
      {children}
    </userContext.Provider>
  )
}

export const useAuth = () => useContext(userContext);
export default AuthContext
