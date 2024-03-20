import React, { useRef } from 'react'
import "./Login.css"
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const userLoginSuccess = () => {
    toast.success("Login successfully!")
  }
  
  const userLoginFail = () => {
    toast.error("Login failed!")
  }

const Login=({setShowLogin,setCurrentUser})=>{

    const nameRef=useRef()
    const passRef=useRef()

    const handleSubmit=async(e)=>{
        e.preventDefault()

        const newUser={
            userName:nameRef.current.value,
            password: passRef.current.value 
        }

        try{
            const response= await axios.post("/users/login",newUser)
            console.log(response)
            userLoginSuccess()
            setCurrentUser(response.data.userName)
            setShowLogin(false)
        }catch(err){
            userLoginFail()
            console.log(err)
        }
    }

    return(
        <div className='login_container'>
            <div className='application'>
                <ExitToAppIcon/>
                Login to your profile
            </div>

            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='username' ref={nameRef}/>
                <input type='password' placeholder='password' ref={passRef}/>
                <button className='login_button'>Login</button>
            </form>
            <CancelIcon className='login_cancel' onClick={()=>setShowLogin(false)}/>
        </div>
    )
}

export default Login