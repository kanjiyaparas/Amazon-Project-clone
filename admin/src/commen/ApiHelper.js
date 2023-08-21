import axios from "axios";

class ApiHelper {
    constructor() {
        this.baseURL = "http://localhost:5000"

    }
    async GetUser() {
        return axios.get(`${this.baseURL}/admin/user`)
    }

    async Userlogin(data){
        return axios.post(`${this.baseURL}/admin/Login`,data)
    }

    async createuser(userDetails){
        return axios.post(`${this.baseURL}/admin/createuser`, userDetails)
    }

    async Removeuser(id){
        return axios.delete(`${this.baseURL}/admin/Remove/${id}`)
    }

    
    async Updateuser(id,data){
        return axios.put(`${this.baseURL}/admin/update/${id}`,data)
    }

    async OtpVerfy(data){
        return axios.post(`${this.baseURL}/admin/verify`,data)
    }

    async fetchmedia(){
         return axios.get(`${this.baseURL}/admin/showmedia`)
    }

    async uploadmedia(file){
        return axios.post(`${this.baseURL}/admin/upload`, file)
    }

    async Addproduct(data){
        return axios.post(`${this.baseURL}/admin/adminproduct`,data)
    }

  
}

const apiHelper = new ApiHelper()
export default apiHelper