import axios from "axios"
import { useState, useEffect } from "react"
import { TrainInterface } from "../components/TrainInterface"
import { Header } from "../components/Header"
import { useNavigate } from "react-router"
import { TrainList } from "../components/TrainList"
import { MdArrowDownward } from "react-icons/md"

export const NostalgiaTrains=()=>{
    const [DATA,setDATA]=useState<TrainInterface[]>([])
    const getDATA=async()=>{
        const { data } =await axios.get<TrainInterface[]>("http://localhost:5000/get_all_trains")
        setDATA(data)
    }
    useEffect(()=>{
        getDATA()
    },[])

    const [value, setValue] = useState<string>('')
    const [szuresek,setSzuresek]=useState([false,false,false,false,false])
    const refreshSzures=(index:number)=>{
        const uj=szuresek.map((v,i)=>{
            if (i===index){
                return !v
            }
            else{
                return false
            }
        })
        setSzuresek(uj)
    }
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
                {TrainList(filtered,value,"gőzös")}
                <h2>Dízelmozdonyok</h2>
                {TrainList(filtered,value,"dízel")}
            </div>
        </div>
    )
}