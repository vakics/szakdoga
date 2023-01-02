import { useState } from "react"

export const LikeButton=()=>{
    const [liked,setLiked]=useState(false)
    return(
        <button className="like" onClick={()=>setLiked(!liked)}>
            <img src={liked?require('../images/heart.png'):require('../images/heart_blank.png')} />
        </button>
    )
}