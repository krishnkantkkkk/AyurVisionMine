const ExamineCard = (props) => {
    return (
        <div className="w-50 h-75 bg-white rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-2 flex flex-col gap-3 cursor-pointer">
            <div className="rounded-xl h-45 bg-brand-lighter">
                <img className="h-full w-full object-cover object-top rounded-xl" src={props.image}/>
            </div>
            <div className="flex flex-col flex-1 justify-between items-center">
                <span>{props.title}</span>
                <span className="text-xs text-center">{props.description}</span>
                <span className="opacity-60 text-xs">{props.date}</span>
            </div>
        </div>
    )
}

export default ExamineCard