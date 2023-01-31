import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import "../css/comments.css"

export const Comments=()=>{
    const location=useLocation()
    const [DATA,setDATA]=useState<{id:number,username:string,train_id:number,comment:string,created:string}[]>([])
    const getDATA=async()=>{
        const {data}=await axios.get("http://localhost:5000/get_comments_by_train_id/"+location.hash.slice(1))
        setDATA(data)
    }
    useEffect(()=>{
        getDATA()
    },[])
    const getFormattedDate=(created:string):string=>{
        const date=new Date(created)
        return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()
    }
    return(
        <table className="gotComments">
            <tbody>
                {DATA.map((comment)=>(
                    <>
                        <tr key={comment.id+comment.username} className="data">
                            <td>
                                <span className="username">{comment.username}</span>
                                <span className="date">{getFormattedDate(comment.created)}</span>
                            </td>
                        </tr>
                        <tr key={comment.id} className="comment">
                            <td>{comment.comment}</td>
                        </tr>
                    </>
                ))}
            </tbody>
        </table>
    )
}