import { UserRound, LogOut, LayoutDashboard, ScanText, History, BadgeQuestionMark, NotebookText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { useState } from "react";
const Sidebar = ()=>{
    const navigate = useNavigate();
    const callLogout = async ()=>{
        try{
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/users/logout`);
            if(response.status === 200){
                localStorage.removeItem('token');
                navigate('/');
            }
        }catch(err){
            console.log(err);
        }
    }
    return(
        <div className="absolute left-0 top-0 w-17.5 bg-brand-accent h-full flex flex-col justify-between items-center py-10 md:w-25">
            <Link to="/user/profile" className="avatar rounded-full bg-brand-light p-3 md:p-4">
                <UserRound/>
            </Link>
            <div className="menus flex flex-col gap-2">
                <Link to="/user/dashboard" className="p-3 hover:text-black"><LayoutDashboard /></Link>
                <Link to="/user/examine" className="p-3 hover:text-black"><ScanText /></Link>
                <Link to="/user/history" className="p-3 hover:text-black"><History /></Link>
            </div>
            <div className="flex flex-col gap-2">
                <div className="p-3 hover:text-black cursor-pointer"><BadgeQuestionMark /></div>
                <div className="p-3 hover:text-black cursor-pointer" onClick={callLogout}><LogOut/></div>
            </div>
        </div>
    )
}

export default Sidebar