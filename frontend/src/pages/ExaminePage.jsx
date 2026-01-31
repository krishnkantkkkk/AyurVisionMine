import UploadPage from "./UploadPage"
import AnalysisPage from "./AnalysisPage"
import { useParams } from "react-router-dom"

const ExaminePage = () => {
    const params = useParams();
    return (
        <div className="flex flex-col h-full">
           {params.id ? <AnalysisPage id={params.id}/> : <UploadPage/>}
        </div>
    )
}

export default ExaminePage