import nodemailer from "nodemailer"


const Send =   (mailOption) =>{
    return new Promise((resolve,reject)=>{
        const Transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"kanjiyaparas2002@gmail.com",
                pass:"ppdiezqgrcjipyrg"
            }
        })
        
        Transporter.sendMail(mailOption, function(error,info){
            if(error){
                reject(error)
            }else{
                resolve("Email sent" + info.response)
            }
        })
    })
   
}


export default Send
