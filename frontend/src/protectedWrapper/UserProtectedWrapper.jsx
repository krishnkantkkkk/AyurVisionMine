import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../contexts/UserContext";
import { AxiosDataContext } from "../contexts/AxiosContext";
import Loading from "../components/Loading";
import callLogout from "../utils/callLogout";

const UserProtectedWrapper = ({ children }) => {
    const navigate = useNavigate();
    const api = useContext(AxiosDataContext);
    const { isAuthenticated, setIsAuthenticated, setUser, setDiseasesList, authLoading } = useContext(UserDataContext);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            callLogout(api, navigate, { setIsAuthenticated, setUser, setDiseasesList });
        }
    }, [authLoading, isAuthenticated, api, navigate, setIsAuthenticated, setUser, setDiseasesList]);

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

    if (authLoading) return <Loading />
    if (!isAuthenticated) return null;
    return (
        <>
            {children}
        </>
    )
}

export default UserProtectedWrapper;
