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
        <div className="header bg-dark">
            <span className="menu">
                <SlidingMenu/>
            </span>
        </div>
    )
}