import mongoose from "mongoose";

class ProductModel{
    constructor(){
        this.schema=  new mongoose.Schema({
            alias:{type:String, require:true, unique:true},
            title:{type:String, require:true },
            category:{type:String, require:true},
            image:{type:String, require:true},
            price:{type:Number, require:true},
            rating:{type:Number, require:true},
            NumReviews:{type:Number, require:true},
            description:{type:String, require:true, default:null},
            countInstock:{type:Number, require:true}
        })
    }
}

const product = new ProductModel()
const productModel = mongoose.model('tbl_product', product.schema)

export default productModel