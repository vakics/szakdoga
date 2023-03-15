import axios from "axios"
import { useState, useEffect } from "react"
import { TrainInterface } from "../components/TrainInterface"
import { Header } from "../components/Header"
import { TrainList } from "../components/TrainList"
import "../css/favorites.css"
import { AuthMessage } from "../components/AuthMessage"

export const Favorites=()=>{
    const [DATA,setDATA]=useState<TrainInterface[]>([])
    const getDATA=async()=>{
        const { data } =await axios.get<TrainInterface[]>("http://localhost:5000/get_all_trains")
        setDATA(data)
    }
    useEffect(()=>{
        getDATA()
    },[])
    const [favorites,setFavorites]=useState<{id:number,user_id:string,train_id:number}[]>([])
    const getFavorites=async()=>{
        const {data}=await axios.get("http://localhost:5000/get_favorites_by_user_id/"+sessionStorage["id"])
        setFavorites(data)
    }
    useEffect(()=>{getFavorites()},[])
    const [ids,setIds]=useState<number[]>([])
    favorites.forEach((favorite)=>ids.push(favorite.train_id))
    const filtered=DATA.filter((train)=>{
        if (ids.includes(train.id)) {return train}
    })

    const isArrayEmpty=(data:TrainInterface[],train_type:string):boolean=>{
        const filter=data.filter((train)=>{
            if (train.train_type.includes(train_type)) return train
        })
        if (filter.length===0) {
            return true
        }
        else return false
    }

    return(
        <div className="container-fluid">
            <Header/>
            <AuthMessage isShowEnabled={sessionStorage["id"]===undefined}/>
            <div className="main">
                <h1>{filtered.length===0?"Jelenleg nincsenek kedvelt vonataid!":""}</h1>
                <div className={isArrayEmpty(filtered,"villamos")?"hidden":""}>
                    <h2>Villamos mozdonyok</h2>
                    {TrainList(filtered,favorites,"","villamos")}
                </div>
                <div className={isArrayEmpty(filtered,"motor")?"hidden":""}>
                    <h2>Motorvonatok</h2>
                    {TrainList(filtered,favorites,"","motor")}
                </div>
                <div className={isArrayEmpty(filtered,"dízel")?"hidden":""}>
                    <h2>Dízelmozdonyok</h2>
                    {TrainList(filtered,favorites,"","dízel")}
                </div>
                <div className={isArrayEmpty(filtered,"gőzös")?"hidden":""}>
                    <h2>Gőzmozdonyok</h2>
                    {TrainList(filtered,favorites,"","gőzös")}
                </div>
            </div>
        </div>
    )
}