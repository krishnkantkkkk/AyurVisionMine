import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { UserDataContext } from "../contexts/UserContext";
const LoginForm = ()=>{

    const [formData, setFormData] = useState({email : '', password : ''});
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserDataContext);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setFormData({email : '', password : ''});
        const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/users/login`;
        try{
            const response = await axios.post(url, formData);
            if(response.status === 201){
                setUser(response.data.user);
                localStorage.setItem('token', response.data.token);
                navigate('/user');
            }
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className="bg-brand-accent flex flex-col flex-1 rounded-4xl">
            <div className="p-5 h-50 flex justify-between items-center">
                <div className=""></div>
                <h1 className="text-3xl text-center text-white">Login</h1>
                <div className=""></div>
            </div>
            <form onSubmit={(e)=>{handleSubmit(e)}} action="" className="w-full flex-3 flex flex-col justify-between items-center rounded-tl-[5rem] p-10 bg-white text-black bg-brand-light">
                <div className=""></div>
                <div className="flex flex-col h-full justify-center gap-3">
                    <div className="flex flex-col mb-5 p-3 rounded-xl">
                        <label>Email</label>
                        <input onChange={(e)=>{
                            let copyData = {...formData};
                            copyData.email = e.target.value;
                            setFormData(copyData);
                        }} className="outline-none w-[100%] py-2" type="text" placeholder="example@email.com" value={formData.email} required/>
                    </div>
                    <div className="flex flex-col mb-5 p-3 rounded-xl">
                        <label>Password</label>
                        <input onChange={(e)=>{
                            let copyData = {...formData};
                            copyData.password = e.target.value;
                            setFormData(copyData);
                        }} className="outline-none w-[100%] py-2" type="password" placeholder="*****" value={formData.password} required/>
                    </div>
                    <button className="w-full bg-brand-accent text-white p-3 rounded-xl rounded-tr-none">Login</button>
                </div>
                <div className="md:opacity-0">
                    Don't have any account? <Link to='/signup' className="text-brand-dark">Sign Up</Link>
                </div>
            </form>
        </div>
    )
}

export default LoginForm