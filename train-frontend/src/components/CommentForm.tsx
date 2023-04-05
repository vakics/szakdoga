import axios from "axios"
import { useEffect, useState } from "react"
import {marked} from "marked"
import { useNavigate } from "react-router-dom"
import { AuthMessage } from "./AuthMessage"

export const CommentForm=(train_id:number|undefined,answer_to:null|number)=>{
    const [areYouNotLoggedInComment,setAreYouNotLoggedInComment]=useState(false)
    const navigate=useNavigate()
    const [value,setValue]=useState("")
    const [markdown,setMarkdown]=useState("")
    const now=new Date()

    useEffect(()=>{
        checkLenght(value)
    },[])

    const checkLenght=(value:string)=>{
        if (value.length===301) {
            alert("Túl hosszú hozzászólás (max 300 karakter)!")
        }
        console.log(value.length)
    }

    const onSubmit=(event:any)=>{
        event.preventDefault()
        setAreYouNotLoggedInComment(sessionStorage["id"]===undefined)
        if (areYouNotLoggedInComment===false && value.trim().length===0){
            alert("Nincs elküldhető hozzászólás!")}
        else if(value.trim.length>300 && areYouNotLoggedInComment===false){alert("Túl hosszú hozzászólás (max 300 karakter)!")}
        else if(areYouNotLoggedInComment===false && value.trim().length>0 && value.trim().length<300) {
                axios.post("http://localhost:5000/add_comment",{
                    "username":sessionStorage["username"],
                    "train_id":train_id,
                    "comment":markdown,
                    "created":now,
                    "answer_to":answer_to
                }).then(()=>{
                    if(window.location.pathname==="/traininfo"){
                        window.location.reload()
                    }
                    if(window.location.pathname==="/answer-comment"){
                        navigate(-1)
                    }
                })
                .catch((err)=>{console.log(err)})
            }
    }

    const changeToMarkdown=(text: string)=>{
        setValue(text)
        let text2=""
        if (marked(text).endsWith("\n")){
            text2=marked(text).slice(0,-2)
        }
        setMarkdown(marked(text2).replace("\n","<br/>"))
    }

    return(
        <>
            <AuthMessage isShowEnabled={areYouNotLoggedInComment} />
            <form onSubmit={onSubmit}>
                <div className="form-group p-0">
                    <textarea className="form-control" value={value} onChange={(e)=>{checkLenght(e.target.value);changeToMarkdown(e.target.value)}} rows={5}></textarea>
                </div>
                <br />
                <button type="submit" className="btn btn-light border border-dark">Küldés</button>
            </form>
        </>
    )
}