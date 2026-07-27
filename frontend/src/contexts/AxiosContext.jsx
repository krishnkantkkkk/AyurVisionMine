import axios from "axios"
import { createContext } from "react"

export const AxiosDataContext = createContext()

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

const AxiosContext = ({ children }) => {
    return (
        <AxiosDataContext.Provider value={api}>
            {children}
        </AxiosDataContext.Provider>
    )
}

export default AxiosContext;