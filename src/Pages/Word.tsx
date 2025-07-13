import { useNavigate, useSearchParams } from "react-router"

export function Word(){
    const [searchParams] = useSearchParams();
    const word = searchParams.get('word')
    const navigate = useNavigate()
    return(
        <div>
            <div>
                <div onClick={()=>navigate(-1)}>back</div>
            </div>
            <div className="flex flex-col my-5">
                <span className="text-center font-bold text-5xl">{word}</span>
                <span className="text-center text-5xl">meaning</span>
            </div>
            <span>example</span>
            <div className="flex flex-col my-5">
                <span className="text-center bg-gray-100">example sentence</span>
                <span className="text-center">example meaning</span>
            </div>
        </div>
    )
}