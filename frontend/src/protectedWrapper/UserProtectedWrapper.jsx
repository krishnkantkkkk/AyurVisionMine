import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../contexts/UserContext";

const UserProtectedWrapper = ({children})=>{
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(true);
    const {setUser} = useContext(UserDataContext);
    useEffect(()=>{
        if(!token){
            navigate('/login');
        }
        axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/users/profile`, {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }).then(response =>{
            if(response.status === 200){
                setUser(response.data);
                setIsLoading(false);
            }
        }).catch(err=>{
            localStorage.removeItem('token');
            navigate('/login', {replace : true});
        })
    },[token, navigate, setUser])
    if(!token) return null;

    if(isLoading) return <div className="flex h-full w-full justify-center items-center">Loading...</div>
    return(
        <>
            {children}
        </>
    )
}

export default UserProtectedWrapper