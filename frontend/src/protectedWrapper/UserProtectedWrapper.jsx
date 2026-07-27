import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../contexts/UserContext";
import { AxiosDataContext } from "../contexts/AxiosContext";
import Loading from "../components/Loading";
import callLogout from "../utils/callLogout";

const UserProtectedWrapper = ({ children }) => {
    const navigate = useNavigate();
    const api = useContext(AxiosDataContext);
    const { isAuthenticated, setIsAuthenticated, setUser, setDiseasesList } = useContext(UserDataContext);
    const [isLoading, setIsLoading] = useState(!isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login', { replace: true });
                return;
            }
            api.get('/users/profile')
            .then(response => {
                if (response.status === 200) {
                    setUser(response.data);
                    setIsAuthenticated(true);
                }
            }).catch(err => {
                if (err?.status === 500 || err?.code === "ERR_NETWORK") {
                    navigate('/');
                } else {
                    callLogout(api, navigate);
                }
            }).finally(() => {
                setIsLoading(false);
            });
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated) {
            api.get('/diseases/fetchOnePatientAllDiseases')
            .then(response => {
                if (Array.isArray(response.data?.diseasesList)) {
                    setDiseasesList(response.data.diseasesList.reverse());
                }
            })
            .catch(() => {});
        }
    }, [isAuthenticated]);

    if (isLoading) return <Loading />
    if (!isAuthenticated) return null;
    return (
        <>
            {children}
        </>
    )
}

export default UserProtectedWrapper;
