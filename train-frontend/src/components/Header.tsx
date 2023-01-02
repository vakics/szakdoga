import { useState } from "react";
import "../css/header.css"
import { Menu, MenuItem } from "@material-ui/core";
import { SlidingMenu } from "./SlidingMenu";
import { Link } from "react-router-dom";

export const Header=()=>{
    const [anchorEl, setAnchorEl] = useState(null)
  
    const handleClose = () => {
        setAnchorEl(null);
    }
  
    const handleClick = (event:any) => {
        setAnchorEl(event.currentTarget);
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
                        <Link to='/' style={{color:"black",textDecoration:"none"}}>Kijelentkezés</Link>
                    </MenuItem>
                </Menu>
            </span>
        </div>
    )
}