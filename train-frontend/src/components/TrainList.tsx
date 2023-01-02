import { LikeButton } from "./LikeButton"

export const TrainList=(data:{id:number,sorozatszam:number,becenev:string,gyarto:string,gyartKezd:number,gyartVege:number}[],
    search:string, szuresek:boolean[])=>{
        let filtered=data.filter((train)=>{
            return train.becenev.toLowerCase().includes(search) || train.gyarto.toLowerCase().includes(search) ||
            train.sorozatszam.toString().includes(search)
        })
        if (szuresek.at(0)){
            filtered=filtered.sort((a:{sorozatszam:number},b:{sorozatszam:number})=>(a.sorozatszam > b.sorozatszam ? 1 : -1))
        }
        if (szuresek.at(1)){
            filtered=filtered.sort((a:{becenev:string},b:{becenev:string})=>(a.becenev > b.becenev ? 1 : -1))
        }
        if (szuresek.at(2)){
            filtered=filtered.sort((a:{gyarto:string},b:{gyarto:string})=>(a.gyarto > b.gyarto ? 1 : -1))
        }
        if (szuresek.at(3)){
            filtered=filtered.sort((a:{gyartKezd:number},b:{gyartKezd:number})=>(a.gyartKezd > b.gyartKezd ? 1 : -1))
        }
        if (szuresek.at(4)){
            filtered=filtered.sort((a:{gyartVege:number},b:{gyartVege:number})=>(a.gyartVege > b.gyartVege ? 1 : -1))
        }

    return filtered.map((train)=>(
            <tr key={train.id}>
                <td><img src={require(`../images/${train.sorozatszam}.png`)} /></td>
                <td>{train.sorozatszam}</td>
                <td>{train.becenev}</td>
                <td>{train.gyarto}</td>
                <td>{train.gyartKezd}</td>
                <td>{train.gyartVege}</td>
                <td>
                    <LikeButton/>
                </td>
            </tr>
    ))
}