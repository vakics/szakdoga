import { Header } from "../components/Header"
import '../css/profile.css'

export const Profile=()=>{
    return(
        <div className="profile">
            <Header/>
            <h1>Profil adatok</h1>
            <table className="data">
                <tbody>
                    <tr>
                        <td>Email-cím:</td>
                        <td>{sessionStorage["email"]}</td>
                    </tr>
                    <tr>
                        <td>Felhasználónév:</td>
                        <td>{sessionStorage["username"]}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}