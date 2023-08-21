import jwt from "jsonwebtoken"

class AuthController{
    async CreateOrderAuth(req,res,next){
        try {
            const {token} = req.headers
            console.log(token)
            if(!token) return res.status(400).send({message:"Unauthrized"})

            return jwt.verify(token,process.env.JWT_SECRATE, (err,data)=>{
                if(data){
                    req.body.userInfo = data
                    return next()
                }
                if(err){
                    console.log(err)
                    return res.status(400).send({message:"Unauthrized"})
                }
            })
        } catch (error) {
            console.log(error)
            return res.status(500).send({message:"Internal server error"})
        }
    }
}



const authcontroller = new AuthController()

export default authcontroller