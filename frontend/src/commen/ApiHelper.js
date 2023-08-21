import axios from 'axios'
import Header from '../Component/Header'

class ApiHelper {
  
 
    constructor(){
        this.basUrl ="http://localhost:5000"
        this.token=localStorage.getItem("token")

    }

    fetchProduct(){
        return axios.get(this.basUrl + '/product')
    }

    fetchProductById(id){
        return axios.get(this.basUrl + '/product/'+ id)
    }

    userLogin(data){
        return axios.post(this.basUrl + '/user/Login', data)
    }

    userRegister(data){
        return axios.post(this.basUrl + '/user/signup', data)
    }

    fetchCart(product){
        return axios.post(this.basUrl + "/Addtocart",{product:product})
    }

    Placeorder(orderDetails){
        return axios.post(this.basUrl+"/user/order", orderDetails, {headers:{token:this.token}})
    }

    PaymentVerify(details){
        return axios.post(this.basUrl+"/payment/verify",details, {headers : {token:this.token}})
    }
     OtpVerify(data){
        return axios.post(`${this.basUrl}/verify`,data)
    }
  
 }

 const apiHelper = new ApiHelper()

 export default apiHelper