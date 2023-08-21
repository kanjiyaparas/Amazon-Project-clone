import mongoose from "mongoose"

class AdminUserModel {
    constructor() {
        this.schema = new mongoose.Schema({
            fullName: { type: String, required: true },
            email: { type: String, required: true, unique: true },
            password: { type: String, required: true },
            roll: { type: String, require: true},
            token : {type:String ,  default:null},
            otp:{type:String , default:null},
        }, { timestamps: true })
    }
}
const admin =  new AdminUserModel()

const adminUserModel = mongoose.model("tbl_Admin", admin.schema)

export default adminUserModel