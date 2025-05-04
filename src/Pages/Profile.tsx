import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export function Profile() {
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const [isLoading,setIsLoading] = useState<boolean>(false)
  const [name,setName] = useState<string>("") 
  const [email,setEmail] = useState<string>("") 

  async function Signup() {
    setIsLoading(true);
    await axios.post(`${import.meta.env.VITE_BE_URL}/api/values`, {name,email})
      .then((resp) => {
        if (resp.status == 200) toast.success("registered, please login");
        else toast.error("cant register.  try again later");
      })
      .catch(() => toast.error("cant register. try again later"));
    setIsLoading(false);
  }

  async function Signin(){
    setIsLoading(true)
    await axios.post(`${import.meta.env.VITE_BE_URL}/api/values/signin`, {email})
    .then((resp) => {
      if (resp.status == 200){ 
        console.log(resp.data)
      }
      else toast.error("cant register.  try again later");
    })
    .catch(() => toast.error("cant register. try again later"));
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
