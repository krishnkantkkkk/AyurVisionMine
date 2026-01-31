import { useEffect } from 'react';
import { replace, useNavigate } from 'react-router-dom';

const AuthRedirectProtectedWrapper = ({children}) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('isLoggedIn');
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