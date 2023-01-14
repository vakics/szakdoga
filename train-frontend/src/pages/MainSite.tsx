import { Header } from "../components/Header"
import "../css/mainsite.css"
import { useEffect } from "react"
import { useNavigate } from "react-router"

export const MainSite=()=>{
    const navigate=useNavigate()
    useEffect(()=>{
        if (sessionStorage["id"] === undefined) {
            navigate('/')
            alert("Nem vagy bejelentkezve!")
        }
    })

    return(
        <div className="container">
            <Header/>
            <div className="main">
                <h1>Üdvözöllek az oldalon!</h1>
            </div>
        </div>
    )
}