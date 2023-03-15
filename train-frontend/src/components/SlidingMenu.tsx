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
                <img src={require('../images/main-menu.png')} alt="Menu" />
            </div>
            <div className={opened?"slidein bg-dark active":"slidein bg-dark"}>
                <ul className="menu-items"  onClick={showMenu}>
                    <li className="close"><AiOutlineClose size="2em" color="white"/></li>
                    <Link to="/" style={{color:"white",textDecoration:"none"}}><li className="item">Főoldal</li></Link>
                    <Link to="/all-trains" style={{color:"white",textDecoration:"none"}}><li className="item">Összes vonat</li></Link>
                    <Link to="/electric" style={{color:"white",textDecoration:"none"}}><li className="item">MÁV villamos mozdonyok</li></Link>
                    <Link to="/diesel" style={{color:"white",textDecoration:"none"}}><li className="item">MÁV dízel mozdonyok</li></Link>
                    <Link to='/munit' style={{color:"white",textDecoration:"none"}}><li className="item">MÁV motorvonatok</li></Link>
                    <Link to="/nostalgia" style={{color:"white",textDecoration:"none"}}><li className="item">MÁV nosztalgia</li></Link>
                </ul>
            </div>
        </div>
    )
}