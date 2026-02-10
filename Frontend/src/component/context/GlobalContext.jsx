import { createContext } from "react";


const GlobalContext=createContext(null);
const GlobalState=({children})=>{
    return <GlobalContext.Provider value={{}}>
        {children}
    </GlobalContext.Provider>
}

export default GlobalState;