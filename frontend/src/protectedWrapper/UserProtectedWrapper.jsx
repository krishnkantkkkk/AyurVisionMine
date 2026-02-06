import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../contexts/UserContext";
import { AxiosDataContext } from "../contexts/AxiosContext";
import Loading from "../components/Loading";
import callLogout from "../utils/callLogout";

const UserProtectedWrapper = ({ children }) => {
    const navigate = useNavigate();
    const api = useContext(AxiosDataContext);
    const {isAuthenticated, setIsAuthenticated} = useContext(UserDataContext)
    const [isLoading, setIsLoading] = useState(!isAuthenticated);
    const { setUser } = useContext(UserDataContext);
    const { setDiseasesList } = useContext(UserDataContext);
    useEffect(() => {
        if(!isAuthenticated){
            api.get('/users/profile', {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                if (response.status === 200) {
                    setUser(response.data);
                    setIsAuthenticated(true);
                    console.log("Authenticate")
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
        }
    }, [navigate, setUser, setDiseasesList, setIsAuthenticated])
    useEffect(()=>{
        api.get('/diseases/fetchOnePatientAllDiseases', {
            headers:{
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            setDiseasesList(response.data.diseasesList.reverse());
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
