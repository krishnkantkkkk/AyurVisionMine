const callLogout = (api, navigate, userContext = {}) => {
    const { setIsAuthenticated, setUser, setDiseasesList } = userContext;
    api.get(`/users/logout`).catch(() => {}).finally(() => {
        if (typeof setIsAuthenticated === 'function') setIsAuthenticated(false);
        if (typeof setUser === 'function') setUser({});
        if (typeof setDiseasesList === 'function') setDiseasesList([]);
        navigate('/login', { replace: true });
    });
}

export default callLogout;