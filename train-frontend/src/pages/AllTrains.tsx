import { useEffect, useState } from "react"
import { Header } from "../components/Header"
import { TrainInterface } from "../components/TrainInterface"
import axios from "axios"
import { TrainList } from "../components/TrainList"

export const AllTrains=()=>{
    const [DATA,setDATA]=useState<TrainInterface[]>([])
    const [value,setValue]=useState("")
    const getDATA=async()=>{
        const {data}=await axios.get("http://localhost:5000/get_all_trains")
        setDATA(data)
    }
    useEffect(()=>{getDATA()},[])
    const [favorites,setFavorites]=useState<{id:number,user_id:string,train_id:number}[]>([])
    const getFavorites=async()=>{
        const {data}=await axios.get("http://localhost:5000/get_favorites_by_user_id/"+sessionStorage["id"])
        setFavorites(data)
    }
    useEffect(()=>{getFavorites()},[])

    return(
        <div className="container-fluid">
            <Header/>
            <div className="main">
                <div className="search">
                    <input type="text" placeholder="Keresés" id="searchbar" value={value} onChange={(e)=>setValue(e.target.value)} />
                </div>
                {TrainList(DATA,favorites,value,"")}
            </div>
        </div>
    )
}