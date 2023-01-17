import { LikeButton } from "./LikeButton"

export const MultipleUnitList=(data:{id: number,train_type: string,series_number: number,nickname: string,producer: string,
produce_begins: number,produce_ends: number, info: string}[],search:string, szuresek:boolean[])=>{
    let filtered=data.filter((train)=>{
        return train.nickname.toLowerCase().includes(search) || train.producer.toLowerCase().includes(search) ||
        train.series_number.toString().includes(search)
    })
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
        filtered.map((train)=>(
            <>
            <tr key={train.id + "kep"}>
                <td colSpan={6}>{getPics(train.series_number)}</td>
            </tr>
            <tr key={train.id}>
                <td>{train.series_number}</td>
                <td>{train.nickname}</td>
                <td>{train.producer}</td>
                <td>{train.produce_begins}</td>
                <td>{train.produce_ends}</td>
                <td>
                    <LikeButton/>
                </td>
            </tr>
            </>
        ))
    )
}