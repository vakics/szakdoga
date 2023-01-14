import { useEffect, useState } from "react"
import { TrainInterface } from "../components/TrainInterface"
import axios from "axios"
import { TrainTemplate } from "./TrainTemplate"

export const ElectricTrains=()=>{
    const [DATA,setDATA]=useState<TrainInterface[]>([])
    const getDATA=async()=>{
        const {data}=await axios.get<TrainInterface[]>("http://localhost:5000/get_all_trains")
        setDATA(data)
    }
    useEffect(()=>{
        getDATA()
    },[])
    return(
        <>{TrainTemplate(DATA,"villamos")}</>
    )
}