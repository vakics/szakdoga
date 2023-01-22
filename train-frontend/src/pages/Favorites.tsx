import axios from "axios"
import { useState, useEffect } from "react"
import { TrainInterface } from "../components/TrainInterface"
import { Header } from "../components/Header"
import { TrainList } from "../components/TrainList"

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

    return(
        <div className="container">
            <Header/>
            <h2>Villamos mozdonyok</h2>
            {TrainList(filtered,favorites,"","villamos")}
            <h2>Motorvonatok</h2>
            {TrainList(filtered,favorites,"","motor")}
            <h2>Dízelmozdonyok</h2>
            {TrainList(filtered,favorites,"","dízel")}
            <h2>Gőzmozdonyok</h2>
            {TrainList(filtered,favorites,"","gőzös")}
        </div>
    )
}