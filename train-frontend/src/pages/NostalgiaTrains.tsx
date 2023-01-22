import axios from "axios"
import { useState, useEffect } from "react"
import { TrainInterface } from "../components/TrainInterface"
import { Header } from "../components/Header"
import { useNavigate } from "react-router"
import { TrainList } from "../components/TrainList"

export const NostalgiaTrains=()=>{
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
    const [value, setValue] = useState<string>('')
    const navigate=useNavigate()
    useEffect(()=>{
        if (sessionStorage["id"] === undefined) {
            navigate('/')
            alert("Nem vagy bejelentkezve!")
        }
    })
    const filtered=DATA.filter((train)=>train.train_type.includes("nosztalgia"))

    return(
        <div className="container">
            <Header/>
            <div className="main">
                <div className="search">
                    <input type="text" placeholder="Keresés" id="searchbar" value={value} onChange={(e)=>setValue(e.target.value)} />
                </div>
                <h2>Gőzmozdonyok</h2>
                {TrainList(filtered,favorites,value,"gőzös")}
                <h2>Dízelmozdonyok</h2>
                {TrainList(filtered,favorites,value,"dízel")}
            </div>
        </div>
    )
}