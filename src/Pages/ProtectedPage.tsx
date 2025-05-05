import { ReactNode, useLayoutEffect } from "react"
import { useNavigate } from "react-router"

type ProtectedPageProp = {
    children : ReactNode
}

export function ProtectedPage({children}:ProtectedPageProp){
    const navigate = useNavigate()
    const id = sessionStorage.getItem('id')
    useLayoutEffect(()=>{
        if (!id) {
            navigate('/auth')
        }
    },[id,navigate])

    return(
        <>
        {children}
        </>
    )
}