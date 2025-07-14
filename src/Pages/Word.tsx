import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router"
import { getWordMeaningApi } from "../services/api";

export function Word(){
    const [meaning,setMeaning] = useState<string>()
    const [sample,setSample] = useState<string>()
    const [sampleTranslate,setSampleTranslate] = useState<string>()
    const [searchParams] = useSearchParams();
    const word = searchParams.get('word')
    const language = searchParams.get('language')
    const navigate = useNavigate()

    useEffect(() => {
        async function getWordMeaning(word: string, language: string) {
        //   console.log(word, language);
          const response = await getWordMeaningApi(word, language);
        //   console.log(response)
          if(!response)return;
          setMeaning(response.data.meaning)
          setSample(response.data.sample_sentence)
          setSampleTranslate(response.data.sample_translation)
        }
      if (!word || !language) {
        navigate("/");
        return;
      }
      getWordMeaning(word, language);
    }, [word,language,navigate]);


    return(
        <div>
            <div>
                <div onClick={()=>navigate(-1)}>back</div>
            </div>
            <div className="flex flex-col my-5">
                <span className="text-center font-bold text-5xl">{word}</span>
                <span className="text-center text-5xl">{meaning}</span>
            </div>
            <span>example</span>
            <div className="flex flex-col my-5">
                <span className="text-center bg-gray-100">{sample}</span>
                <span className="text-center">{sampleTranslate}</span>
            </div>
        </div>
    )
}