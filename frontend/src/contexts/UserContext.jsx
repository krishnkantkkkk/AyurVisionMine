import { createContext, useMemo, useState } from "react"

export const UserDataContext = createContext()

const UserContext = ({ children }) => {
    const [user, setUser] = useState({})
    const [diseasesList, setDiseasesList] = useState([])
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const contextValue = useMemo(() => ({
        user,
        setUser,
        diseasesList,
        setDiseasesList,
        isAuthenticated,
        setIsAuthenticated
    }), [user, diseasesList, isAuthenticated]);

    return (
        <UserDataContext.Provider value={contextValue}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserContext;