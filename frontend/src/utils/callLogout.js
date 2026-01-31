const callLogout = (api, navigate) => {
    api.get(`/users/logout`).then(response=>{
        localStorage.removeItem('isLoggedIn');
        navigate('/');
    })
}

export default callLogout;