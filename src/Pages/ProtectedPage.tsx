import { ReactNode, useEffect } from "react"
import { useNavigate } from "react-router"

type ProtectedPageProp = {
    children : ReactNode
}

export function ProtectedPage({children}:ProtectedPageProp){
    const navigate = useNavigate()
    const id = sessionStorage.getItem('id')
    useEffect(()=>{
        if (!id) {
            navigate('/auth',{replace:true})
        }
    },[id,navigate])

    return(
        <>
        {children}
        </>
    )
}