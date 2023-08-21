import React from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'

export default function ProductCard(props) {
  const { product } = props
  return (
    
      <div className='col'>
            <Link to={`/product/${product._id}`} >
                <div className="product-card " >

                    {/* <div className="badge">Hot</div> */}
                    <div className="product-tumb">
                        <img src={product.image} alt="" />
                    </div>
                    <div className="product-details">
                        <span className="product-catagory">{product.category}</span>
                        <h4><Link to={`/product/${product._id}`} >{product.title}</Link>
                        </h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus
                            nostrum!
                        </p>
                        <div className="product-bottom-details">
                        <Rating rating={product.rating} numReviews={product.NumReviews}/>
                            <div className="product-price">
                                <small>$96.00</small>${product.price}
                            </div>
                            <div className="product-links">
                                <a href='##'>
                                    <i className="bi bi-cart-check-fill"></i>
                                </a>
                                <a href='##'>
                                    <i className="bi bi-heart"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
         </div>
    
  )
}
