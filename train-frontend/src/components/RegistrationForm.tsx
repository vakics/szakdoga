import { Link } from 'react-router-dom'
import '../css/registrationform.css'

export const RegistrationForm=()=>{
    return(
        <div>
            <h1>Regisztrálj!</h1>
            <form>
                <div id='title'>Regisztráció</div>
                <div><input type="text" placeholder='Email-cím' /></div>
                <div><input type="text" placeholder='Felhasználónév' /></div>
                <div><input type="password" placeholder='Jelszó' /></div>
                <div><input type="password" placeholder='Jelszó megerősítés' /></div>
                <Link to='/'>
                    <div><button>Regisztráció</button></div>
                </Link>
                <div>Már van fiókod?</div>
                <Link to='/'>
                    <div>Jelentkezz be!</div>
                </Link>
            </form>
        </div>
    )
}