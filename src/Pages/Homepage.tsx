import { useEffect, useState } from "react";
import { AiFeedback, fetchAiResponse } from "../services/LinquizticAi";
import { toast } from "react-toastify";
import { LanguageList, LanguageListSchema } from "../services/Types";
import { useNavigate } from "react-router";
import hp1 from "../assets/hp1.jpg";
import hp2 from "../assets/hp2.jpg";
import hp3 from "../assets/hp3.jpg";
import { useAppDispatch } from "../app/hook";
import { setLanguage } from "../features/languageSlice";
import { addLanguageApi, getUserLanguageApi } from "../services/api";

export function Homepage() {
  const [language, setlanguage] = useState<string>();
  const [isPlacement, setIsPlacement] = useState<boolean>(false);
  const languages = ["Norwegian", "Dutch", "Spanish"];
  const [userText, setUserText] = useState<string>();
  const [aiFeedback, setAiFeedback] = useState<AiFeedback>();
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [userLanguages, setUserLanguages] = useState<LanguageList>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getUserLanguage() {
      const resp = await getUserLanguageApi();
      if (resp.status == 200) {
        const parseResult = LanguageListSchema.safeParse(resp.data);
        setUserLanguages(parseResult.data);
      }
    }
    getUserLanguage();
  }, []);

  async function getAiFeedback() {
    if (!userText || !language) {
      return;
    }
    setIsLoading(true);
    const resp = await fetchAiResponse(userText, language);
    if (resp && resp.feedback !== "not valid") {
      setAiFeedback(resp);
    } else {
      toast.dark("something wrong", { position: "top-center" });
    }
    setIsLoading(false);
  }

  async function addLanguage() {
    setIsLoading(true);
    const userId = sessionStorage.getItem("id");
    if (!aiFeedback || !userId || !language) {
      setIsLoading(false);
      return;
    }
    const resp = await addLanguageApi(language, aiFeedback.proficiencyLevel);
    if (resp.status == 200) {
      toast.success("language added");
    } else {
      toast.error("cant add language. try again later");
    }
    setIsLoading(false);
    window.location.reload();
  }

  function goToFlashCard() {
    if (!userLanguages) return;
    const userLanguage = userLanguages.filter(
      (each) => each.language == language
    );
    if (userLanguage.length) {
      navigate("/flashcard", { state: { userLanguageId: userLanguage[0].id } });
    }
  }

  return (
    <>
      <div
        className={`${
          language ? "hidden" : ""
        } h-full flex flex-col justify-between`}
      >
        <h1 className="text-3xl my-9">what do you want to learn today</h1>
        <img src={hp1} alt="first homepage image" />
        <div className="my-9">
          {languages.map((each) => (
            <div
              key={each}
              className={`border px-5 py-2 my-1 ${
                language == each ? "border-amber-500" : ""
              } justify-between flex`}
              onClick={() => {
                setlanguage(each);
                dispatch(
                  setLanguage({
                    language: each,
                    language_id:
                      userLanguages?.find((lan) => lan.language === each)?.id ||
                      "",
                  })
                );
              }}
            >
              <span>{each}</span>
              <span>
                {
                  userLanguages?.filter(
                    (userLan) => userLan.language == each
                  )[0]?.level
                }
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`${
          language && !isPlacement ? "" : "hidden"
        } h-full flex flex-col justify-between`}
      >
        <h1 className="text-3xl my-9">How you want to start</h1>
        <img src={hp2} alt="second homepage image" />
        <div className="my-9">
          <div
            className="border px-5 py-2 my-1"
            onClick={() => setIsPlacement(true)}
            hidden={
              userLanguages &&
              userLanguages.filter((each) => each.language == language).length >
                0
            }
          >
            Placement Test
          </div>
          <div className="border px-5 py-2 my-1" onClick={goToFlashCard}>
            Flash Card
          </div>
          <div className="border px-5 py-2 my-1">Sentence Training</div>
          <button
            className="w-full py-1.5 border"
            onClick={() => setlanguage("")}
          >
            Back
          </button>
        </div>
      </div>

      <div
        className={`${
          isPlacement && !aiFeedback ? "" : "hidden"
        } h-full flex flex-col justify-between`}
      >
        <h1 className="text-3xl my-9">Type anything in {language}</h1>
        <img src={hp3} alt="third homepage image" />
        <div className="my-9">
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
            <button
              className="w-full py-1.5 border bg-black text-white"
              onClick={getAiFeedback}
              disabled={isloading}
            >
              {isloading ? "Loading" : "Submit"}
            </button>
          </div>
        </div>
      </div>

      {aiFeedback && (
        <div className="h-full flex flex-col justify-between">
          <h1 className="text-3xl my-9">Result</h1>
          <div className="text-center my-2">
            <span className="text-9xl">{aiFeedback.proficiencyLevel}</span>
          </div>
          <div>
            <span>{aiFeedback.feedback}</span>
          </div>
          <div className="flex gap-4 my-9">
            <button
              className="w-full py-1.5 border"
              onClick={() => {
                setIsPlacement(true);
                setAiFeedback(undefined);
              }}
            >
              Back
            </button>
            <button
              className="w-full py-1.5 border bg-black text-white"
              onClick={addLanguage}
            >
              {isloading ? "Loading..." : "Next"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
