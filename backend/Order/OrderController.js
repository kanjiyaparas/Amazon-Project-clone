import DeliverDay from "../constant.js";
import ordermodel from "./OrderModel.js";
import Razorpay from "razorpay"

function CreateRozorPayORder(options) {
    return new Promise((resolve, reject) => {

        var instance = new Razorpay({
            key_id: process.env.API_KEY,
            key_secret: process.env.KEY_SECRATE,
        });
        instance.orders.create(options, (err, order) => {
            if (err) return reject(err)
            resolve(order)
        })
    })
}

class OrderController {

    async createOrder(req,res){
       try {
        const {products, user,paymentMethod,shippingAddress,totalPrice} = req.body

    console.log(req.body)
      

        if(!products || products.length <= 0){
            return res.status(400).send({message:"Missing Dependency Product"})
        }

        if(!user){
            return res.status(400).send({message:"Missing Dependancy user"})
        }

        if(!shippingAddress){
            return res.status(400).send({message:"Missing Dependancy shippingAddress"})
        }

        if(!paymentMethod){
            return res.status(400).send({message:"Misssing Dependancy paymentMethod"})
        }

        const deliveryDate = new Date()

        deliveryDate.setDate(deliveryDate.getDate() + DeliverDay)

        const orderDetails = {
            products,
            paymentMethod,
            shippingAddress,
            user,
            deliverdIn: deliveryDate,
            totalPrice
        }
 console.log(orderDetails)
        let order = await ordermodel.create(orderDetails)
        order = { ...order._doc , RazorpayDetails :null}

        if(paymentMethod === "cod"){
            if(!order) return res.status(500).send({message:"something went wrong"})

            return res.status(200).send({message:"success",order})
        }else{
           const option ={
            amount : totalPrice * 100,
            currency : "INR",
            receipt : "rcpt_id_" + order._id
           } 

           const Razorpayresult = await CreateRozorPayORder(option)


           if(!Razorpayresult){
            return res.status(500).send({message:"something went wrong"})
           }

           order = {
            ...order, RazorpayDetails : {...Razorpayresult , apikey:process.env.API_KEY}
           }
           return res.status(200).send({message:"success" , order})
        }

       } catch (error) {
        console.log(error)

       }
    }

    async PaymentVerify(req, res) {
        const { razorpay_payment_id, razorpayOrderId, orderId } = req.body
        const instance = new Razorpay({
            key_id:process.env.API_KEY,
                key_secret:process.env.KEY_SECRATE,
            })
            
        try {
            const response = await instance.payments.fetch(razorpay_payment_id)

            if((response.status === "captured" || response.status === "authorized") && response.order_id === razorpayOrderId){

                const update = await ordermodel.updateOne({_id : orderId}, {paymentStatus: "verify"})
                if(update.modifiedCount > 0){
                    return res.status(200).send({message: "Success", orderId : orderId})
                }
                return res.status(500).send({message: "Somthing Went Wrong"})

            }else{
                await ordermodel.updateOne({_id : orderId}, {paymentStatus: "reject"})
                return res.status(400).send({message:"Payment Verification Failed"})
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send({message:"Internal Server Error"})
        }
    }
  

    async Getorder(req,res){
        try {
           const{id} = req.query
           console.log(req.query)
           const result = await ordermodel.find({"user._id":id})
           console.log(result)
          
           if(result) return res.status(200).send({message:"success", order:result})

           return res.status(500).send({message:"something went wrong"})
        } catch (error) {
            console.log(error)
            return res.status(500).send({message:"Internal server Error"})
        }
    }


    async GetorderById(req,res){
        try {
            const {id} = req.params
            console.log(id)

            if(!id){
                return res.status(400).send({message:"Bad Request"})
            }

            const result = await ordermodel.findById({_id : id})

            if(result){
                return res.status(200).send({message:"success", order:result})
            }

            return res.status(500).send({message:"something went wrong"})
        } catch (error) {
            return res.status(500).send({message:"Internal Server Error"})
        }
    }

}

const  ordercontroller = new OrderController()

export default ordercontroller

