import axios from "axios"
import { useState } from "react"
import {marked} from "marked"
import { useLocation, useNavigate } from "react-router-dom"

export const CommentForm=(train_id:number|undefined,answer_to:null|number)=>{
    const navigate=useNavigate()
    const [value,setValue]=useState("")
    const [markdown,setMarkdown]=useState("")
    const now=new Date()
    const onSubmit=()=>{
        if (value.trim().length===0) {alert("Nincs elküldhető hozzászólás!")}
        else if(value.trim.length>300){alert("Túl hosszú hozzászólás (max 300 karakter)!")}
        else {
            axios.post("http://localhost:5000/add_comment",{
                "username":sessionStorage["username"],
                "train_id":train_id,
                "comment":markdown,
                "created":now,
                "answer_to":answer_to
            }).then(()=>{
                window.location.reload()
                
            }).catch((err)=>{console.log(err)})
        }
        navigate("/traininfo#"+train_id)
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
            <form>
                <div className="form-group p-0">
                    <textarea className="form-control" value={value} onChange={(e)=>{changeToMarkdown(e.target.value)}} rows={5}></textarea>
                </div>
                <br />
                <input type="submit" onClick={onSubmit} />
            </form>
        </>
    )
}