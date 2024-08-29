import { useEffect, useState } from "react"
import { Toaster, toast } from 'sonner'
import { Data } from "../types"
import { searchOnData } from "../services/search"
import { useDebounce } from "@uidotdev/usehooks"


const DEBOUNCE_TIME = 500

export const Search = ({initialData} : {initialData : Data}) =>{
    const [data , setData] = useState<Data>(initialData)
    const [search , setSearch] = useState<string>(() => {
        const searchParams = new URLSearchParams(window.location.search)
        return searchParams.get('q') ?? ''
    })

    const debounceSearch = useDebounce(search,DEBOUNCE_TIME)

    const handleSearch = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setSearch(event.target.value)
    }

    useEffect(()=>{
        const newPathName = debounceSearch === ''
            ? window.location.pathname
            : `?q=${debounceSearch}`

        window.history.pushState({},'',newPathName)
    },[debounceSearch])

    useEffect(()=>{
        if(!debounceSearch){
            setData(initialData)
            return
        }
        searchOnData(debounceSearch)
            .then(response => {
                const [ err , newData] = response
                if(err){
                    toast.error(err.message)
                }
                if(newData) setData(newData)
            })
    },[debounceSearch, initialData])

    return (
        <>
            <Toaster />
            <h1>Resultados</h1>
            <form>
                <input 
                    onChange={handleSearch}
                    type="search"
                    placeholder="Busca información ..."
                    />
            </form>

            {
                data.map((row) =>{
                    return (
                        <li key={row.id}>
                            <article>
                                {
                                    Object
                                    .entries(row)
                                    .map(([key, value]) => <p key={key}><strong>{key}</strong>:{value}</p> )
                                }
                            </article>
                        </li>
                    )
                })
            }
        </>
    )
}