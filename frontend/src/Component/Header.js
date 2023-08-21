import React from 'react'
import { Link, navigate, useNavigate } from 'react-router-dom'

export default function Header({cartItems}) {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    const LogOutHandler = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userInfo")
        navigate("/")
    }

    const NavigateToLogin = () => {
        navigate("/Login")
    }
    return (
        <header className='h-50 bg-dark text-light px-3 py-2 d-flex align-center justify-content-between'>
            <div className='logo'>
                <Link to={"/"} className=' text-warning'>
                    <h2 className='fw-bold'>{"amazon"}</h2>
                </Link>
            </div>
            <div className='d-flex gap-5 align-item-center text-light'>
                <Link to={"/Addtocart"}><i style={{ fontSize: "3.2rem", marginTop:"12px" }} className="fa-brands fs-5 fa-opencart icoon text-light position-relative">

                    <span style={{ fontSize: ".5rem" }} className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cartItems.length}
                    </span>
                </i></Link>
                <div className='cf'>
                <button className='btn btn-warning fw-bold bg-gradient' onClick={token ? LogOutHandler : NavigateToLogin}>
                    {token ? "SignOut" : "SignUp"}
                </button>
                </div>
            </div>
        </header>


    )
}
