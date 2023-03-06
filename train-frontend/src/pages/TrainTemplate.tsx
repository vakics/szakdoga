import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Header } from "../components/Header"
import { TrainList } from "../components/TrainList"
import "../css/traintemplate.css"
import axios from "axios"
import { AuthMessage } from "../components/AuthMessage"
import { TrainInterface } from "../components/TrainInterface"

export const TrainTemplate=(data:TrainInterface[],train_type:string)=>{
    const filtered=data.filter((train)=>train.train_type===train_type)
    const [value, setValue] = useState<string>('')
    const [favorites,setFavorites]=useState<{id:number,user_id:string,train_id:number}[]>([])
    const getFavorites=async()=>{
        const {data}=await axios.get("http://localhost:5000/get_favorites_by_user_id/"+sessionStorage["id"])
        setFavorites(data)
    }
    useEffect(()=>{getFavorites()},[])
    
    return(
        <div className="container-fluid">
            <Header/>
            <AuthMessage/>
            <div className="main">
                <div className="search">
                    <input type="text" placeholder="Keresés" id="searchbar" value={value} onChange={(e)=>setValue(e.target.value)} />
                </div>
                {TrainList(filtered,favorites,value,train_type)}
            </div>
        </div>
    )
    }