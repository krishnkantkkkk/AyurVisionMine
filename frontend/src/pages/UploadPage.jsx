import axios from "axios";
import { Upload, ArrowRight } from "lucide-react"
import { useContext, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { AxiosDataContext } from "../contexts/AxiosContext";
import { UserDataContext } from "../contexts/UserContext";
import callLogout from "../utils/callLogout";
const UploadPage = () => {
    const fileInputRef = useRef(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const api = useContext(AxiosDataContext);
    const {setDiseasesList} = useContext(UserDataContext)
    const navigate = useNavigate();

    const upload = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setImageUrl(URL.createObjectURL(file));
    }

    const handleSubmit = (e) => {
        setIsLoading(true);
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", imageFile);
        api.post(`/diseases/create`, formData, {
            headers:{
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            setIsLoading(false);
            setDiseasesList(prevDiseases=>[...prevDiseases, response.data.disease])
            navigate(`/user/examine/${response.data.disease._id}`)
        }).catch(err => {
            setIsLoading(false);
            if(err?.response?.status === 401) callLogout(api, navigate);
        })
    }

    if (isLoading) return <div className="flex h-full w-full justify-center items-center">Loading...</div>
    return (
        <div className="flex w-full h-full flex-col md:flex-row justify-center">
            <form onSubmit={(e) => { handleSubmit(e) }} className="w-full flex gap-3 flex-col justify-center items-center md:w-1/2">
                <div className="flex justify-center items-center w-65 h-65 bg-brand-lighter rounded-2xl md:w-[80%] md:h-100 overflow-hidden">
                    {imageUrl ? <img src={imageUrl} className="w-full h-full object-contain opacity-50" /> : ""}
                    <input ref={fileInputRef} className="hidden" accept="image/*" type="file" onChange={(e) => { upload(e) }} />
                    <span onClick={() => { fileInputRef.current.click() }} className="absolute cursor-pointer flex justify-center gap-2 bg-brand-light p-3 rounded-md text-sm hover:bg-brand-beige"><Upload /> {imageUrl != null ? "Change" : "Upload"}</span>
                </div>
                <button className="flex justify-center items-center gap-2 bg-brand-light p-3 rounded-md text-sm cursor-pointer hover:bg-brand-beige">Analyze <ArrowRight size="20px" /> </button>
            </form>
            <div className="rightSide md:flex flex-col gap-5 justify-center w-full hidden md:w-1/2 p-8 md:p-10">
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <h3 className="font-bold text-brand-text text-lg">Lighting Conditions</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="p-4 bg-white rounded-lg">
                            <p className="text-sm font-semibold mb-1">Ideal Lighting</p>
                            <p className="text-xs text-brand-dark">Natural daylight from a window or well-lit room with soft, diffused light</p>
                        </div>
                        <div className="p-4 bg-white rounded-lg">
                            <p className="text-sm font-semibold mb-1">Avoid</p>
                            <p className="text-xs text-brand-dark">Direct sunlight, harsh shadows, flash, or dim indoor lighting</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadPage