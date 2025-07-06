import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../app/hook";
import { AiNewWordFeedback, getAiNewVocab } from "../services/LinquizticAi";
// import UseAnimations from "react-useanimations";
// import loading from "react-useanimations/lib/loading";
// import { useNavigate } from "react-router";

export function NewWords() {
  const {language} = useAppSelector((state) => state.language);
  const [loadingWord, setLoadingWord] = useState<boolean>(false);
  const [newWords, setNewWords] = useState<AiNewWordFeedback|undefined>();
  const [step,setStep] = useState<number>(0)
  
  
  const getNewVocab = useCallback(async () => {
    setLoadingWord(true);
    const resp = await getAiNewVocab(language, "a1");
    if (resp.success) setNewWords(resp.data);
    setLoadingWord(false);
  },[language]);
  
  useEffect(() => {
    getNewVocab()
  }, [getNewVocab]);

  function nextWord(){
    if(newWords && step == newWords.length-1) return
    setStep((curstate)=>curstate+1)
  }

  function prevWord(){
    if(step == 0) return
    setStep((curstate)=>curstate-1)
  }

  return (
    <div className="h-full flex flex-col justify-between">
      <span className="text-3xl my-9">New Words</span>
      {loadingWord ? (
        <div className="h-full flex items-center justify-center">
          {/* <UseAnimations animation={loading} size={55} /> */}
          <span>Loading</span>
        </div>
       ):(
        <div className="h-full py-11 shadow">
          <div className="border flex flex-col h-full px-3 justify-around rounded-2xl bg-gray-100">
            <div className="flex flex-col items-center gap-3">
              <span className="text-6xl font-light">{newWords&&newWords[step].word}</span>
              <span className="text-3xl font-bold">{newWords&&newWords[step].meaning}</span>

            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="border rounded-full px-4 text-center text-2xl" onClick={prevWord}>previous</div>
              <div className="bg-black rounded-full text-white px-4 text-center text-2xl" onClick={nextWord}>next</div>
            </div>

          </div>
        </div>
       )} 
    </div>
  );
}
