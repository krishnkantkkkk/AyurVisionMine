import axios from "axios"
import { createContext, useState} from "react"

export const AxiosDataContext = createContext()

const AxiosContext = ({children})=>{
    const api = axios.create({
        baseURL : import.meta.env.VITE_BACKEND_BASE_URL,
        withCredentials: true
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