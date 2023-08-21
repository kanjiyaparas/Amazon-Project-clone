import React, { useEffect } from 'react'
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import SendIcon from '@mui/icons-material/Send';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import Validator from '../../commen/Validator';
import apiHelper from '../../commen/ApiHelper';
import { json, useNavigate } from 'react-router-dom';
import Paths from '../../commen/Paths';


export default function Loginscreen(props) {

    const { setAuth  , Auth} = props
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = React.useState(false);
    const [LoginError, setLoginError] = useState([])
    const [token, settoken] = useState()
    const [mute,setmute] = useState(false)
    const [issubmitted, setissubmitted] = useState(false)
   
    const [seconds, setSeconds] = useState(10);
    const [user, setuser] = useState({
        email: "",
        password: "",
        otp:""
    })
    useEffect(() => {
        if (Auth) {
            navigate(Paths.DashBoard)
        }
    } , [])
    
    const LoginHendler = async () => {
        try {
            setissubmitted(true)
            const validationresult = Validator(user, "login")
            
            if (validationresult.length > 0){ 
                setLoginError(validationresult) 
                return}
            
            setmute(true)
            const result = await apiHelper.Userlogin(user)
            console.log(result)

            const token = result.data.user.token
           settoken(token)
           

            setTimeout(()=>{
                setmute(false)
            },7500)


            // setAuth(true)

            // navigate(Paths.DashBoard)

            // return

        } catch (error) {
            setAuth(false)
            console.log(error)
            if (error.response.status === 400 && error.response.data) {
                if (error.response.status === 400 && error.response.data.message === "validation Error") {
                    setLoginError(error.response.data.validationresult)
                }
            }
        }
    }
    const Otpverify = async () => {
        try {

            setissubmitted(true)
            const validationresult = Validator(user, "otpverify")

            if (validationresult.length > 0) setLoginError(validationresult)

            const result = await apiHelper.OtpVerfy(user)
            console.log(result)

            setAuth(true)

            localStorage.setItem("TOKEN", JSON.stringify(token))

            navigate(Paths.DashBoard)


            return

        } catch (error) {
            setAuth(false)
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

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [open, setOpen] = React.useState(true);

    return (
        <div>
            <Dialog open={open}  >
                <DialogTitle className='text-center'>Login</DialogTitle>
                <DialogContent className='d-flex flex-column' >
                    <FormControl sx={{ mt: 2, width: '40ch' }} variant="outlined" >
                        <TextField
                            error={LoginError.find((x) => x.key === "email")}
                            id="outlined-adornment-password"
                            type={"email"}
                            label="Email"
                            helperText={LoginError.find((x) => x.key === "email")?.message}
                            onChange={(e) => {
                                setuser({ ...user, email: e.target.value })
                                if (issubmitted) {
                                    const validationResult = Validator({ ...user, email: e.target.value }, "login")
                                    setLoginError(validationResult)
                                }

                            }}

                        />
                    </FormControl>
                    <FormControl sx={{ mt: 2, width: '40ch' }} variant="outlined">

                        <TextField
                            error={LoginError.find((x) => x.key === "password" ? true : false)}
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            helperText={LoginError.find((x) => x.key === "password" ? true : false)?.message}
                            onChange={(e) => {
                                setuser({ ...user, password: e.target.value })
                                if (issubmitted) {
                                    const validationResult = Validator({ ...user, password: e.target.value }, "login")
                                    setLoginError(validationResult)
                                }

                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            label="Password"
                        />
                    </FormControl>
                   
                        <FormControl  sx={{ mt: 2, width: "25ch" }}>
                            <TextField id="outlined-basic" label="OTP" variant="outlined"
                                  error={LoginError.find((x) => x.key === "otp" ? true : false)}
                                helperText={LoginError.find((x) => x.key === "otp" ? true : false)?.message}
                                onChange={(e) => {
                                    setuser({ ...user, otp: e.target.value })
                                    if (issubmitted) {
                                        const validationResult = Validator({ ...user, otp: e.target.value }, "otpverify")
                                        setLoginError(validationResult)
                                    }

                                }}
                            />
                        </FormControl>
                        {seconds > 0 && <p style={{margin:0}} className={ seconds === 10 ? "d-none" : "d-block"}>Seconds left: {seconds}</p>}
                        <Button variant="contained"  disabled={mute}  onClick={LoginHendler} sx={{ width: "10vw", mt:1 }} endIcon={<SendIcon />}>
                            Send
                        </Button>
                
                </DialogContent>
                <DialogActions>
                    <Button >Cancel</Button>
                    <Button onClick={Otpverify}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </div>

    )
}

