import axios from "axios"
import { useState, useEffect } from "react"
import { TrainInterface } from "../components/TrainInterface"
import { TrainTemplate } from "./TrainTemplate"

export const MultipleUnitTrains=()=>{
    const [DATA,setDATA]=useState<TrainInterface[]>([])
    const getDATA=async()=>{
        const {data}=await axios.get<TrainInterface[]>("http://localhost:5000/get_all_trains")
        setDATA(data)
    }
    useEffect(()=>{
        getDATA()
    },[])
    return(
        <>{TrainTemplate(DATA,"motor")}</>
    )
}