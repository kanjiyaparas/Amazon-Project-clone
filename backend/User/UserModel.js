import mongoose from "mongoose";

class UserModel{
    constructor(){
        this.schema = new mongoose.Schema({
            firstname:{type:String, require:true, length:20},
            lastname:{type:String, require:true, length:20},
            email:{type:String, require:true, unique:true},
            password:{type:String, require:true},
            otp:{type:String , default:null},
            Confirmpassword:{type:String, require:true, length:20,},
            isAdmin:{type:Boolean, require:true, default:false}
        },{timestamps:true})
    }
}

const User = new UserModel()
const userModel = mongoose.model("tbl_User", User.schema)
export default userModel