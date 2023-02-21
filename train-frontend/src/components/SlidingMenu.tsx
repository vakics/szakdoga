import { useState } from "react"
import {AiOutlineClose} from 'react-icons/ai'
import '../css/slidingmenu.css'
import { Link, useNavigate } from "react-router-dom"
import { Menu, MenuItem } from "@material-ui/core"

export const SlidingMenu=()=>{
    const [opened,setOpened]=useState(false)
    const showMenu=()=>setOpened(!opened)
    const [anchorEl, setAnchorEl] = useState(null)
    const navigate=useNavigate()
    const handleClose = () => {
        setAnchorEl(null);
    }
  
    const handleClick = (event:any) => {
        setAnchorEl(event.currentTarget);
    }

    const onLogout=()=>{
        sessionStorage.clear()
        navigate("/")
    }

    return(
        <div className="menu">
            <div className="menu-switch" onClick={showMenu}>
                <img src={require('../images/main-menu.png')} alt="Menu" />
            </div>
            <div className={opened?"slidein bg-dark active":"slidein bg-dark"}>
                <ul className="menu-items"  onClick={showMenu}>
                    <li className="close"><AiOutlineClose size="2em" color="white"/></li>
                    <Link to="/home" style={{color:"white",textDecoration:"none"}}><li className="item">Főoldal</li></Link>
                    <Link to="/electric" style={{color:"white",textDecoration:"none"}}><li className="item">MÁV villamos mozdonyok</li></Link>
                    <Link to="/diesel" style={{color:"white",textDecoration:"none"}}><li className="item">MÁV dízel mozdonyok</li></Link>
                    <Link to='/munit' style={{color:"white",textDecoration:"none"}}><li className="item">MÁV motorvonatok</li></Link>
                    <Link to="/nostalgia" style={{color:"white",textDecoration:"none"}}><li className="item">MÁV nosztalgia</li></Link>
                </ul>
                <div className="user">
                    <button onClick={handleClick} className="user">
                        <img src={require('../images/user.png')} alt="User" />
                    </button>
                    <Menu
                    keepMounted
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    open={Boolean(anchorEl)}>
                        <Link to="/profile"  style={{color:"black",textDecoration:"none"}}>
                            <MenuItem onClick={handleClose}>Profil</MenuItem>
                        </Link>
                        <Link to="/favorites" style={{color:"black",textDecoration:"none"}}>
                            <MenuItem onClick={handleClose}>Kedvencek</MenuItem>
                        </Link>
                        <MenuItem onClick={handleClose}>
                            <div onClick={onLogout}>Kijelentkezés</div>
                        </MenuItem>
                    </Menu>
            </div>
            </div>
        </div>
    )
}