import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { Header } from "../components/Header"
import { TrainInterface } from "../components/TrainInterface"
import axios from "axios"
import "../css/trainbyid.css"

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
                <img className="trainbyid" src={DATA?.image_url} />
                <div className="info">{DATA?.info}</div>
            </div>
        </div>
    )
}