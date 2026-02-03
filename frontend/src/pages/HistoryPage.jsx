import { useContext } from "react";
import ExamineCard from "../components/ExamineCard";
import { UserDataContext } from "../contexts/UserContext";
const HistoryPage = () => {
    const {diseasesList} = useContext(UserDataContext);
    return (
        <>
            <div className="w-full text-center text-3xl mb-10">History</div>
            <div className="flex flex-1 flex-wrap gap-5 justify-center md:justify-start">
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
                }) : ""
            }
            </div>
        </>
    )
}

export default HistoryPage