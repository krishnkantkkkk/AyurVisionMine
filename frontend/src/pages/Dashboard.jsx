import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
const Dashboard = ()=>{
    return(
        <div className="flex w-full h-full pl-[70px] md:pl-[100px]">
            <Sidebar/>
            <div className="w-full h-full p-5 overflow-y-auto">
                <Outlet/>
            </div>
        </div>
    )
}

export default Dashboard;