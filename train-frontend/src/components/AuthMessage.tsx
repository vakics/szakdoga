import { Modal, ModalTitle, Button } from "react-bootstrap"
import { useNavigate } from "react-router"
import "../css/authmessage.css"
import React, { useEffect, useState } from "react"

interface showing{
    isShowEnabled:boolean
}

export const AuthMessage:React.FC<showing>=({isShowEnabled})=>{
    const [toShow,setToShow]=useState(sessionStorage["id"]===undefined)
    const navigate=useNavigate()
    const handleClose=()=>{
        if (window.location.pathname==="/answer-comment" || window.location.pathname==="/profile" ||
        window.location.pathname==="/favorites"){
            navigate(-1)
        }
        else{
            setToShow(false)
        }
    }

    return(
        <>
        {isShowEnabled && 
            <Modal show={toShow} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton onClick={()=>handleClose()}>
                    <ModalTitle>401</ModalTitle>
                </Modal.Header>
                <Modal.Body>
                    <div>Nem vagy bejelentkezve!</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={()=>navigate('/login')}>
						Jelentkezz be!
					</Button>
                </Modal.Footer>
            </Modal>
            }</>
    )
}