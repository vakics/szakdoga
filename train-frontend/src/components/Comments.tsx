import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import "../css/comments.css"
import { Link } from "react-router-dom"

export const Comments=()=>{
    const location=useLocation()
    const [DATA,setDATA]=useState<{id:number,username:string,train_id:number,comment:string,created:string,answer_to:number}[]>([])
    const getDATA=async()=>{
        const {data}=await axios.get("http://localhost:5000/get_comments_by_train_id/"+location.hash.slice(1))
        let newdata=[...data]
        newdata.reverse()
        setDATA(newdata)
    }
    useEffect(()=>{
        getDATA()
    },[])
    const addZeroes=(date:number)=>{
        if (date>=10) return date
        return "0"+date
    }
    const getFormattedDate=(created:string):string=>{
        const date=new Date(created)
        return date.getFullYear()+"-"+(addZeroes(date.getMonth()+1))+"-"+addZeroes(date.getDate())+" "+addZeroes(date.getHours())+":"+addZeroes(date.getMinutes())
    }
    const getAnswered=(answered:number|null)=>{
        if (answered===null) return null
        return "Válasz erre a kommentre: "+answered
    }

    return(
        <table className="gotComments">
            <tbody>
                {DATA.map((comment)=>(
                    <>
                        <tr key={comment.id+comment.username} className="data">
                            <td>
                                <Link to={"/profiles#"+comment.username} style={{textDecoration:"none"}}><span className="username">{comment.username}</span></Link>
                                <span className="right">
                                    <span className="date">{getFormattedDate(comment.created)}</span>
                                    <span className="id">{comment.id}</span>
                                </span>
                            </td>
                        </tr>
                        <tr key={comment.id} className="comment">
                            <td dangerouslySetInnerHTML={{__html: comment.comment}}></td>
                        </tr>
                        <tr key={comment.id+"answer"} className="answer">
                            <td>
                                <Link to={"/answer-comment#"+comment.id} style={{textDecoration:"none"}}><span>Válasz</span></Link>
                                <Link to={"/look-answered#"+comment.id}><span className="answered">{getAnswered(comment.answer_to)}</span></Link>
                            </td>
                        </tr>
                    </>
                ))}
            </tbody>
        </table>
    )
}