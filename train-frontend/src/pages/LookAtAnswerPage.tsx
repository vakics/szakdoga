import { useLocation } from "react-router"
import { Header } from "../components/Header"
import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import "../css/lookatanswer.css"

export const LookAtAnsweredPage=()=>{
    const location=useLocation()
    const [comment,setComment]=useState({id:0,train_id:0,username:"",created:"",comment:"",answer_to:0})
    const [answered,setAnswered]=useState({id:0,train_id:0,username:"",created:"",comment:"",answer_to:0})
    const getComment=async()=>{
        axios.get("http://localhost:5000/get_comment/"+location.hash.slice(1))
        .then((data)=>{
            const comment:{id:number,train_id:number,username:string,created:string,comment:string,answer_to:number}=data.data
            setComment(comment)
            getAnswered(comment.answer_to)
        })
    }
    useEffect(()=>{getComment()},[])
    const getAnswered=async(com:number)=>{
        axios.get("http://localhost:5000/get_comment/"+com)
        .then((data)=>{
            const comment:{id:number,train_id:number,username:string,created:string,comment:string,answer_to:number}=data.data
            setAnswered(comment)
        })
    }
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
                        <tr key={comment.id+"answer"} className="answer">
                            <td>
                                <Link to={"/answer-comment#"+comment.id} style={{textDecoration:"none"}}><span>Válasz</span></Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <h2 className="answerTitle">Erre válaszolt:</h2>
                <table className="gotComments">
                <tbody>
                        <tr key={answered.id+answered.username} className="data">
                            <td>
                                <Link to={"/profiles#"+answered.username} style={{textDecoration:"none"}}><span className="username">{answered.username}</span></Link>
                                <span className="right">
                                    <span className="date">{getFormattedDate(answered.created)}</span>
                                    <span className={answered.id===0?"id hidden":"id"}>{answered.id}</span>
                                </span>
                            </td>
                        </tr>
                        <tr key={answered.id} className="comment">
                            <td dangerouslySetInnerHTML={{__html: answered.comment}}></td>
                        </tr>
                        <tr key={answered.id+"answer"} className="answer">
                            <td>
                                <Link to={"/answer-comment#"+answered.id} style={{textDecoration:"none"}}><span>Válasz</span></Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}