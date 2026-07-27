import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { AxiosDataContext } from "./AxiosContext"

export const UserDataContext = createContext()

const UserContext = ({ children }) => {
    const [user, setUser] = useState({})
    const [diseasesList, setDiseasesList] = useState([])
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [authLoading, setAuthLoading] = useState(true)
    const api = useContext(AxiosDataContext)

    useEffect(() => {
        api.get('/users/profile')
        .then(res => {
            if (res.status === 200 && res.data?._id) {
                setUser(res.data)
                setIsAuthenticated(true)
            }
        })
        .catch(() => {
            setIsAuthenticated(false)
            setUser({})
        })
        .finally(() => {
            setAuthLoading(false)
        })
    }, [api])

    const contextValue = useMemo(() => ({
        user,
        setUser,
        diseasesList,
        setDiseasesList,
        isAuthenticated,
        setIsAuthenticated,
        authLoading
    }), [user, diseasesList, isAuthenticated, authLoading]);

    return (
        <UserDataContext.Provider value={contextValue}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserContext;