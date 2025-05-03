import { useState } from "react";
import { AiFeedback, fetchAiResponse } from "../services/LinquizticAi";
import { toast } from 'react-toastify';



export function Homepage() {
  const [language, setlanguage] = useState<string>();
  const [isPlacement, setIsPlacement] = useState<boolean>(false);
  const languages = ["Norwegian", "Dutch", "Spanish"];
  const [userText, setUserText] = useState<string>();
  const [aiFeedback, setAiFeedback] = useState<AiFeedback>();
  const [isloading,setIsLoading] = useState<boolean>(false)

  async function getAiFeedback() {
    if (!userText || !language) {
      return;
    }
    setIsLoading(true)
    const resp = await fetchAiResponse(userText, language);
    if (resp && resp.feedback!=='not valid') {
      setAiFeedback(resp);
    }
    else{ toast.dark("something wrong",{position:"top-center"})}
    setIsLoading(false)
  }

  return (
    <>
      <div className={`${language ? "hidden" : ""}`}>
        <h1 className="text-3xl py-5">what do you want to learn today</h1>
        {languages.map((each) => (
          <div key={each}
            className={`border px-5 py-2 my-1 ${
              language == each ? "border-amber-500" : ""
            }`}
            onClick={() => setlanguage(each)}
          >
            {each}
          </div>
        ))}
      </div>

      <div className={`${language && !isPlacement ? "" : "hidden"}`}>
        <h1 className="text-3xl py-5">How you want to start</h1>
        <div>
          <div
            className="border px-5 py-2 my-1"
            onClick={() => setIsPlacement(true)}
          >
            Placement Test
          </div>
          <div className="border px-5 py-2 my-1">Flash Card</div>
          <div className="border px-5 py-2 my-1">Sentence Training</div>
          <button
            className="w-full py-1.5 border"
            onClick={() => setlanguage("")}
          >
            Back
          </button>
        </div>
      </div>

      <div className={`${isPlacement && !aiFeedback ? "" : "hidden"}`}>
        <h1 className="text-3xl py-5">Type anything in {language}</h1>
        <textarea
          name=""
          id=""
          rows={4}
          className="w-full border p-1"
          placeholder="its ok if you dont know anything. just hit submit button"
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
        />
        <div className="flex gap-4">
          <button
            className="w-full py-1.5 border"
            onClick={() => setIsPlacement(false)}
          >
            Back
          </button>
          <button className="w-full py-1.5 border" onClick={getAiFeedback} disabled={isloading}>
            {isloading?"Loading":"Submit"}
          </button>
        </div>
      </div>
      {aiFeedback && (
        <div>
          <h1 className="text-3xl py-5">Result</h1>
          <div className="text-center my-2">
            <span className="text-5xl">{aiFeedback.proficiencyLevel}</span>
          </div>
          <div>
            <span>{aiFeedback.feedback}</span>
          </div>
          <div className="flex gap-4 my-1">
            <button
              className="w-full py-1.5 border"
              onClick={() => {
                setIsPlacement(true);
                setAiFeedback(undefined);
              }}
            >
              Back
            </button>
            <button className="w-full py-1.5 border">Next</button>
          </div>
        </div>
      )}
    </>
  );
}
