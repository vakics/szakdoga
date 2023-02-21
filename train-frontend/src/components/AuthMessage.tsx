import { Modal, ModalTitle, Button } from "react-bootstrap"
import { useNavigate } from "react-router"
import "../css/authmessage.css"

export const AuthMessage=()=>{
    const navigate=useNavigate()
    return(
        <>
        {sessionStorage["id"] === undefined && 
            <Modal show={sessionStorage["id"] === undefined} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton onClick={()=>navigate('/')}>
                    <ModalTitle>401</ModalTitle>
                </Modal.Header>
                <Modal.Body>
                    <div>Nem vagy bejelentkezve!</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={()=>navigate('/')}>
						Jelentkezz be!
					</Button>
                </Modal.Footer>
            </Modal>
            }</>
    )
}