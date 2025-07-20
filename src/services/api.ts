import axios from "axios";
import { toast } from "react-toastify";
import {loginSchema, WordMeaningSchema} from "./Types"
import { AiNewWordFeedbackSchema } from "./LinquizticAi";
// import { data } from "react-router";

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
  try {
    const response = await axios.get(`/api/getUserLanguage/${id}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error
    };
  }
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

export async function signupApi(name:string,email:string,firebaseId:string){
  try {
    const response = await axios.post(`/api/signup`, {name,email,firebaseId})
    return {
      status:response.status,
      data:response.data
    }
  } catch {
    return {
      status:500,
      data:null
    }
  }
}

export async function signinApi(email:string){
  let status=false;
  let response
  
  try {
    response = await axios.post(`/api/signin`, {email})
  } catch {

    toast.error("wrong email");
    return;
  }

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
    toast.error("cant get new words. try again later");
    return null
  }
  const parsed = AiNewWordFeedbackSchema.safeParse(response.data)
  if(!parsed.success){
    toast.error("cant get new words. try again later");
    return null
  }
  return parsed;
}

export async function getWordMeaningApi(word:string,language:string){
    const response = await axios.get(`/api/getWordMeaning?word=${word}&language=${language}`)
    // console.log(response)
    if(response.status !== 200){
      toast.error("cant get word meaning. try again later");
      return null
    }
    const parsed = WordMeaningSchema.safeParse(response.data)
    // console.log(parsed)
    if(!parsed.success){
      toast.error("cant get word meaning. try again later");
      return null
    }
    return parsed;
  }

  export async function deleteAccountApi(id:string){
    const response = await axios.delete(`/api/deleteUser/${id}`)
    return response
  }