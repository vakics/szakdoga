import { useState } from "react";
import "../css/header.css"
import { Menu, MenuItem } from "@material-ui/core";
import { SlidingMenu } from "./SlidingMenu";
import { Link, useNavigate } from "react-router-dom";

export const Header=()=>{
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
        <div className="header">
            <span className="menu">
                <SlidingMenu/>
            </span>
            <span className="logo">
                Vonatok
            </span>
            <span className="user">
                <button onClick={handleClick} className="user">
                    <img src={require('../images/user.png')} alt="User" />
                </button>
                <Menu
                keepMounted
                anchorEl={anchorEl}
                onClose={handleClose}
                open={Boolean(anchorEl)}>
                    <MenuItem onClick={handleClose}>
                        <Link to="/profile"  style={{color:"black",textDecoration:"none"}}>Profil</Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>Kedvencek</MenuItem>
                    <MenuItem onClick={handleClose}>
                        <div onClick={onLogout}>Kijelentkezés</div>
                    </MenuItem>
                </Menu>
            </span>
        </div>
    )
}