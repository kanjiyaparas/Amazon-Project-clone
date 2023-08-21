import React, { useState } from 'react'
import { useEffect } from 'react'
import apiHelper from '../commen/ApiHelper'
import Loader from '../Component/Loader'
import MessageBox from '../Component/MessageBox'
import { Navigate, json, redirect, useLocation, useNavigate } from 'react-router-dom'
import CheackOutStep from '../Component/CheackOutStep'
import HandlePayment from '../commen/LoadRazorpay'

export default function PlaceOrderScreen({ cartItems, setcartItems }) {
    const [cart, setcart] = useState([])
    const [Error, setError] = useState([])
    const location = useLocation()
    const navigate = useNavigate()
    const [isLoading, setisLoading] = useState(false)
    const [summarydetails, setsummarydetails] = useState({
        totalAmount: 0,
        totalItems: 0,
        totalProducts: 0,
        delivery: 0,
        text: 0

    })
    const [error, seterr] = useState("")
    const payment = location.search.split("paymentmethod=")[1]

    let shippingInfo = JSON.parse(localStorage.getItem("userInfo") || "{}")

    shippingInfo = shippingInfo.address


    useEffect(() => {
        setcartItems(JSON.parse(localStorage.getItem("cartItems") || "[]"))
    }, [])


    const getcart = async () => {
        try {
            setisLoading(true)
            const product = cartItems.map((x) => x.product);
            const result = await apiHelper.fetchCart(product)
            console.log(result)

            const Products = result?.data?.cart

            for (let i in Products) {
                for (let j in cartItems) {
                    if (cartItems[j].product === Products[i]._id) {
                        Products[i].qty = cartItems[j].qty
                    }
                }
            }
            setcart(Products)
            setisLoading(false)
        } catch (error) {
            setisLoading(false)
            if (error.response && error.response.data && error.response.data.message) {
                seterr(error.message)
            }

            seterr(error.message)

            return
        }
    }

    useEffect(() => {
        getcart()
    }, [cartItems])

    useEffect(() => {
        let i = 0
        let totalPrice = 0
        let totalitems = 0
        let totalProducts = 0

        while (i < cart.length) {
            if (cart[i].countInstock > 0) {
                totalitems += cart[i].qty
                totalPrice += (cart[i].qty * cart[i].price)
                totalProducts++
            }
            i++
        }
        setsummarydetails({
            ...summarydetails, totalitems: totalitems, totalAmount: totalPrice, totalProducts: totalProducts
        })
    }, [cart])

    const PlaceorderHendler = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo") || "[]")

            const paymentMethod = payment && payment === "online" ? "online" : "cod"

            const products = cart.map(({ _id, qty, price }) => ({ _id, qty, price }))

            console.log(products)

            const orderDetails = {
                user: userInfo,
                paymentMethod: paymentMethod,
                products: products,
                shippingAddress: userInfo.address,
                totalPrice: summarydetails.totalAmount
            }
            console.log(orderDetails)
            const result = await apiHelper.Placeorder(orderDetails)
            console.log(result.data.order)

            if (!result.data.order.RazorpayDetails) {
                return navigate("/order/" + result.data.order._id)
            } else {
                const data = result.data.order

                const Options = {
                    name: data.shippingAddress.fullName,
                    phone: data.shippingAddress.phonenumber,
                    email: data.shippingAddress.email,
                    address: data.shippingAddress.address,
                    apikey: data.RazorpayDetails.apikey,
                    amount: data.RazorpayDetails.amount,
                    currency: data.RazorpayDetails.currency,
                    razorpayOrderId: data.RazorpayDetails.id,
                    orderId: data._id,
                    showError: setError,
                    navigate: navigate
                }
                HandlePayment(Options)
            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <section className="h-100 gradient-custom">
                <div className="container py-4">
                    <Loader isLoading={isLoading} />

                    <CheackOutStep signin={true} shipping={true} payment={true} placeorder={true} />
                    <div className="row d-flex justify-content-center my-4">
                        <div className="col-md-8">
                            <div className=" mb-4 shadow">
                                <div className="card-header py-3 ">
                                    <h5 className="mb-0">Review Your Order</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col  mb-lg-0">
                                            <h5>Shipping Information</h5>
                                            <div className="address d-flex mb-0 mt-4 mb-0">
                                                <h6>FullName :</h6>
                                                <p className="ms-3">{shippingInfo.fullName}</p>
                                            </div>
                                            <div className="address d-flex " style={{ marginTop: "-10px", marginBottom: "-20px" }}>
                                                <h6>Address :</h6>
                                                <p className="ms-3">{shippingInfo.address}</p>
                                            </div>
                                            <div className="address d-flex  mb-0 mt-2 mb-0" style={{ marginTop: "-10px", marginBottom: "-20px" }}>
                                                <h6>Phone No :</h6>
                                                <p className="ms-3">{shippingInfo.phonenumber}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                    <div className="row">
                                        <div className="col  mb-lg-0">
                                            <h5>Payment Information</h5>
                                            <div className="address d-flex mb-0 mt-4 mb-0">
                                                <h6 className='mt-1'>Payment Method:</h6>
                                                <p className="ms-3 text-primary">{payment}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="my-4 " />
                                    <h5 className="mb-4">Order Information</h5>

                                    {
                                        cart.map((x) => {
                                            return (
                                                <>
                                                    <section className="h-100" style={{ backgroundColor: "#F7F7F7" }}>
                                                        <div className="container py-3 h-100">
                                                            <div className="row d-flex justify-content-center align-items-center h-100">
                                                                <div className="col">
                                                                    <div className=" shadow">
                                                                        <div className="card-body p-4">

                                                                            <div className="row">

                                                                                <div className="d-flex flex-row align-items-center text-center  justify-content-between  ">
                                                                                    <div className='col-3'>
                                                                                        <img
                                                                                            src={x.image}
                                                                                            className="img-fluid rounded-3" alt="Shopping item" style={{ height: "8rem" }} />
                                                                                    </div>
                                                                                    <div className="ms-3 col-4">
                                                                                        <h5 className="mb-3 ">Name</h5>
                                                                                        <h6 className='placeordertitle text-center'>{x.title}</h6>
                                                                                    </div>
                                                                                    <div className="ms-3 col-2">
                                                                                        <h5 className="mb-3">Quantity</h5>
                                                                                        <h5>{x.qty}</h5>
                                                                                    </div>
                                                                                    <div className="ms-3 px-4 col-3">
                                                                                        <h5 className="mb-3">Price </h5>
                                                                                        <h5>₹ {x.price}</h5>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>

                                                </>
                                            )
                                        })

                                    }

                                    <hr className="my-4" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className=" mb-4 shadow">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Order Summary</h5>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li
                                            className=" d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                            Items
                                            <span>{summarydetails.totalitems}</span>
                                        </li>
                                        <li className=" d-flex justify-content-between align-items-center border-0  px-0">
                                            Products
                                            <span>{summarydetails.totalProducts}</span>
                                        </li>

                                        <li
                                            className=" d-flex justify-content-between align-items-center border-0 px-0 ">
                                            Total
                                            <span>{summarydetails.totalAmount}</span>
                                        </li>
                                        <li
                                            className=" d-flex justify-content-between align-items-center px-0 mb-3">
                                            Discount
                                            <span>₹53.98</span>
                                        </li>
                                        <li
                                            className=" d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                            <div>
                                                <strong>Order Total </strong>

                                            </div>
                                            <span><strong>₹ {summarydetails.totalAmount}</strong></span>
                                        </li>
                                    </ul>

                                    <div className="button justify-content-center ">

                                        <button type="button " onClick={PlaceorderHendler} className="btn btn-warning btn-lg w-100" >Place your order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >


        </>
    )
}
