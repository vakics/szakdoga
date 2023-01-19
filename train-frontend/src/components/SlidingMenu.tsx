import { useState } from "react"
import {AiOutlineClose} from 'react-icons/ai'
import '../css/slidingmenu.css'
import { Link } from "react-router-dom"

export const SlidingMenu=()=>{
    const [opened,setOpened]=useState(false)
    const showMenu=()=>setOpened(!opened)

    return(
        <div className="menu">
            <div className="menu-switch" onClick={showMenu}>
                <img src={require('../images/menu.png')} alt="Menu" />
            </div>
            <div className={opened?"slidein active":"slidein"} onClick={showMenu}>
                
                <ul className="menu-items">
                    <li className="close"><AiOutlineClose size="2em" color="white"/></li>
                    <li><Link to="/electric" style={{color:"white",textDecoration:"none"}}>MÁV villamos mozdonyok</Link></li>
                    <li><Link to="/diesel" style={{color:"white",textDecoration:"none"}}>MÁV dízel mozdonyok</Link></li>
                    <li><Link to='/munit' style={{color:"white",textDecoration:"none"}}>MÁV motorvonatok</Link></li>
                    <li><Link to="/nostalgia" style={{color:"white",textDecoration:"none"}}>MÁV nosztalgia</Link></li>
                </ul>
            </div>
        </div>
    )
}