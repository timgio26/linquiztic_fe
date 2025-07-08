import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { FlashCardSchema, Language, LanguageSchema } from "../services/Types";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
import { deleteWord, getUserLanguageDetailApi } from "../services/api";

export function FlashCard() {
  const [allWords, setAllWords] = useState<Language>();
  const [refresh, setRefresh] = useState<boolean>();
  const [hiddenOnDel, setHiddenOnDel] = useState<boolean>(false);
  const [delId, setDelId] = useState<number>();
  const location = useLocation();
  const navigate = useNavigate();

  function trigerDelConfirm(id: number) {
    setDelId(id);
    setHiddenOnDel(true);
  }

  async function handleDelete(id: string | number) {
    await deleteWord(id);
    setRefresh((curState) => !curState);
    setHiddenOnDel(false);
  }

  useEffect(() => {
    async function getMyVocab() {
      const parseResult = FlashCardSchema.safeParse(location.state);
      if (parseResult.success) {
        const resp = await getUserLanguageDetailApi(
          parseResult.data.userLanguageId
        );
        if (resp.status == 200) {
          const parsedData = LanguageSchema.safeParse(resp.data);
          if (parsedData.success) setAllWords(parsedData.data);
        }
      }
    }
    getMyVocab();
  }, [location, refresh]);

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <h1 className="text-3xl my-9">Flash Card</h1>
      </div>

      <div className="flex-1 overflow-y-scroll">
        <div hidden={hiddenOnDel}>
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
                {/* <div className="my-9" onClick={() => navigate("/newwords")}>
              <div className="border px-5 py-2 my-1">Get New Words</div>
            </div> */}
              </>
            )
          )}

          {allWords && (
            <div>
              <div>
                {allWords.words?.map((each) => (
                  <div
                    className="flex justify-between px-5 py-2 border rounded my-0.5"
                    key={each.id}
                  >
                    <span>{each.wordText}</span>
                    <div onClick={() => trigerDelConfirm(each.id)}>
                      <span>❌</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div hidden={!hiddenOnDel}>
          Delete this word
          <div className="grid grid-cols-2 gap-2">
            <div
              className="border px-5 py-2 my-1"
              onClick={() => setHiddenOnDel(false)}
            >
              Cancel
            </div>
            {delId && (
              <div
                className="border px-5 py-2 my-1 bg-black text-white"
                onClick={() => handleDelete(delId)}
              >
                Confirm
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="my-5" onClick={() => navigate("/newwords")}>
        <div className="border px-5 py-2 my-1">Get New Words</div>
      </div>
    </div>
  );
}
