import React, { useEffect, useState } from 'react'
import ProductCard from '../Component/ProductCard';
// import product from '../Data';
import apiHelper from '../commen/ApiHelper';
import Loader from '../Component/Loader';

export default function Homescreen() {
  const [products, setProduct] = useState([])
  const [isLoading, setisLoading] = useState(false)

  const getProducts = async () => {
    try {
      setisLoading(true)
      const result = await apiHelper.fetchProduct()
      setisLoading(false)
      if (result.status === 200) {
        console.log(result)
        setProduct(result.data.product)
      }
    } catch (error) {
      setisLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (

    <>
      <Loader loading={isLoading} />
      <div className='container py-3 '>
        <p className='animate'>Welcome to my Amazon</p>
        <div className='d-flex mt-3 flex-wrap gap-3 justify-content-md-start justify-content-center'>

          {products && products.map((product) => (<ProductCard key={product._id} product={product}></ProductCard>))}


        </div>
      </div>
    </>

  )
}
