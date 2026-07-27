import axios from "axios"
import { createContext } from "react"

export const AxiosDataContext = createContext()

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    withCredentials: true
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (!originalRequest) return Promise.reject(error);

        const isAuthEndpoint = originalRequest.url?.includes('/users/login') ||
                               originalRequest.url?.includes('/users/register') ||
                               originalRequest.url?.includes('/users/refresh-token');

        if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                .then(() => api(originalRequest))
                .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                await api.get('/users/refresh-token');
                processQueue(null);
                return api(originalRequest);
            } catch (refreshErr) {
                processQueue(refreshErr);
                return Promise.reject(refreshErr);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
);

const AxiosContext = ({ children }) => {
    return (
        <AxiosDataContext.Provider value={api}>
            {children}
        </AxiosDataContext.Provider>
    )
}

export default AxiosContext;