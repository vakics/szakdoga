import { Link, useNavigate, useNavigation } from 'react-router-dom'
import '../css/loginform.css'
import React from 'react'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types'
import axios from 'axios'

export const LoginForm=()=>{
    interface Loginform{
        username:string
        password:string
    }
    const navigation=useNavigate()
    const {register,formState:{errors},handleSubmit}=useForm<Loginform>({mode:"onTouched"})
    const onSubmit: SubmitHandler<Loginform>=(data:{username:string,password:string})=>{
        axios.post("http://localhost:5000/login",{username:data.username,password:data.password}).then((response:any)=>{
            sessionStorage.setItem("id",response.data.id)
            sessionStorage.setItem("username",response.data.username)
            sessionStorage.setItem("email",response.data.email)
            navigation('/home')
        }).catch((error:any)=>{
            alert("Hibás felhasználónév vagy jelszó!")
        })
    }
    return(
        <div className='loginform'>
            <h1>Jelentkezz be</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div id='title'>Bejelentkezés</div>
                <div><input {...register("username",{required:"Kötelező mező!"})} type="text" placeholder='Felhasználónév' /></div>
                <div className="error">{errors.username?.message}</div>
                <div><input {...register("password",{required:"Kötelező mező!"})} type="password" placeholder='Jelszó' /></div>
                <div className="error">{errors.password?.message}</div>
                <div><button>Bejelentkezés</button></div>
                <div>Nincs fiókod?</div>
                <Link to='/signup'>
                    <div>Regisztrálj!</div>
                </Link>
            </form>
        </div>
    )
}