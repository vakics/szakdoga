import { Header } from "../components/Header"
import "../css/mainsite.css"
import { TrainList } from "../components/TrainList"
import { useEffect, useState } from "react"
import {MdArrowDownward} from "react-icons/md"
import axios from "axios"
import { useNavigate } from "react-router"

export const MainSite=()=>{
    const data=[{id:1,sorozatszam:628,becenev:"Szergej",gyarto:"Luganszki",gyartKezd:1965,gyartVege:1974},
                {id:2,sorozatszam:460,becenev:"Leó",gyarto:"Ganz",gyartKezd:1983,gyartVege:1992}]
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
    console.log(sessionStorage["id"])
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
                <div className="search">
                    <input type="text" placeholder="Keresés" id="searchbar" value={value} onChange={(e)=>setValue(e.target.value)} />
                </div>
                <table className="trains">
                    <thead>
                        <tr>
                            <th>Kép</th>
                            <th className="filter"><button onClick={()=>refreshSzures(0)}>Típus{szuresek.at(0)?<MdArrowDownward/>:""}</button></th>
                            <th className="filter"><button onClick={()=>refreshSzures(1)}>Becenév{szuresek.at(1)?<MdArrowDownward/>:""}</button></th>
                            <th className="filter"><button onClick={()=>refreshSzures(2)}>Gyártó{szuresek.at(2)?<MdArrowDownward/>:""}</button></th>
                            <th className="filter"><button onClick={()=>refreshSzures(3)}>Gyártás kezdete{szuresek.at(3)?<MdArrowDownward/>:""}</button></th>
                            <th className="filter"><button onClick={()=>refreshSzures(4)}>Gyártás vége{szuresek.at(4)?<MdArrowDownward/>:""}</button></th>
                            <th>Like</th>
                        </tr>
                    </thead>
                    <tbody>
                        {TrainList(data,value,szuresek)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}