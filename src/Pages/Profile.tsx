import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export function Profile() {
  const [showConfirm,setShowConfirm] = useState<boolean>(false)
  const navigate = useNavigate()

  async function handleDelUser(){
    const id = sessionStorage.getItem("id")
    await axios.delete(`${import.meta.env.VITE_BE_URL}/api/values/deleteUser/${id}`)
    .then((resp)=>{
      console.log(resp)
      if (resp.status == 204) {
        toast.success("Bye, sad to see you go")
        sessionStorage.clear()
        navigate('/')
      } else {
        toast.error("cant delete user.  try again later");
      }
    }
    )
    .catch(() => toast.error("cant delete user. try again later"));
  }

  function logout(){
    sessionStorage.clear()
    navigate('/')
  }
  return (
    <div className="relative h-full">
      <h1>Profile</h1>
      <div onClick={() => setShowConfirm(true)}>
        <span>delete account</span>
      </div>
      <div onClick={logout}>
        <span>log out</span>
      </div>

      <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full backdrop-blur-xs"
      hidden={!showConfirm} >
      <div
        className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border rounded px-3 py-1 shadow flex flex-col gap-3"
      >
        <span>Are you sure you want to delete this account?</span>
        <div>
          <div className="grid grid-cols-2 gap-1">
            <div onClick={() => setShowConfirm(false)} className="flex justify-center rounded bg-gray-100">
              <span>cancel</span>
            </div>
            <div className="flex justify-center rounded bg-red-500" onClick={handleDelUser}>
              <span>confirm</span>
            </div>
          </div>
        </div>
      </div>

      </div>
    </div>
  );
}
