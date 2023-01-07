import { Link, useNavigate } from 'react-router-dom'
import '../css/registrationform.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'

export const RegistrationForm=()=>{
    interface Registrationform{
        email: string
        username: string
        password: string
        passwordConf: string
    }
    const navigation=useNavigate()
    const {register,formState:{errors},handleSubmit,watch}=useForm<Registrationform>()
    const onSubmit: SubmitHandler<Registrationform>=(data:{email: string, username: string, password: string, passwordConf: string})=>{
        axios.post("http://localhost:5000/register",{email:data.email,username:data.username,password:data.password}).then((response:any)=>{
            navigation("/")
        }).catch((error:any)=>{
            alert("Ez a felhasználónév már létezik!")
        })
    }
    return(
        <div>
            <h1>Regisztrálj!</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div id='title'>Regisztráció</div>
                <div><input {...register("email",{required:true,pattern:/[a-z0-9]+@[a-z]+.[a-z]{2,3}/})} type="text" placeholder='Email-cím' /></div>
                <div className="error">{errors.email && "Ez nem egy érvényes email-cím!"}</div>
                <div><input {...register("username",{minLength:3,maxLength:30})} type="text" placeholder='Felhasználónév' /></div>
                <div className="error">{errors.username && "A felhasználónév legalább 3 és legfeljebb 30 karakter!"}</div>
                <div><input {...register("password",{minLength:{value:5,message:"A jelszó legalább 5 karakter legyen!"}})} type="password" placeholder='Jelszó' /></div>
                <div className="error">{errors.password?.message}</div>
                <div><input {...register("passwordConf",{validate:(value: string)=>{
                    return value===watch("password") || "A jelszavak nem egyeznek!"
                }})} type="password" placeholder='Jelszó megerősítés' /></div>
                <div className="error">{errors.passwordConf?.message}</div>
                <div><button>Regisztráció</button></div>
                <div>Már van fiókod?</div>
                <Link to='/'>
                    <div>Jelentkezz be!</div>
                </Link>
            </form>
        </div>
    )
}