import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../contexts/UserContext';
import Loading from '../components/Loading';

const AuthRedirectProtectedWrapper = ({ children }) => {
    const navigate = useNavigate();
    const { isAuthenticated, authLoading } = useContext(UserDataContext);

    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            navigate('/user', { replace: true });
        }
    }, [isAuthenticated, authLoading, navigate]);

    if (authLoading || isAuthenticated) return <Loading />;

    return (
        <>
            {children}
        </>
    );
};

export default AuthRedirectProtectedWrapper