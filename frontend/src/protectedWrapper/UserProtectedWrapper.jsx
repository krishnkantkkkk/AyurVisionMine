import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../contexts/UserContext";
import { AxiosDataContext } from "../contexts/AxiosContext";
import Loading from "../components/Loading";

const UserProtectedWrapper = ({children})=>{
    const navigate = useNavigate();
    const api = useContext(AxiosDataContext);
    const token = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(true);
    const {setUser} = useContext(UserDataContext);
    useEffect(()=>{
        if(!token){
            navigate('/login');
        }
        api.get('/users/profile', {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }).then(response =>{
            if(response.status === 200){
                setUser(response.data);
                setIsLoading(false);
            }
        }).catch(err=>{
            setIsLoading(false);
            localStorage.removeItem('token');
            navigate('/login', {replace : true});
        })
    },[token, navigate, setUser])
    if(!token) return null;

    if(isLoading) return <Loading/>
    return(
        <>
            {children}
        </>
    )
}

export default UserProtectedWrapper