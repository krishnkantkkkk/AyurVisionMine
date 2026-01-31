import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../contexts/UserContext";
import { AxiosDataContext } from "../contexts/AxiosContext";
import Loading from "../components/Loading";

const UserProtectedWrapper = ({children})=>{
    const navigate = useNavigate();
    const api = useContext(AxiosDataContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const {setUser} = useContext(UserDataContext);
    useEffect(()=>{
        api.get('/users/profile')
        .then(response =>{
            if(response.status === 200){
                setUser(response.data);
                setIsAuthenticated(true);
                localStorage.setItem('isLoggedIn', true)
            }
        }).catch(err=>{
            if(err.code === "ERR_NETWORK"){
                console.log("Network Error");
            }
            else{
                localStorage.removeItem('isLoggedIn');
                navigate('/login', {replace : true});
            }
        }).finally(()=>{
            setIsLoading(false);
        })
    },[navigate, setUser])
    if(isLoading) return <Loading/>
    if(!isAuthenticated) return null;
    return(
        <>
            {children}
        </>
    )
}

export default UserProtectedWrapper