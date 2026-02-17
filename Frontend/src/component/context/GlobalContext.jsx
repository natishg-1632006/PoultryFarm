import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import api from "../utils/api";


const GlobalContext = createContext();
const GlobalState = ({ children }) => {
    const { user } = useAuth();
   
    return <GlobalContext.Provider value={{}}>
        {children}
    </GlobalContext.Provider>
}
export const useGlobal = () => useContext(GlobalContext);

export default GlobalState;