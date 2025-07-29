import { useCallback, useEffect, useState } from "react";
import { getQuizApi } from "../services/api";
import { useLocation } from "react-router";
import {
  FlashCardSchema,
  Quiz as QuizType,
  QuizSchema,
} from "../services/Types";

export function Quiz() {
  const [questions, setQuestions] = useState<QuizType>();
  const location = useLocation();

  const getQuiz = useCallback(
    async(signal:AbortSignal)=>{
      const parseResult = FlashCardSchema.safeParse(location.state);
      if (!parseResult.success) {
        console.log("Error Parse ID");
        return;
      }
      const resp = await getQuizApi(parseResult.data.userLanguageId, signal);
      const parsed = QuizSchema.safeParse(resp.data);
      if (!parsed.success) {
        console.log("error parse");
        return;
      }
      setQuestions(parsed.data)
    },[location.state]
  )

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getQuiz(signal);
    return () => {
      controller.abort();
    };
  }, [getQuiz]);

  return (
    <>
      <div>
        <h1 className="text-3xl my-9">Quiz</h1>
      </div>
      {!questions ? (
        <span>Loading</span>
      ) : (
        <div>
          {questions.map((each) => (
            <div>{each.question}</div>
          ))}
        </div>
      )}
    </>
  );
}
