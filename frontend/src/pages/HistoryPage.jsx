import { useContext } from "react";
import ExamineCard from "../components/ExamineCard";
import { UserDataContext } from "../contexts/UserContext";
const HistoryPage = () => {
    const {diseasesList} = useContext(UserDataContext);
    return (
        <div className="h-full w-full flex flex-col">
            <div className="w-full text-center text-3xl mb-10 uppercase font-semibold">History</div>
            <div className="w-full flex-1 flex flex-wrap gap-5 justify-center md:justify-start">
            {
                diseasesList.length > 0 ? diseasesList.map((disease)=>{
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
                }) : <div className="h-full w-full flex justify-center items-center">Nothing Yet...</div>
            }
            </div>
        </div>
    )
}

export default HistoryPage