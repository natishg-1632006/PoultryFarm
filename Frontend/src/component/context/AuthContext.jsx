import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const userContext = createContext();

const AuthContext = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [batch, setBatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await api.get("auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setUser(res.data.user);
          const userId = res.data.user.userId || res.data.user.userid || res.data.user._id;
          if (userId) {
            const batchRes = await api.get(`batch/${userId}`);
            if (batchRes.data.success) {
              setBatch(batchRes.data.batch);
              localStorage.setItem("batchid", batchRes.data.batch._id);
            }
          }
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  const login = async (userData, activeBatch) => {
    setUser(userData);
    setBatch(activeBatch);
    if (activeBatch) {
      localStorage.setItem("batchid", activeBatch._id);
    }
  };

  const logout = () => {
    setUser(null);
    setBatch(null);
    localStorage.removeItem("token");
    localStorage.removeItem("batchid");
    navigate("/login");
  };

  const getUsers = async () => {
    try {
      const res = await api.get("auth/getUsers");
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <userContext.Provider value={{ user, users, batch, setBatch, login, logout, getUsers, loading }}>
      {children}
    </userContext.Provider>
  );
};

export const useAuth = () => useContext(userContext);
export default AuthContext;
