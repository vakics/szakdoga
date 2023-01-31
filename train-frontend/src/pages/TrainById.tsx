import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { Header } from "../components/Header"
import { TrainInterface } from "../components/TrainInterface"
import axios from "axios"
import "../css/trainbyid.css"
import LikeButton from "../components/LikeButton"
import { SubmitHandler, useForm } from "react-hook-form"
import { CommentForm } from "../components/CommentForm"
import { Comments } from "../components/Comments"

export const TrainById=()=>{
    const navigate=useNavigate()
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
                <table>
                    <tbody>
                        <tr>
                            <td><img className="trainbyid" src={DATA?.image_url} /></td>
                            <td><LikeButton train_id={DATA?.id} favorite={favorites}/></td>
                        </tr>
                    </tbody>
                </table>
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