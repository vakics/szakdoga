import axios from "axios"
import { useState } from "react"

export const CommentForm=(train_id:number|undefined)=>{
    const [value,setValue]=useState("")
    const now=new Date()
    const onSubmit=()=>{
        if (value.trim().length===0) {alert("Nincs elküldhető hozzászólás!")}
        else if(value.trim.length>300){alert("Túl hosszú hozzászólás (max 300 karakter)!")}
        else {
            axios.post("http://localhost:5000/add_comment",{
                "username":sessionStorage["username"],
                "train_id":train_id,
                "comment":value,
                "created":now
            }).then(()=>{window.location.reload()}).catch((err)=>{console.log(err)})
        }
    }
    return(
        <>
            <form>
                <textarea value={value} onChange={(e)=>{setValue(e.target.value)}} cols={40} rows={5}></textarea>
                <br />
                <input type="submit" onClick={onSubmit} />
            </form>
        </>
    )
}