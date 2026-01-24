import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AnalysisPage = ({id}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [disease, setDisease] = useState({});
    useEffect(()=>{
        axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/diseases/create`, {
            name : "Alchimosis",
            description : "This is the disease."
        }, {
            headers : {
                Authorization : `Bearer ${localStorage.token}`
            }
        }).then(response =>{
            console.log(response.data)
            setDisease(response.data);
            setIsLoading(false);
        }).catch(err=>{
            setIsLoading(false);
            console.log(err);
        })
    }, [setDisease])
    if(isLoading) <div className="w-full h-full justify-center items-center">Loading...</div>
  return (
    <div>{disease.name}</div>
  )
}

export default AnalysisPage