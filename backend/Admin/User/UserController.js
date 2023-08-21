import jwt from "jsonwebtoken"
import adminUserModel from "./UserModel.js"
import bcrypt from "bcrypt"
import Validator from "../../User/Validator.js"
import Randomstring from "randomstring"
import Send from "../Sendotp/Sendotp.js"


class UserController {
    async createUser(req, res) {
        try {
            const { email, fullName, roll, password } = req.body

            const Validationresult = Validator(req.body, "Admin-Register")
            if (Validationresult.length > 0) {
                return res.status(400).send({ message: "Validation Error", errors: Validationresult })
            }

            const userCode = Randomstring.generate({
                charset: "numeric",
                length: 2
            })


            const userName = `${fullName}@${userCode}`

            const userData = {
                email,
                fullName, 
                roll: roll || undefined,
                userName,
                password
            }

         

                const Encodepassword = bcrypt.hashSync(userData.password, 8)

                if (!Encodepassword) {
                    return res.status(500).send({ message: "something went wrong" })
                }

                userData.password = Encodepassword

                const token = jwt.sign({ ...userData }, process.env.JWT_SECRATE, { expiresIn: "30d" })

                if (!token) return res.status(500).send({ message: "something went wrong" })

                let result = await adminUserModel.create({ ...userData, token: token })
                console.log(userData)

                if (!result) {
                    return res.status(500).send({ message: "something went wrong" })
                }

                let user = result._doc
                delete user.password

                return res.status(200).send({ message: "success", user: { ...user, token: token } })

         
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal Server Error" })
        }
    }


    async OtpVerfy(req, res) {
        try {
            const { otp, email } = req.body;

            if (!otp) return res.status(400).send({ message: "Missing Dependency Otp" });
            if (!email) return res.status(400).send({ message: "Missing Dependency Email" });


            const user = await adminUserModel.findOne({ email });

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


    async LoginUser(req, res) {
        try {
            const { email, password } = req.body

            const Validationresult = Validator(req.body, "login")

            if (Validationresult.length > 0) {
                return res.status(400).send({ message: "Validation Error", Validationresult: Validationresult })
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

                let user = await adminUserModel.findOne({ email: userData.email })

                if (!user) {
                    return res.status(400).send({ message: "Validation Error", ValidationResult: [{ key: "email", message: "Email not Found" }] })
                }
                let update = await adminUserModel.updateOne({ email: email }, { otp: userData.otp })

                user = user._doc


                if (!(bcrypt.compareSync(password, user.password))) {
                    return res.status(400).send({ message: "Validation Error", ValidationResult: [{ key: "password", message: "Password is not match" }] })
                }

                const token = jwt.sign({ ...user }, process.env.JWT_SECRATE, { expiresIn: "30d" })
                delete user.password

                if (!token) {
                    return res.status(500).send({ message: "Somthing went wrong" })
                }

                return res.status(200).send({ message: "Success", user: { ...user, token: token } })
            }

            return res.status(500).send({ message: "something went wrong with sending otp" })

        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal Server Error" })
        }
    }


    async Getuser(req, res) {
        try {
            const result = await adminUserModel.find({})

            if (!result) return res.status(400).send({ message: "something went wrong" })

            return res.status(200).send({ message: "success", result })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal Server Error" })
        }
    }

    async Removeuser(req, res) {
        try {
            const { id } = req.params

            const result = await adminUserModel.deleteOne({ _id: id })

            if (result) return res.status(200).send({ message: "Success" })

            return res.status(500).send({ message: "Something Went Wrong" })
        } catch (error) {
            return res.status(500).send({ message: "Internal Server Error" })
        }
    }

    async Updateuser(req, res) {
        try {
            const { id } = req.params
            const body = req.body

            const result = await adminUserModel.updateOne({ _id: id }, body)

            if (result.modifiedCount > 0 || result.matchedCount > 0) {
                return res.status(200).send({ message: "success", result })
            }

            return res.status(400).send({ message: "Something went wrong" })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal Server Error" })
        }
    }
}


const usercontroller = new UserController()

export default usercontroller
