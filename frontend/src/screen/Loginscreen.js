import React, { useState } from 'react'
import "../screen/Loginscreen.css"
import apiHelper from '../commen/ApiHelper'
import { useEffect } from 'react'
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom'
import Validator from '../commen/Validator'
import FormControl from '@mui/material/FormControl';
import { Button, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';


export default function Loginscreen() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const [Token, setToken] = useState()
  const [seconds, setSeconds] = useState(10);
  const [LoginError, setLoginError] = useState([])
  const [issubmited,setisSubmited] = useState(false)
  const [mute,setmute] = useState(false)
  const [user , setUser] = useState({
    email:"",
    password:"",
    otp:""
  })
  const [validationError, setvalidationError] = useState([])
  const location =  useLocation()
  const redirect = location.search.split("?redirect=")[1]

  useEffect(()=>{
    if(token && token.length > 0 ){
        navigate("/")
    }
},[])

  const LoginHandler = async()=> {
    try {
      setisSubmited(true)

      const ValidationResult = Validator(user,"login")
      
      if(ValidationResult.length > 0 ){
        setvalidationError(ValidationResult)
        return
      }
      setmute(true)

      const result = await apiHelper.userLogin(user)
      console.log(result)
      const token = result.data.user.token
      setToken(token)
      console.log(token)

      setTimeout(()=>{
        setmute(false)
    },7500)



    //  localStorage.setItem("userInfo", JSON.stringify(result.data.user))
    //  localStorage.setItem("token", result.data.user.token)
    //  if(redirect){
    //    navigate("/Shipping")
    //  }else{
    //   navigate("/")
    //  }
     
    } catch (error) {
      console.log(error)

      if(error && error.response && error.response.status === 400){
        setvalidationError(error.response.data.errors)
      }
    }
  }

  const Otpverify = async () => {
    try {

      setisSubmited(true)
        const validationresult = Validator(user, "otpverify")

        if (validationresult.length > 0) setLoginError(validationresult)

        const result = await apiHelper.OtpVerify(user)
        console.log(result)

        // setAuth(true)

        localStorage.setItem("token", JSON.stringify(Token))

        if(redirect){
          navigate("/Shipping")
        }else{
         navigate("/")
        }


        return

    } catch (error) {
        // setAuth(false)
        console.log(error)
        if (error.response.status === 400 && error.response.data) {
            if (error.response.status === 400 && error.response.data.message === "validation Error") {
                console.log(error.response.data.validationResult)
                setLoginError(error.response.data.validationResult)
                return
            }
        }
    }
}


useEffect(() => {
  let interval;
  if (mute) {
    interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
  }
   else {
      setSeconds(10);
  }
  return () => {
      clearInterval(interval);
    };
  }, [mute]);






  return(
    <div className="container ps-md-0">
  <div className="row g-0">
    <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image "></div>
    <div className="col-md-8 col-lg-6">
      <div className="login d-flex align-items-center py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-lg-8 mx-auto">
              <h3 className="login-heading mb-4">Welcome back!</h3>

              <form>
                <div className="form-floating mb-3">
                  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e)=>{
                     setUser({...user, email:e.target.value})
                    if(issubmited){
                      const validationResult = Validator({...user, email:e.target.value}, "login")
                      setvalidationError(validationResult)

                    }

                  }}/>
                  {
                    validationError.find((x) => x.key === "email") ? (
                      <span className='text-danger'>
                        {
                           validationError.find((x) => x.key === "email").message
                        }
                      </span>
                    
                    ) : ""
                  }
                  <label for="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(e) =>{
                     setUser({...user, password:e.target.value})
                     if(issubmited){
                      const validationResult = Validator({...user, password:e.target.value}, "login")
                      setvalidationError(validationResult)

                    }
                  }} />
                  {
                    validationError.find((x) => x.key === "password") ? (
                      <span className='text-danger'>
                        {
                           validationError.find((x) => x.key === "password").message
                        }
                      </span>
                    
                    ) : ""
                  }
                  <label for="floatingPassword">Password</label>
                </div>

                <FormControl  sx={{ mt: 0, mr:3, width: "25ch" }}>
                            <TextField id="outlined-basic" label="OTP" variant="outlined"
                                  error={LoginError.find((x) => x.key === "otp" ? true : false)}
                                helperText={LoginError.find((x) => x.key === "otp" ? true : false)?.message}
                                onChange={(e) => {
                                    setUser({ ...user, otp: e.target.value })
                                    if (issubmited) {
                                        const validationResult = Validator({ ...user, otp: e.target.value }, "otpverify")
                                        setLoginError(validationResult)
                                    }
                                }}
                            />
                             </FormControl>
                             {seconds > 0 && <p style={{margin:0}} className={ seconds === 10 ? "d-none" : "d-block"}>Seconds left: {seconds}</p>}

                             <Button variant="contained"  disabled={mute} onClick={LoginHandler}  sx={{ width: "10vw", mt:1, }} endIcon={<SendIcon/>}>
                            Send
                        </Button>

                <div className="form-check mb-3">
                  {/* <input className="form-check-input" type="checkbox" value="" id="rememberPasswordCheck" /> */}
                 
                  <label className="form-check-label" for="rememberPasswordCheck">
                  <Link to={"/Registration"} > 
                   create account
                   </Link>
                  </label>
                </div>

                <div className="d-grid">
                  <button className="btn btn-lg btn-warning btn-login text-uppercase fw-bold mb-2" type="button" onClick={Otpverify}>Sign in</button>
                  <div className="text-center">
                    <a className="small" href="#">Forgot password?</a>
                  </div>
                </div>
                  
               
                           

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}
