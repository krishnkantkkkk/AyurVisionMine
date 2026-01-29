import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import UserContext from './contexts/UserContext.jsx'
import AxiosContext from './contexts/AxiosContext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AxiosContext>
            <UserContext>
                <App />
            </UserContext>
        </AxiosContext>
    </BrowserRouter>
)
