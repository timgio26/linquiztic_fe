import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { FlashCardSchema, Language, LanguageSchema } from "../services/Types";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";


export function FlashCard() {
  const [allWords, setAllWords] = useState<Language>();
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    async function getMyVocab() {
      // setLoading(true)
      const parseResult = FlashCardSchema.safeParse(location.state);
      if (parseResult.success) {
        await axios
          .get(
            `${import.meta.env.VITE_BE_URL}/api/values/getLanguage/${
              parseResult.data.userLanguageId
            }`
          )
          .then((resp) => {
            const parsedData = LanguageSchema.safeParse(resp.data);
            if (parsedData.success) setAllWords(parsedData.data);
          })
          .catch(() => console.log("error"))
          .finally();
      }
    }
    getMyVocab();
  }, [location]);

  return (
    <div className="h-full flex flex-col justify-between">
      <h1 className="text-3xl my-9">Flash Card</h1>

      {!allWords ? (
        <div className="h-full flex items-center justify-center">
          <UseAnimations animation={loading} size={55} />
        </div>
      ) : (
        !allWords.words?.length && (
          <>
            <div>
              <span className="text-7xl">no word found</span>
            </div>
            <div className="my-9" onClick={()=>navigate('/newwords')}>
              <div className="border px-5 py-2 my-1">Get New Words</div>
            </div>
          </>
        )
      )}
    </div>
  );
}
