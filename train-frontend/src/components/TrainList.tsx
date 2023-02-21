import { useState } from "react"
import { MdArrowDownward } from "react-icons/md"
import { Link } from "react-router-dom"
import LikeButton from "./LikeButton"
import { Card } from "./Card"

export const TrainList=(data:{id: number,train_type: string,series_number: number,nickname: string,producer: string,
produce_begins: number,produce_ends: number, info: string, image_url: string}[],favorites:{id:number,
user_id:string,train_id:number}[],search:string, train_type: string)=>{
    let filtered=data.filter((train)=>{
        return train.nickname.toLowerCase().includes(search) || train.producer.toLowerCase().includes(search) ||
        train.series_number.toString().includes(search)
    }).filter((train)=>{return train.train_type.includes(train_type)})
    const [szuresek,setSzuresek]=useState([false,false,false,false,false])
    const refreshSzures=(index:number)=>{
    const uj=szuresek.map((v,i)=>{
        if (i===index){
            return !v
        }
        else{
            return false
        }})
        setSzuresek(uj)
    }
    
    if (szuresek.at(0)){
        filtered=filtered.sort((a:{series_number:number},b:{series_number:number})=>(a.series_number > b.series_number ? 1 : -1))
    }
    if (szuresek.at(1)){
        filtered=filtered.sort((a:{nickname:string},b:{nickname:string})=>(a.nickname > b.nickname ? 1 : -1))
    }
    if (szuresek.at(2)){
        filtered=filtered.sort((a:{producer:string},b:{producer:string})=>(a.producer > b.producer ? 1 : -1))
    }
    if (szuresek.at(3)){
        filtered=filtered.sort((a:{produce_begins:number},b:{produce_begins:number})=>(a.produce_begins > b.produce_begins ? 1 : -1))
    }
    if (szuresek.at(4)){
        filtered=filtered.sort((a:{produce_ends:number},b:{produce_ends:number})=>(a.produce_ends > b.produce_ends ? 1 : -1))
    }
    const getPics=(series_number: number)=>{
        try{
            const src=require("../images/trains/"+series_number+".png")
            if (src) return <img src={src} />
        } catch(err){}
        try{
            const src=require("../images/trains/"+series_number+"_kozep_2.png")
            if (src) return(<>
                <img src={require("../images/trains/"+series_number+"_balra.png")} />
                <img src={require("../images/trains/"+series_number+"_kozep_1.png")} />
                <img src={require("../images/trains/"+series_number+"_kozep_2.png")} />
                <img src={require("../images/trains/"+series_number+"_jobbra.png")} /></>)
        } catch(err){}
        try{
            const src=require("../images/trains/"+series_number+"_kozep.png")
            if(src) return(<>
                <img src={require("../images/trains/"+series_number+"_balra.png")} />
                <img src={require("../images/trains/"+series_number+"_kozep.png")} />
                <img src={require("../images/trains/"+series_number+"_jobbra.png")} /></>)
        } catch(err){}
        try{
            const src=require("../images/trains/"+series_number+"_jobbra.png")
            if(src) return(<>
                <img src={require("../images/trains/"+series_number+"_balra.png")} />
                <img src={require("../images/trains/"+series_number+"_jobbra.png")} /></>)
        } catch(err){}
    }
        
    return(
        /*<table className="trains">
            <thead>
                <tr>
                    {train_type.includes("motor")?"":<th>Kép</th>}
                    <th className="filter"><button onClick={()=>refreshSzures(0)}>Típus{szuresek.at(0)?<MdArrowDownward/>:""}</button></th>
                    <th className="filter"><button onClick={()=>refreshSzures(1)}>Becenév{szuresek.at(1)?<MdArrowDownward/>:""}</button></th>
                    <th className="filter"><button onClick={()=>refreshSzures(2)}>Gyártó{szuresek.at(2)?<MdArrowDownward/>:""}</button></th>
                    <th className="filter"><button onClick={()=>refreshSzures(3)}>Gyártás kezdete{szuresek.at(3)?<MdArrowDownward/>:""}</button></th>
                    <th className="filter"><button onClick={()=>refreshSzures(4)}>Gyártás vége{szuresek.at(4)?<MdArrowDownward/>:""}</button></th>
                    <th>Like</th>
                </tr>
            </thead>
            <tbody>
                {train_type.includes("motor")?filtered.map((train)=>(
                    <>
                    <tr key={train.id + "kep"}>
                        <td colSpan={6}><Link to={"/traininfo#"+train.id}>{getPics(train.series_number)}</Link></td>
                    </tr>
                    <tr key={train.id}>
                        <td>{train.series_number}</td>
                        <td>{train.nickname}</td>
                        <td>{train.producer}</td>
                        <td>{train.produce_begins}</td>
                        <td>{train.produce_ends}</td>
                        <td>
                            <LikeButton train_id={train.id} favorite={favorites}/>
                        </td>
                    </tr>
                    </>
                )):filtered.map((train)=>(
                    <tr key={train.id}>
                        <td><Link to={"/traininfo#"+train.id}><img src={require("../images/trains/"+train.series_number+".png")} /></Link></td>
                        <td>{train.series_number}</td>
                        <td>{train.nickname}</td>
                        <td>{train.producer}</td>
                        <td>{train.produce_begins}</td>
                        <td>{train.produce_ends}</td>
                        <td>
                            <LikeButton train_id={train.id} favorite={favorites}/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>*/
        <div className="trains d-flex flex-wrap mt-2">
            {filtered.map((train)=>(
            <Card train={train} favorites={favorites}/>
        ))}
        </div>
    )
}
