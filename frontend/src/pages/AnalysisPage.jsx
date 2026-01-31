import { useContext, useEffect, useState } from 'react'
import { AxiosDataContext } from '../contexts/AxiosContext';
import Loading from '../components/Loading'

const AnalysisPage = ({id}) => {
    const [disease, setDisease] = useState({});
    const api = useContext(AxiosDataContext);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() =>{
        setIsLoading(true);
        api.get(`/diseases/fetchOne/${id}`).then(response =>{
            setDisease(response.data.disease);
            setIsLoading(false);
        }).catch(err =>{
            console.log(err);
            setIsLoading(false);
        })
    }, [])
    if(isLoading) return <Loading/>
  return (
    <div>
        <img src={disease.image}/>
        {disease.name}
    </div>
  )
}

export default AnalysisPage