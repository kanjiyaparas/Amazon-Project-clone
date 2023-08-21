import mongoose from "mongoose";

class OrderModel{
    constructor(){
        this.schema = new mongoose.Schema({
            products : { type: Array , required: true },
            user : {type: Object, required: true},
            paymentMethod : {type:String, required:true, default:"cod"},
            paymentStatus : {type:String , required:true, default:"pending"},
            totalPrice:{type:Number, required:true},
            shippingAddress : {type:Object, required:true},
            deliverdStatus : {type:String, required:true, default:"pending"},
            deliverdIn : {type:Date,required:true}

        },{timestamps:true})
    }
    
}

const order = new OrderModel()

const ordermodel = mongoose.model("tbl_order", order.schema)

export default ordermodel