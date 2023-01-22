import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Header } from "../components/Header"
import { TrainList } from "../components/TrainList"
import "../css/traintemplate.css"
import axios from "axios"

export const TrainTemplate=(data:{id: number,train_type: string,series_number: number,nickname: string,producer: string,
produce_begins: number,produce_ends: number, info: string,image_url: string}[],train_type:string)=>{
    const filtered=data.filter((train)=>train.train_type===train_type)
    const [value, setValue] = useState<string>('')
    const [favorites,setFavorites]=useState<{id:number,user_id:string,train_id:number}[]>([])
    const getFavorites=async()=>{
        const {data}=await axios.get("http://localhost:5000/get_favorites_by_user_id/"+sessionStorage["id"])
        setFavorites(data)
    }
    useEffect(()=>{getFavorites()},[])
    const navigate=useNavigate()
    useEffect(()=>{
        if (sessionStorage["id"] === undefined) {
            navigate('/')
            alert("Nem vagy bejelentkezve!")
        }
    })
    return(
        <div className="container">
            <Header/>
            <div className="main">
                <div className="search">
                    <input type="text" placeholder="Keresés" id="searchbar" value={value} onChange={(e)=>setValue(e.target.value)} />
                </div>
                {TrainList(filtered,favorites,value,train_type)}
            </div>
        </div>
    )
    }