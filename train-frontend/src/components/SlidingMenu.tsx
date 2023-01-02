import { useState } from "react"
import {AiOutlineClose} from 'react-icons/ai'
import '../css/slidingmenu.css'

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
                    <li>MÁV villamos mozdonyok</li>
                    <li>MÁV dízel mozdonyok</li>
                    <li>MÁV motorvonatok</li>
                    <li>MÁV nosztalgia</li>
                </ul>
            </div>
        </div>
    )
}