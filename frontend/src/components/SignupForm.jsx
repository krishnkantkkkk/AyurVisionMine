import { ArrowLeft } from "lucide-react"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { UserDataContext } from "../contexts/UserContext"
import { AxiosDataContext } from "../contexts/AxiosContext"
import Loading from "./Loading"
const SignupForm = ()=>{
    const navigate = useNavigate();
    const [formData, setFormData] = useState({firstName : '', lastName : '', email : '', password : ''});
    const [errorMessage, setErrorMessage] = useState("");
    const api = useContext(AxiosDataContext);
    const {setUser} = useContext(UserDataContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e)=>{
        setIsLoading(true);
        e.preventDefault();
        setFormData({firstName : '', lastName : '', email : '', password : ''});
        api.post('users/register', formData)
        .then(response =>{
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
            navigate('/user');
        })
        .catch(err =>{
            setErrorMessage(err.response.data.message);
        })
        .finally(()=>{
            setIsLoading(false);
        })
    }

    if(isLoading) return <div className="absolute h-full w-full bg-white top-0 left-0"><Loading/></div>

    return(
        <div className="w-full flex-1 bg-brand-accent flex flex-col rounded-[10px] md:rounded-4xl overflow-hidden shadow-xl">
            <div className="p-5 h-50 flex justify-between items-center">
                <Link to='/login'><ArrowLeft style={{color:'white'}} className="md:hidden"/></Link>
                <h1 className="text-3xl text-center text-white">Sign Up</h1>
                <div className=""></div>
            </div>
            <form onSubmit={(e) =>{handleSubmit(e)}} action="" className="flex-1 flex flex-col justify-between items-center rounded-tl-[5rem] p-10 bg-white text-black">
                <div className=""></div>
                <div className="h-10 text-red-400">{errorMessage}</div>
                <div className="flex flex-col h-full justify-center gap-3">
                    <div className="flex flex-col px-3 py-2 rounded-xl justify-center border border-brand-neu">
                        <label>First Name</label>
                        <input value={formData.firstName} onChange={(e)=>{
                            let copyData = {...formData};
                            copyData.firstName = e.target.value;
                            setFormData(copyData);
                        }} className="outline-none w-[100%] py-2" type="text" placeholder="John" required/>
                    </div>
                    <div className="flex flex-col px-3 py-2 rounded-xl justify-center border border-brand-neu">
                        <label>Last Name</label>
                        <input value={formData.lastName} onChange={(e)=>{
                            let copyData = {...formData};
                            copyData.lastName = e.target.value;
                            setFormData(copyData);
                        }} className="outline-none w-[100%] py-2" type="text" placeholder="Doe" required/>
                    </div>
                    <div className="flex flex-col px-3 py-2 rounded-xl justify-center border border-brand-neu">
                        <label>Email</label>
                        <input value={formData.email} onChange={(e)=>{
                            let copyData = {...formData};
                            copyData.email = e.target.value;
                            setFormData(copyData);
                        }} className="outline-none w-[100%] py-2" type="text" placeholder="example@email.com" required/>
                    </div>
                    <div className="flex flex-col px-3 py-2 rounded-xl justify-center border border-brand-neu">
                        <label>Password</label>
                        <input value={formData.password} onChange={(e)=>{
                            let copyData = {...formData};
                            copyData.password = e.target.value;
                            setFormData(copyData);
                        }} className="outline-none w-[100%] py-2" type="password" placeholder="*****" required/>
                    </div>
                    <button className="w-full bg-brand-accent text-white p-3 rounded-xl rounded-tr-none">Sign Up</button>
                </div>
                <div className="md:opacity-0">
                    Already have an account? <Link to='/login' className="text-brand-dark">Sign In</Link>
                </div>
            </form>
        </div>
    )
}

export default SignupForm