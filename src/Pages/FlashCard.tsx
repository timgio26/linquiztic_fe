// import axios from "axios"
import { useLocation } from "react-router";
import { z } from "zod";
import { LanguageListSchema } from "../services/Types";

export function FlashCard(){
    const FlashCardSchema = z.object({
        language:z.string(),
        userLanguages:LanguageListSchema
    })
    const location = useLocation()
    const parseResult = FlashCardSchema.safeParse(location.state)
    
    console.log(parseResult,location.state)

    return(
        <div>
            <h1>Flash Card</h1>
        </div>
    )
}