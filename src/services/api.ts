import axios from "axios";

export async function addWord(wordText: string, userLanguageId: string) {
  const response = await axios.post("/api/addWord", { wordText, userLanguageId })
  return response.status
}
