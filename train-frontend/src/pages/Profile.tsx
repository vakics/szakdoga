import { useEffect, useState } from "react"
import { AuthMessage } from "../components/AuthMessage"
import { Header } from "../components/Header"
import '../css/profile.css'
import axios from "axios"

export const Profile=()=>{
    const [user,setUser]=useState({"username":sessionStorage["username"],"email":sessionStorage["email"],"is_contact_public":true})
    const getUser=async()=>{
        axios.get("http://localhost:5000/get_user/"+sessionStorage["username"]).then((resp)=>{setUser(resp.data)})
    }
    useEffect(()=>{getUser()},[])
    const handleContactVisibility=()=>{
        axios.put("http://localhost:5000/update_contact_visibility",{"user_id":sessionStorage["id"],"is_contact_public":!user.is_contact_public})
        .then((resp)=>setUser(resp.data))
    }

    return(
        <div className="profile">
            <Header/>
            <AuthMessage isShowEnabled={sessionStorage["id"]===undefined}/>
            <h1>Profil adatok</h1>
            <table className="data">
                <tbody>
                    <tr>
                        <td>Felhasználónév:</td>
                        <td>{user.username}</td>
                    </tr>
                    <tr>
                        <td>Email-cím:</td>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <td>Email-cím láthatósága:</td>
                        <td>{user.is_contact_public?"publikus":"privát"}</td>
                    </tr>
                </tbody>
            </table>
            <button onClick={handleContactVisibility} className="btn btn-danger">Email-cím láthatóságának átállítása</button>
        </div>
    )
}