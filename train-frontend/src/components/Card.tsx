import React from "react"
import { TrainInterface } from "./TrainInterface"
import "../css/card.css"
import { Link } from "react-router-dom"
import LikeButton from "./LikeButton"

interface card{
    train:TrainInterface
    favorites:{id:number,user_id:string,train_id:number}[]
}

export const Card: React.FC<card>=({train, favorites})=>{
    const getPics=(series_number: number)=>{
        try{
            const src=require("../images/trains/"+series_number+".png")
            if (src) return <img src={src} className="train-img"/>
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
        <div className="train-card">
            <Link to={"/traininfo#"+train.id}>{getPics(train.series_number)}</Link>
            <h4 className="train-card-title">{train.nickname}</h4>
            <div className="train-card-body">
                <ul className="list">
                    <li>{train.series_number}</li>
                    <li>{train.produce_begins}-{train.produce_ends}</li>
                    <li>{train.producer}</li>
                </ul>
                <div>
                    <LikeButton train_id={train.id} favorite={favorites}/>
                </div>
            </div>
        </div>
    )
}