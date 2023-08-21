import express from "express"
import mediacontroller from "./Media/MediaController.js"
import usercontroller from "./User/UserController.js"
import adminproductcontroller from "./Product/AdminProductcontroller.js"

const AdminRouter = express.Router()

AdminRouter.post("/upload", mediacontroller.GetMedia)
AdminRouter.get("/showmedia", mediacontroller.Showmedia)
AdminRouter.post("/createuser" , usercontroller.createUser)
AdminRouter.post("/Login" , usercontroller.LoginUser)
AdminRouter.get("/user" , usercontroller.Getuser)
AdminRouter.delete("/Remove/:id",usercontroller.Removeuser)
AdminRouter.put("/update/:id" , usercontroller.Updateuser)
AdminRouter.post("/verify" , usercontroller.OtpVerfy)
AdminRouter.post("/adminproduct", adminproductcontroller.Adminproduct)

export default AdminRouter