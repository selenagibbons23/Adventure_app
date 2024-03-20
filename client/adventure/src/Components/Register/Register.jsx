import React, { useRef } from 'react'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CancelIcon from '@mui/icons-material/Cancel';
import "./Register.css"
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const userRegisterSuccess = () => {
    toast.success("Registered successfully!")
  }
  
  const userRegisterFail = () => {
    toast.error("Failed to register!")
  }

const Register=({setShowRegister})=>{

    const nameRef=useRef()
    const emailRef=useRef()
    const passwordRef=useRef()

    const handleSubmit = async(e) => {
        e.preventDefault()

        const newUser = {
            userName : nameRef.current.value,
            email : emailRef.current.value,
            password : passwordRef.current.value
        }

        try{
            const response = await axios.post("/users/register",newUser)
            userRegisterSuccess()
            console.log(response)
            setShowRegister(false)
        }catch(err)
        {
            userRegisterFail()
        }
    }
    
    return(
        <div className='register_container'>
            <div className='application'>
                <ExitToAppIcon/>
                create a profile
            </div>

            <form onSubmit = {handleSubmit}>
                <input type='text' placeholder='username' ref={nameRef}></input>
                <input type='email' placeholder='email' ref={emailRef}></input>
                <input type='password' placeholder='password' ref={passwordRef}></input>
                <button className='register_button'>Register</button>

            </form>
            <CancelIcon className='register_cancel' onClick={() => setShowRegister(false)}/>
        </div>
    )
}

export default Register