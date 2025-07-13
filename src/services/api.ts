import axios from "axios";
import { toast } from "react-toastify";
import {loginSchema} from "./Types"
import { AiNewWordFeedbackSchema } from "./LinquizticAi";

export async function addWord(wordText: string, userLanguageId: string) {
  const response = await axios.post("/api/addWord", { wordText, userLanguageId })
  return response.status
}

export async function deleteWord(id:string|number){
  const response = await axios.delete(`/api/deleteWord/${id}`)
  // console.log(response)
  if(response.status!=200){
    toast.error("cant delete word")
  }
}

export async function getUserLanguageApi(){
  const id = sessionStorage.getItem("id");
  const response = await axios.get(`/api/getUserLanguage/${id}`)
  return response
}

export async function addLanguageApi(language:string,level:string){
  const userId = sessionStorage.getItem("id");
  const response = await axios.post(`/api/addLanguage`, {language,level,userId,})
  return response
}

export async function getUserLanguageDetailApi(userLanguageId:string){
  const response =await axios.get(`/api/getLanguage/${userLanguageId}`)
  return response
}

export async function signupApi(name:string,email:string){
  const response = await axios.post(`/api/signup`, {name,email})
  if (response.status == 200) toast.success("registered, please login");
  else toast.error("cant register.  try again later");
}

export async function signinApi(email:string){
  let status=false;
  const response = await axios.post(`/api/signin`, {email})
  if(response.status==200){
    const parsed = loginSchema.safeParse(response.data)
    if (!parsed.success) {
          toast.error("cant log in. try again later");
    }else{
      sessionStorage.setItem("id", parsed.data.id);
      status=true;
      return status;
    }
  }
  return status;
}

export async function getNewWordsApi(id:string){
  const response = await axios.get(`/api/getNewWords?userLangId=${id}`)
  if(response.status !== 200){
    toast.error("cant get new words.  try again later");
    return null
  }
  const parsed = AiNewWordFeedbackSchema.safeParse(response.data)
  if(!parsed.success){
    toast.error("cant get new words.  try again later");
    return null
  }
  return parsed;
}