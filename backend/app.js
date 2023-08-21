import  express  from "express";
import productcontroller from "./product/Productcontroller.js";
import cors from 'cors';
import connectDB from "./connection.js";
import userController from "./User/Usercontroller.js";
import {} from "dotenv/config.js"
import ordercontroller from "./Order/OrderController.js";
import authcontroller from "./Auth/Auth.js";
import mediacontroller from "./Admin/Media/MediaController.js";
import fileUpload from "express-fileupload";
import AdminRouter from "./Admin/AdminRouter.js";
const app = express()
app.use(cors())
app.use(express.json())
app.use(fileUpload())

app.use("/upload" , express.static("./Upload"))

connectDB()

app.get('/',(req,res)=>{
  return  res.status(200).send({message:"server is ready"})
})

app.get('/product',productcontroller.getProducts)
app.get("/product/:id",productcontroller.getProductById)
app.post("/Addtocart", productcontroller.getCart)
// app.get("/product/insert/many", productcontroller.insertProducts)
// app.post("/user", userController.inserUser)
app.post("/user/Login", userController.userLogin)
app.post("/verify",userController.OtpVerify)
app.post("/user/signup", userController.userRegister)
app.post("/user/order",authcontroller.CreateOrderAuth, ordercontroller.createOrder)
app.get("/userorders", ordercontroller.Getorder)
app.get("/userorder/:id",authcontroller.CreateOrderAuth,ordercontroller.GetorderById)
app.post("/payment/verify", authcontroller.CreateOrderAuth, ordercontroller.PaymentVerify)


// app.post("/upload", mediacontroller.GetMedia)



app.use("/admin",AdminRouter)

app.listen(5000, ()=>{
    console.log('server at http://localhost:5000')
})