import { createContext, useState} from "react"

export const UserDataContext = createContext()

const UserContext = ({children})=>{
    const [user, setUser] = useState({})
    const [diseasesList, setDiseasesList] = useState({})
    return(
        <div>
            <UserDataContext.Provider value={{user, setUser, diseasesList, setDiseasesList}}>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default UserContext;