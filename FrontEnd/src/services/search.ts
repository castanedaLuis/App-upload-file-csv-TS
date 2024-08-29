import { type Data, type ApiSearchResponse } from "../types"
import { API_HOST } from "../config"

export const searchOnData = async (search : string) : Promise<[Error?, Data?]>=>{

    try {
        const res = await fetch(`${API_HOST}/api/users?q=${search}`)

        if(!res.ok) return [new Error(`Error searching data : ${res.statusText}`)]

        const json = await res.json() as ApiSearchResponse
        return [undefined, json.data]
        
    } catch (e) {
        console.error(e)
        if(e instanceof Error) return [e]
        
    }
    return [new Error('Unknow Error')]
}