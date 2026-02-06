const callLogout = (api, navigate) => {
    api.get(`/users/logout`).then(()=>{
        localStorage.removeItem('token')
        navigate('/login');
    })
}

export default callLogout;