import { useEffect, useState } from "react"
import { AuthMessage } from "../components/AuthMessage"
import { Header } from "../components/Header"
import axios from "axios"
import { useLocation } from "react-router"

export const OtherUserProfile=()=>{
    const location=useLocation()
    const [user,setUser]=useState<{username: string,email: string}>()
    const getUser=async()=>{
        const {data}=await axios.get("http://localhost:5000/get_user/"+location.hash.slice(1))
        setUser(data)
    }
    useEffect(()=>{
        getUser()
    })

    return(
        <div className="profile">
            <Header/>
            <AuthMessage/>
            <h1>Profil adatok</h1>
            <table className="data">
                <tbody>
                    <tr>
                        <td>Felhasználónév:</td>
                        <td>{user?.username}</td>
                    </tr>
                    <tr>
                        <td>Email-cím:</td>
                        <td>{user?.email}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}