import { useContext, useEffect, useState } from "react"
import avatar from "../assets/avatar.jpg"
import { UserDataContext } from "../contexts/UserContext"
import axios from "axios";
const ProfilePage = () => {
    const {user, setUser} = useContext(UserDataContext);
    const [formData, setFormData] = useState(user);
    const token = localStorage.getItem('token')
    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/users/update`, formData, {
            headers : {
                Authorization : `Bearer ${token}`
            },
        }).then(response =>{
            setUser(response.data);
        }).catch(err =>{
            console.log(err);
        })
    }
    return (
        <div className="w-full h-full flex flex-col justify-start md:justify-between">
            <div className="w-full flex justify-center text-3xl">Profile</div>
            <form onSubmit={(e)=>{handleSubmit(e)}} className="w-full z-10 flex flex-col gap-1 items-center justify-center md:gap-2">
                <div className="">
                    <p>First Name</p>
                    <input onChange={(e)=>{
                        let copyFormData = {...formData};
                        copyFormData.firstName = e.target.value;
                        setFormData(copyFormData);
                    }} className="w-full p-3 rounded-lg max-w-90 bg-brand-light" type="text" defaultValue={user.firstName}/>
                </div>
                <div className="">
                    <p>Last Name</p>
                    <input onChange={(e)=>{
                        let copyFormData = {...formData};
                        copyFormData.lastName = e.target.value;
                        setFormData(copyFormData);
                    }} className="w-full p-3 rounded-lg max-w-90 bg-brand-light" type="text" defaultValue={user.lastName}/>
                </div>
                <div className="">
                    <p>Age</p>
                    <input onChange={(e)=>{
                        let copyFormData = {...formData};
                        copyFormData.age = e.target.value;
                        setFormData(copyFormData);
                    }} className="w-full p-3 rounded-lg max-w-90 bg-brand-light" type="text" defaultValue={user.age}/>
                </div>
                <div className="">
                    <p>Email</p>
                    <input className="w-full p-3 rounded-lg max-w-90 bg-brand-light opacity-70" type="text" defaultValue={user.email} disabled/>
                </div>
                <button className="mt-5 bg-brand-accent text-white py-3 px-5 rounded-xl">Update</button>
            </form>
            <div className=""></div>
            <img className="z-10 absolute top-[60%] md:top-[42%] md:right-[5%] right-[12%] h-52 w-52 rounded-full border-[10px] border-brand-beige object-cover object-top" src={avatar} alt="" />
            <div className="z-0 absolute top-0 -right-1 h-full max-w-[70%] opacity-5">
                <svg className="h-full" viewBox="0 0 188 456" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>
                <svg 
                    className="absolute right-0 top-0 h-full max-w-[80%]" 
                    viewBox="0 0 188 456" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <clipPath id="myClip">
                            <path d="M144.696 0C-33.996 183.077 -61.9621 283.702 144.696 456H187.696V0H144.696Z"/>
                        </clipPath>
                    </defs>
                    <rect 
                        width="188" 
                        height="456" 
                        fill="#D4956E"
                        clipPath="url(#myClip)"
                    />
                </svg>
            </div>

        </div>
    )
}

export default ProfilePage