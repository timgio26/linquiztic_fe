import { useState } from "react";
import { useNavigate } from "react-router";
import { signinApi, signupApi } from "../services/api";

export function Auth() {
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const [isLoading,setIsLoading] = useState<boolean>(false)
  const [name,setName] = useState<string>("") 
  const [email,setEmail] = useState<string>("") 
  const navigate = useNavigate()

  async function Signup() {
    setIsLoading(true);
    await signupApi(name,email)
    setIsLoading(false);
  }

  async function Signin(){
    setIsLoading(true)
    const loginStatus = await signinApi(email)
    if(loginStatus){
      navigate('/',{replace:true})
    }
    setIsLoading(false);
  }


  return (
    <div className="flex flex-col h-full justify-around">
      <div className="flex flex-row justify-center">
        <div  className="flex flex-row gap-2 px-3 py-0.5 border my-1">
        <div className={`px-3 py-0.5 ${!isLogin&&"bg-gray-400"}`} onClick={()=>setIsLogin(false)}>
          <span>Register</span>
        </div>
        <div className={`px-3 py-0.5 ${isLogin&&"bg-gray-400"}`} onClick={()=>setIsLogin(true)}>
          <span>Log In</span>
        </div>

        </div>
      </div>
      {isLogin ? (
        <div className="flex flex-col">
          <label htmlFor="emailLogin">email</label>
          <input
            type="email"
            id="emailLogin"
            name="emailLogin"
            className="border-b focus:outline-none"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <button className="w-full py-1.5 border my-2" onClick={Signin}>{!isLoading? "Login":"Loading..."}</button>
        </div>
      ) : (
        <div className="flex flex-col">
          <label htmlFor="name">name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="border-b focus:outline-none"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
          <label htmlFor="email">email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="border-b focus:outline-none"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <button className="w-full py-1.5 border my-2" onClick={Signup}>{!isLoading?"Register":"Loading..."}</button>
        </div>
      )}
    </div>
  );
}
