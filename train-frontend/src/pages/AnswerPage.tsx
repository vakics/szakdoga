import { useLocation } from "react-router"
import { AuthMessage } from "../components/AuthMessage"
import { Header } from "../components/Header"
import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import "../css/answerpage.css"
import { CommentForm } from "../components/CommentForm"

export const AnswerPage=()=>{
    const location=useLocation()
    const [comment,setComment]=useState({id:0,train_id:0,username:"",created:"",comment:"",answer_to:0})
    const getComment=async()=>{
        const {data}=await axios.get("http://localhost:5000/get_comment/"+location.hash.slice(1))
        setComment(data)
    }
    useEffect(()=>{getComment()},[])
    const addZeroes=(date:number)=>{
        if (date>=10) return date
        return "0"+date
    }
    const getFormattedDate=(created:string):string=>{
        if (created==="") return ""
        const date=new Date(created)
        return date.getFullYear()+"-"+(addZeroes(date.getMonth()+1))+"-"+addZeroes(date.getDate())+" "+addZeroes(date.getHours())+":"+addZeroes(date.getMinutes())
    }

    return(
        <div className="container-fluid">
            <Header/>
            <AuthMessage isShowEnabled={sessionStorage["id"]===undefined}/>
            <div className="main">
                <table className="gotComments">
                    <tbody>
                        <tr key={comment.id+comment.username} className="data">
                            <td>
                                <Link to={"/profiles#"+comment.username} style={{textDecoration:"none"}}><span className="username">{comment.username}</span></Link>
                                <span className="right">
                                    <span className="date">{getFormattedDate(comment.created)}</span>
                                    <span className={comment.id===0?"id hidden":"id"}>{comment.id}</span>
                                </span>
                            </td>
                        </tr>
                        <tr key={comment.id} className="comment">
                            <td dangerouslySetInnerHTML={{__html: comment.comment}}></td>
                        </tr>
                    </tbody>
                </table>
                <h2>Válasz</h2>
                {CommentForm(comment.train_id,comment.id)}
            </div>
        </div>
    )
}