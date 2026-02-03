import axios from "axios"
import { useEffect } from "react"
import { createContext, useState} from "react"

export const AxiosDataContext = createContext()

const AxiosContext = ({children})=>{
    useEffect(()=>{
        
    })
    const api = axios.create({
        baseURL : import.meta.env.VITE_BACKEND_BASE_URL,
    })
    return(
        <div>
            <AxiosDataContext.Provider value={api}>
                {children}
            </AxiosDataContext.Provider>
        </div>
    )
}

export default AxiosContext;