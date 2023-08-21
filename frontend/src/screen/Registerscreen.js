import React, { useEffect } from 'react'
import { useState } from 'react'
import apiHelper from '../commen/ApiHelper'
import { useNavigate } from 'react-router-dom'
import Validator from '../commen/Validator'
import Input from '../Component/Input'

export default function Registerscreen() {
    const navigate = useNavigate()
    const [validationError, setValidationError] = useState([])
    const [isSubmited, setIsSubmited] = useState(false)
    const token = localStorage.getItem("token")
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmpassword: ""
    })

    useEffect(()=>{
        if(token && token.length > 0 ){
            navigate("/")
        }
    },[])

    const RegisterHandler = async () => {
        try {
            setIsSubmited(true)
            const ValidationResult = Validator(user, "Register")

            console.log(ValidationResult)

            if (ValidationResult.length > 0) {
                setValidationError(ValidationResult)
                return
            }
            const result = await apiHelper.userRegister(user)
            localStorage.setItem("userInfo", JSON.stringify(result.data.user))
            localStorage.setItem("token", result.data.user.token)
            navigate("/")
        } catch (error) {
            if (error.response) {
                if (error.response.status && error.response.data && (error.response.data.message === "validation Error" || error.response.data.message === "Auth Error")) {
                    setValidationError(error.response.data.errros)
                }
            }
            console.log(error)
        }
    }

    return (
        <div className="form_wrapper">
            <div className="form_container">
                <div className="title_container">
                    <h2>Create An Account</h2>
                </div>
                <div className="row clearfix">
                    <div className="">
                        <form>
                            <div className="row clearfix">
                                <div className="col_half">
                                    <div className="input_field"> <span><i aria-hidden="true" className="fa fa-user"></i></span>
                                        <Input type="text"
                                            name="name"

                                            placeholder="First Name"


                                            isError={validationError.find((x) => x.key === "firstname") }

                                            hintText={validationError.find((x) => x.key === "firstname")?.message}
                                            
                                            onChange={(e) =>{ setUser({ ...user, firstname: e.target.value })
                                            if(isSubmited){
                                                const ValidationResult = Validator({...user, firstname:e.target.value},"Register")
                                                setValidationError(ValidationResult)
                                            }
                                            
                                        }}
                                            
                                            
                                            />

                                          
                                    </div>
                                </div>
                                <div className="col_half">
                                    <div className="input_field"> <span><i aria-hidden="true" className="fa fa-user"></i></span>
                                        <Input type="text"
                                            name="name"
                                            placeholder="Last Name"
                                            
                                            isError={validationError.find((x) => x.key === "lastname")}
                                            
                                            hintText={validationError.find((x) => x.key === "lastname")?.message}
                                            onChange={(e) => {
                                                setUser({ ...user, lastname: e.target.value })
                                                if(isSubmited){

                                                
                                            const ValidationResult = Validator({...user, lastname:e.target.value}, "Register")
                                            setValidationError(ValidationResult)
                                        }    
                                        }}


                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="input_field"> <span><i aria-hidden="true" className="fa fa-envelope"></i></span>
                                <Input type="email"
                                    name="email"
                                    placeholder="Email"
                                    
                                    isError={validationError.find((x) => x.key === "email")}
                                    
                                    hintText={validationError.find((x) => x.key === "email")?.message}
                                 onChange={(e) => {
                                    setUser({ ...user, email: e.target.value })
                                        if(isSubmited){

                                        
                                            const ValidationResult = Validator({...user, email:e.target.value}, "Register")
                                            setValidationError(ValidationResult)
                                        }
                                        }}

                                />
                            </div>
                            <div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                                <Input type="password"
                                    name="password"
                                    placeholder="Password"
                                    isError={validationError.find((x) => x.key === "password")}
                                    
                                    hintText={validationError.find((x) => x.key === "password")?.message}
                                    
                                     onChange={(e) => {
                                        setUser({ ...user, password: e.target.value })
                                        if(isSubmited){

                                            const ValidationResult = Validator({...user, password:e.target.value}, "Register")
                                            setValidationError(ValidationResult)
                                        }

                                     }}

                                />
                            </div>
                            <div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                                <Input type="password"
                                    name="password"
                                    placeholder="Re-type Password"
                                    
                                    isError={validationError.find((x) => x.key === "confirmpassword")}
                                    
                                    hintText={validationError.find((x) => x.key === "confirmpassword")?.message}

                                     onChange={(e) => {
                                        setUser({ ...user, confirmpassword: e.target.value })
                                        if(isSubmited){
                                            const ValidationResult = Validator({...user, confirmpassword:e.target.value},"Register")
                                            setValidationError(ValidationResult)

                                        }
                                     }}


                                />
                            </div>

                            {/* <div className="input_field select_option">
                                <select>
                                    <option>Select a country</option>
                                    <option>Option 1</option>
                                    <option>Option 2</option>
                                </select>
                                <div className="select_arrow"></div>
                            </div> */}
                            <div className="input_field checkbox_option">
                                <input type="checkbox" id="cb1" />
                                <label for="cb1">I agree with terms and conditions</label>
                            </div>
                            <div className="input_field checkbox_option">
                                <input type="checkbox" id="cb2" />
                                <label for="cb2">I want to receive the newsletter</label>
                            </div>
                            <button style={{
                                 background:" #f5ba1a",
                                 height: "58px",
                                 lineHeight: "28px",
                                 width: "100%",
                                 border:" none",
                                 outline:" none",
                                 cursor: "pointer",
                                 color: "#fff",
                                 fontSize:" 1.1em",
                                 marginBottom: "10px",

                                 transition: "all 0.3s ease-in-out"
                            }}
                             type="button" value="Register" onClick={RegisterHandler}>Register Now</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}
