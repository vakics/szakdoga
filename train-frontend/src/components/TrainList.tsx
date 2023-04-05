import { Card } from "./Card"
import { TrainInterface } from "./TrainInterface"

export const TrainList=(data:TrainInterface[],favorites:{id:number,user_id:string,train_id:number}[],search:string, train_type: string)=>{
    let filtered=data.filter((train)=>{
        return train.nickname.toLowerCase().includes(search) || train.producer.toLowerCase().includes(search) ||
        train.series_number.toString().includes(search)
    }).filter((train)=>{return train.train_type.includes(train_type)})
    
    return(
        <div className="trains d-flex flex-wrap mt-2">
            {filtered.map((train)=>(
            <Card train={train} favorites={favorites}/>
        ))}
        </div>
    )
}
