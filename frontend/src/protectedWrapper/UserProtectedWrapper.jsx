import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../contexts/UserContext";
import { AxiosDataContext } from "../contexts/AxiosContext";
import Loading from "../components/Loading";
import callLogout from "../utils/callLogout";

const UserProtectedWrapper = ({ children }) => {
    const navigate = useNavigate();
    const api = useContext(AxiosDataContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { setUser } = useContext(UserDataContext);
    const { setDiseasesList } = useContext(UserDataContext);
    useEffect(() => {
        api.get('/users/profile', {
            headers:{
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            if (response.status === 200) {
                setUser(response.data);
                setIsAuthenticated(true);
                console.log("Authenticated!")
            }
        }).catch(err => {
            if (err?.status === 500 || err?.code === "ERR_NETWORK") {
                navigate('/');
            }
            else {
                callLogout(api, navigate);
                navigate('/login', { replace: true });
            }
        }).finally(() => {
            setIsLoading(false);
        })
    }, [navigate, setUser, setDiseasesList, setIsAuthenticated])
    useEffect(()=>{
        api.get('/diseases/fetchOnePatientAllDiseases', {
            headers:{
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            setDiseasesList(response.data.diseasesList);
            console.log("Disease")
        })
        .catch(err => {
        })
    }, [])
    if (isLoading) return <Loading />
    if (!isAuthenticated) return null;
    return (
        <>
            {children}
        </>
    )
}

export default UserProtectedWrapper
