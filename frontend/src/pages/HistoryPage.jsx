import { useContext, useEffect, useState } from "react";
import { AxiosDataContext } from "../contexts/AxiosContext";
import ExamineCard from "../components/ExamineCard";
import Loading from "../components/Loading";
const HistoryPage = () => {
    const [diseasesList, setDiseasesList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const api = useContext(AxiosDataContext);
    useEffect(()=>{
        api.get(`/diseases/fetchOnePatientAllDiseases`)
        .then(response =>{
            setDiseasesList(response.data.diseasesList);
            setIsLoading(false);
        }).catch(err =>{
            setIsLoading(false);
        })
    }, [])
    if(isLoading) return <Loading/>
    return (
        <>
            <div className="w-full text-center text-3xl mb-10">History</div>
            <div className="flex flex-1 flex-wrap gap-5 justify-center md:justify-start">
            {
                diseasesList.map((disease)=>{
                    const date = new Date(disease.date)
                    return (
                        <ExamineCard key = {disease._id}
                            id = {disease._id}
                            image={disease.image}
                            title={disease.name}
                            description={disease.description}
                            date={disease.date}
                        />
                    )
                })
            }
            </div>
        </>
    )
}

export default HistoryPage