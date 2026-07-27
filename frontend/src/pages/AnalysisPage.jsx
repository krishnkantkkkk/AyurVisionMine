import { useContext, useEffect, useState } from 'react'
import { AxiosDataContext } from '../contexts/AxiosContext';
import { UserDataContext } from '../contexts/UserContext';
import Loading from '../components/Loading'

const AnalysisPage = ({ id }) => {
    const [disease, setDisease] = useState(null);
    const api = useContext(AxiosDataContext);
    const { diseasesList } = useContext(UserDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (Array.isArray(diseasesList) && diseasesList.length > 0) {
            const cached = diseasesList.find(d => String(d._id) === String(id));
            if (cached) {
                setDisease(cached);
                setIsLoading(false);
                return;
            }
        }

        api.get(`/diseases/fetchOne/${id}`)
        .then(response => {
            setDisease(response.data.disease);
        }).catch(err => {
            console.error(err);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [id, diseasesList, api]);

    if (isLoading) return <Loading />
    if (!disease) return <div className="h-full w-full flex justify-center items-center">Analysis Not Found</div>

    return (
        <div className='h-full w-full flex flex-col items-center md:items-start md:flex-row tracking-tight'>
            <div className="w-1/4 min-w-70 max-w-full h-fit md:h-full justify-center rounded-3xl flex flex-col mb-10 md:mb-0">
                <div className="w-full p-3 shadow-xs rounded-3xl shadow-brand-beige">
                    <img className='h-60 md:h-80 w-full object-cover rounded-3xl' src={disease.image} alt={disease.name || "Disease"} />
                    <div className="w-full text-center md:text-2xl p-2">{disease.name}</div>
                </div>
            </div>
            <div className="hidden md:block h-full w-0.5 bg-linear-to-b from-white via-brand-beige to-white mx-5"></div>
            <div className="h-full flex-1 flex flex-col gap-10 py-10">
                <div className="">
                    <div className="text-3xl font-bold uppercase text-brand-accentDark mb-5">Causes</div>
                    <div className="flex gap-2 flex-wrap justify-center md:justify-start">
                        {
                            disease.causes && disease.causes.length > 0
                                ? disease.causes.map((cause, i) => (
                                    <div key={i} className='border border-brand-accent p-5 flex flex-col items-center justify-center w-3/10 min-w-55 rounded-md'>{cause}</div>
                                ))
                                : <div className="text-gray-500">No causes listed</div>
                        }
                    </div>
                </div>
                <div className="">
                    <div className="text-3xl font-bold uppercase text-brand-accentDark mb-5">Home Remedies</div>
                    <div className="flex gap-2 flex-wrap justify-center md:justify-start">
                        {
                            disease.home_remedies && disease.home_remedies.length > 0
                                ? disease.home_remedies.map((remedy, i) => (
                                    <div key={i} className='border border-brand-accent p-5 flex flex-col items-center justify-center w-3/10 min-w-55 rounded-md'>
                                        <div className="text-xl font-medium">{remedy.remedy}</div>
                                        <div className="">{remedy.process}</div>
                                    </div>
                                ))
                                : <div className="text-gray-500">No home remedies listed</div>
                        }
                    </div>
                </div>
                <div className="">
                    <div className="text-3xl font-bold uppercase text-brand-accentDark mb-5">Suggestions</div>
                    <div className="flex gap-2 flex-wrap justify-center md:justify-start">
                        {
                            disease.suggestions && disease.suggestions.length > 0
                                ? disease.suggestions.map((suggestion, i) => (
                                    <div key={i} className='border border-brand-accent p-5 flex flex-col items-center justify-center w-3/10 min-w-55 rounded-md'>{suggestion}</div>
                                ))
                                : <div className="text-gray-500">No suggestions listed</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnalysisPage