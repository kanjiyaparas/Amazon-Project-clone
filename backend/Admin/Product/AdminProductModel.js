import mongoose from "mongoose";

class AdminProductModel{
    constructor(){
        this.schema = new mongoose.Schema({
            title:{type:String, required:true },
            alias:{type:String , required:true},
            countInstock:{type:Number, required:true},
            Brand:{type:String, required:true},
            Featureimg:{type: mongoose.Types.ObjectId, required:true},
            relevantimg:{type: Array, required:true},
            price:{type:Number, required:true},
            description:{type:String, required:true, default:null},
            discount :{type:Number , default:null},
            totalprice : {type:Number , required:true}
        },{timestamps:true})


        this.product = new mongoose.model("tbl_adminproduct", this.schema)

    }

    Addproduct(data){
        return this.product.create(data)
    }


}

const AdminProduct = new AdminProductModel()
export default AdminProduct