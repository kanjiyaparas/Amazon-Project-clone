import React, { useEffect, useState } from 'react'
import "../screen/Productscreen.css"
import { Link, useNavigate, useParams } from 'react-router-dom';
import Rating from '../Component/Rating';
import apiHelper from '../commen/ApiHelper';
import Zoom from 'react-img-zoom'
import Loader from '../Component/Loader';
import MessageBox from '../Component/MessageBox';


export default function Productscreen(props) {
   const {setcartItems,cartItems} = props
   const navigate = useNavigate();
    const { id } = useParams();
    const [isLoading, setisLoading] = useState(false)
    const [Product, setProduct]=useState([])
    const [err,seterr] = useState("")
    const [qty, setqty] = useState(1)

    const getProduct = async()=>{ 
       
        try {
            setisLoading(true)
           const result = await apiHelper.fetchProductById(id)
           setisLoading(false)
           if(result.status === 200){
            setProduct(result.data.product)
           } 
        } catch (error) {
            setisLoading(false)
           if(error.response && error.response.data && error.response.data.message){
                seterr(error.response.data.message)
           }else{
            seterr(error.message)
           }
        }
    }
    useEffect(()=>{
        getProduct()
    }, [])

    const AddToCart = ()=>{
        try {
        
          const findIndex = cartItems.findIndex((x) => x.product === id)
       

          if(findIndex > -1){
            cartItems[findIndex].qty = qty
          }else{
            cartItems.push({product: id, qty:qty})
          }
          localStorage.setItem("cartItems", JSON.stringify(cartItems))
          setcartItems(cartItems)
          navigate("/Addtocart")
            
        } catch (error) {
            console.log(error.message)
        }
       
    }
    return (
        
        <div className="card-wrapper productScreen">
            {
                err && err.length > 0 ? (
                    <MessageBox message={err}/>
                ) : <>
                
            <Loader loading={isLoading}/>
            <div className="card">
                {/* card left */}
                <div className="product-imgs">
                    <div className="img-display">
                        <div className="img-showcase">
                            {Product.image ?(<Zoom
                                img={Product.image}
                                zoomScale={2}
                                width={600}
                                height={600}
                            />):(
                                <p>no image available</p>
                            ) }
                            
                            
                           
                        </div>
                    </div>
                    {/* <div className="img-select">

                       
                        {Product.images !== undefined ? (
                            Product.images.map((x, index) => (
                                <div className="img-item" key={index}>
                                    <Link to="##" data-id={1}>
                                        <img src={x} alt="N/A" />
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p style={{ color: "ff726f", margin: "auto", padding: "10px" }}>Photos Not Available</p>
                        )}

                    </div> */}
                </div>
                {/* card right */}
                <div className="product-content">
                    <h2 className="product-title">{Product.title}</h2>
                    <div className='d-flex justify-content-between conpniy_name'>

                        <Link to="/" className="product-link"> {Product.brand}</Link>
                        <span className='float-right In_stock'>
                            {Product.countInstock <= 0 ? (
                                <p className='Out_stock'><span>Out of stock</span> : Unavailable </p>
                            ) : (
                                <p className='In_stock'><span>In stock</span> : Available</p>
                            )}
                        </span>
                    </div>


                    <div className="product-rating">

                        <span> <Rating rating={Product.rating} numReviews={Product.NumReviews}/></span>
                    </div>
                    <div className="product-price">
                        <p className="last-price">
                            Old Price: <span>Rs.{Product.price + 100}</span>
                        </p>
                        <p className="new-price">
                            New Price: <span>Rs.{Product.price} (Lees -100)</span>
                        </p>
                    </div>
                    <div className="product-detail">
                        <h2>about this item: </h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eveniet
                            veniam tempora fuga tenetur placeat sapiente architecto illum soluta
                            consequuntur, aspernatur quidem at sequi ipsa!
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur,
                            perferendis eius. Dignissimos, labore suscipit. Unde.
                        </p>
                        <ul>
                            <li> Color:

                                <ul className="variant">
                                    <li className='colors_iteam1'></li>
                                    <li className='colors_iteam2'></li>
                                    <li className='colors_iteam3'></li>
                                    <li className='colors_iteam4'></li>
                                </ul>

                            </li>
                            <li> Size :
                                <ul className="variant">
                                    <li>S</li>
                                    <li>L</li>
                                    <li>XL</li>
                                    <li>2XL</li>
                                    <li>3XL</li>
                                </ul>

                            </li>

                            <li> Category:<span> { Product.category}</span></li>
                            <li> Shipping Area:<span> All over the world</span></li>
                            <li>Shipping Fee:<span> Free</span></li>
                        </ul>
                    </div>
                    <div className="purchase-info">
                    <h3 style={{color:"lightblue", marginTop:"5px",marginLeft:"-15px"}}>Quantity</h3>
                        <div className='d-flex justify-content-center align-item-center ms-4'>
                       
                                <button onClick={()=> setqty(qty-1)} disabled={qty <= 0} className='btn fw-bold' style={{background:"none", border:"none", color:"black",marginLeft:"-30px"}}>-</button>
                                <span className='btn fw-bold' style={{background:"none", border:"none", color:"black", marginTop:"3px", marginLeft:"-10px"}}>
                                    {qty}
                                </span>
                                <button onClick={()=> setqty(qty+1)} disabled={qty >= Product.countInstock} className='btn fw-bond' style={{background:"none", border:"none", color:"black", marginLeft:"-10px", marginTop:"2px"}}>+</button>
                                </div>

                        {/* <label for='Quantity'> Quantity:
                            <input type="number" id="Quantity" min={0} max={Product.countInstock} defaultValue={0} disabled={qty <= 0}/>
                        </label> */}
                            <div className='cf'>
                        <button type="button" className="btn" disabled={Product.countInstock<=0} onClick={AddToCart}>
                            Add to Cart <i className="bi bi-cart" />
                        </button>
                        </div>

                    </div>
                    <div className="social-links">
                      
                        <Link to="##">
                            <i className="bi bi-facebook"></i>
                        </Link>
                        <Link to="##">
                            <i className="bi bi-twitter" />
                        </Link>
                        <Link to="##">
                            <i className="bi bi-instagram" />
                        </Link>
                        <Link to="https://wa.me/1XXXXXXXXXX" target="_blank">
                            <i className="bi bi-whatsapp" />
                        </Link>
                        <Link to="##">
                            <i className="bi bi-pinterest" />
                        </Link>
                    </div>
                </div>
            </div>
                </>
            }

        </div >



    )
}
