import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Header } from "../components/Header"
import { TrainList } from "../components/TrainList"
import { MdArrowDownward } from "react-icons/md"
import "../css/traintemplate.css"
import { MultipleUnitList } from "../components/MultipleUnitList"

export const TrainTemplate=(data:{id: number,train_type: string,series_number: number,nickname: string,producer: string,
produce_begins: number,produce_ends: number, info: string}[],train_type:string)=>{
    const filtered=data.filter((train)=>train.train_type===train_type)
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
                            {train_type==="motor"?"":<th>Kép</th>}
                            <th className="filter"><button onClick={()=>refreshSzures(0)}>Típus{szuresek.at(0)?<MdArrowDownward/>:""}</button></th>
                            <th className="filter"><button onClick={()=>refreshSzures(1)}>Becenév{szuresek.at(1)?<MdArrowDownward/>:""}</button></th>
                            <th className="filter"><button onClick={()=>refreshSzures(2)}>Gyártó{szuresek.at(2)?<MdArrowDownward/>:""}</button></th>
                            <th className="filter"><button onClick={()=>refreshSzures(3)}>Gyártás kezdete{szuresek.at(3)?<MdArrowDownward/>:""}</button></th>
                            <th className="filter"><button onClick={()=>refreshSzures(4)}>Gyártás vége{szuresek.at(4)?<MdArrowDownward/>:""}</button></th>
                            <th>Like</th>
                        </tr>
                    </thead>
                    <tbody>
                        {train_type==="motor"?MultipleUnitList(filtered,value,szuresek):TrainList(filtered,value,szuresek)}
                    </tbody>
                </table>
            </div>
        </div>
    )
    }