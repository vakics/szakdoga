import { useEffect, useState } from "react"
import { TrainTemplate } from "./TrainTemplate"
import axios from "axios"
import { TrainInterface } from "../components/TrainInterface"

export const DieselTrains=()=>{
    const [DATA,setDATA]=useState<TrainInterface[]>([])
    const getDATA=async()=>{
        const { data } =await axios.get<TrainInterface[]>("http://localhost:5000/get_all_trains")
        setDATA(data)
    }
    useEffect(()=>{
        getDATA()
    },[])
    return(
        <>{TrainTemplate(DATA,"dízel")}</>
    )
}