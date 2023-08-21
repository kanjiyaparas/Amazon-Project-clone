import bcrypt from "bcrypt"
import userModel from "./UserModel.js"
import jwt from "jsonwebtoken"
import Validator from "./Validator.js"
import Randomstring from "randomstring"
import Send from "../Admin/Sendotp/Sendotp.js"

class UserController{
    constructor(){}
    //    async  inserUser(req, res){
    //         try {
    //            const {firstname, lastname, email, Confirmpassword, isAdmin} = req.body
    //            const password = bcrypt.hashSync(req.body.password, 8)
    //            console.log(password)
    //            if (!password) {
    //             return res.status(500).send({message:"Something went wrong"})
    //            }
    //            req.body.password= password
    //            const result= await userModel.create(req.body)
    //            if(result){
    //             return res.status(200).send({message:"success", user:result})
    //            }
    //            return res.status(500).send({message:"Something went wrong"})

    //         } catch (error) {
    //            if(error.message.includes("E11000")){
    //             return res.status(500).send({message:"email is already exist"})
    //            }
    //             return res.status(500).send({message:"Ineternal server error"})
    //         }
    //     }

        async userLogin(req, res){
            try {
                const {email, password} = req.body

                const ValidationResult = Validator(req.body , "Login")

                if(ValidationResult >0){
                    return res.status(400).send({message:"Validation Error", errors:ValidationResult})
                }


                const Otp = Randomstring.generate({
                    charset: "numeric",
                    length: 6
                })
    
    
                const userData = {
                    email,
                    otp: bcrypt.hashSync(Otp, 8),
                    password
                }
    
                const mailOption = {
                    from: "kanjiyaparas2002@gmail.com",
                    to: userData.email,
                    subject: "nodemailer test",
                    html: `<p>Dear user Your One Time Password-${Otp}`
                }

                const sendmail = await Send(mailOption)


                if (sendmail && sendmail.match("OK")[0] === "OK") {


                    let user = await  userModel.findOne({email: userData.email})
                    if(!user){ return res.status(400).send({message:"Auth error", errors:[{key:"email", message:"Email is Not Exist"}]})}

                    user = user._doc
                    
                    if(!(bcrypt.compareSync(password, user.password))){
                        return res.status(400).send({message:"Auth error", errors:[{key:"password", message:"password is Not Exist"}] })
                    }

                    let update = await userModel.updateOne({ email: email }, { otp: userData.otp })

                    delete user.password
    
                    const token = jwt.sign(user,process.env.JWT_SECRATE,{expiresIn : "30d"})
    
                    if(!token) return res.status(500).send({message:"Something went wrong"})


                    return res.status(200).send({message:"Success", user:{...user, token:token}})

                }

                return res.status(500).send({ message: "something went wrong with sending otp" })

            } catch (error) {
                console.log(error)
                return res.status(500).send({message:"Internal serever error"})
            }
            
        }

        async OtpVerify(req, res) {
            try {
                const { otp, email } = req.body;
    
                if (!otp) return res.status(400).send({ message: "Missing Dependency Otp" });
                if (!email) return res.status(400).send({ message: "Missing Dependency Email" });
    
    
                const user = await userModel.findOne({ email });
    
                if (!user) {
    
                    return res.status(404).send({ message: "User not found" });
                }
    
    
                const isOtpValid = await bcrypt.compare(otp, user.otp);
                console.log(isOtpValid)
    
                if (isOtpValid) {
    
                    return res.status(200).send({ message: "OTP verification successful" });
                } else {
                    // OTP verification failed
                    return res.status(400).send({ message: "validation Error", validationResult:[{key: "otp", message:"otp is invalid"}] });
                }
    
            } catch (error) {
                console.log(error);
                return res.status(500).send({ message: "Internal Server Error" });
            }
        }

        async userRegister(req, res){
            try {

                const ValidationResult = Validator(req.body , "Register")
                console.log(ValidationResult)

                if(ValidationResult.length > 0){
                    return res.status(400).send({message:"Validation Error", errors:ValidationResult})
                }
                
                if(!req.body.password){
                    return res.status(400).send({message:"Something Went Wrong"})
                }
                const password = bcrypt.hashSync(req.body.password, 8)

                let user = await userModel.create({...req.body, password:password})
                if(!user){
                    return res.status(400).send({message:""})
                }
                user= user._doc
                delete user.password

                const token = jwt.sign(user,process.env.JWT_SECRATE,{expiresIn : "30d"})
                if(!token) return res.status(500).send({message:"Something went wrong"})
                return res.status(200).send({message:"success", user:{...user, token:token}})
            } catch (error) {
                if(error.message.includes("E11000") || error.code === "11000"){
                    return res.status(500).send({message:"Validator error" , error:[{key:"email" , message:"Email is Already Exist "}]})
                   }
                return res.status(500).send({message:"Internal Server Eroor"})
            }
        }
}

const userController= new UserController()

export default userController