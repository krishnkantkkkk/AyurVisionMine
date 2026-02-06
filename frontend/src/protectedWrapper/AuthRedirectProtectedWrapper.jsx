import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthRedirectProtectedWrapper = ({children}) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(()=>{
      if(token) navigate('/user', {replace : true});
    })
    if(token) return null;
  return (
    <>
      {children}
    </>
  )
}

export default AuthRedirectProtectedWrapper