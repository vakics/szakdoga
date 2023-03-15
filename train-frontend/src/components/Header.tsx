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
    }

    return(
        <div className="header bg-dark">
            <span className="menu">
                <SlidingMenu/>
            </span>
            <span className="user">
                    <button onClick={handleClick} className={sessionStorage["id"]===undefined?"hidden":"user"}>
                        <img src={require('../images/user.png')} alt="User" />
                    </button>
                    <button onClick={()=>navigate("/login")} className={sessionStorage["id"]===undefined?"btn btn-info":"hidden"}>Jelentkezz be!</button>
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
            </span>
        </div>
    )
}