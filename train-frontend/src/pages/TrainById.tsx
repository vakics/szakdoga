import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { Header } from "../components/Header"
import { TrainInterface } from "../components/TrainInterface"
import axios from "axios"
import "../css/trainbyid.css"
import LikeButton from "../components/LikeButton"
import { CommentForm } from "../components/CommentForm"
import { Comments } from "../components/Comments"
import { AuthMessage } from "../components/AuthMessage"

export const TrainById=()=>{
    const location=useLocation()
    const [DATA,setDATA]=useState<TrainInterface>()
    const getDATA=async()=>{
        const {data}=await axios.get<TrainInterface>("http://localhost:5000/get_train_by_id?id="+location.hash.slice(1))
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

    return(
        <div className="container-fluid overflow-auto">
            <Header/>
            <AuthMessage/>
            <div className="main">
                <div className="headline">
                    <div className="train-img"><img className="trainbyid" src={DATA?.image_url} /></div>
                    <div className="like">
                        <LikeButton train_id={DATA?.id} favorite={favorites}/>
                    </div>
                </div>
                <div className="info">{DATA?.info}</div>
                <div className="comments">
                    <h3>Hozzászólás</h3>
                    {CommentForm(DATA?.id)}
                </div>
                <div className="gotFromServerComments">
                    <Comments/>
                </div>
            </div>
        </div>
    )
}