import axios from "axios"
import { useEffect, useState } from "react"

interface data{
    train_id: number | undefined
    favorite:{id:number,user_id:string,train_id:number}[]
}

const LikeButton: React.FC<data>=({train_id, favorite})=>{
    const isTrainLiked=(train_id: number | undefined)=>{
        let liked=false
        favorite.filter((fav)=>{
            if (fav.train_id===train_id) {liked=true}
        })
        return liked
    }
    const [liked,setLiked]=useState(isTrainLiked(train_id))
    useEffect(()=>{
        setLiked(isTrainLiked(train_id))
    })
    const handleLike=async()=>{
        setLiked(!liked)
        if (!liked){
            axios.post("http://localhost:5000/add_favorite",{"user_id":sessionStorage["id"],"train_id":train_id}).then(()=>{window.location.reload()})
        }
        if(liked){
            const id=favorite.filter((fav)=>fav.train_id===train_id).at(0)?.id
            axios.delete("http://localhost:5000/delete_favorite/"+id).then(()=>{window.location.reload()})
        }
    }
    return(
        <button className="like" onClick={()=>handleLike()}>
            <img src={liked?require('../images/heart.png'):require('../images/heart_blank.png')} />
        </button>
    )
}

export default LikeButton