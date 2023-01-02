import { Link } from 'react-router-dom'
import '../css/loginform.css'

export const LoginForm=()=>{
    return(
        <div className='loginform'>
            <h1>Jelentkezz be</h1>
            <form>
                <div id='title'>Bejelentkezés</div>
                <div><input type="text" placeholder='Felhasználónév' /></div>
                <div><input type="password" placeholder='Jelszó' /></div>
                <Link to='/home'>
                    <div><button>Bejelentkezés</button></div>
                </Link>
                <div>Nincs fiókod?</div>
                <Link to='/signup'>
                    <div>Regisztrálj!</div>
                </Link>
            </form>
        </div>
    )
}