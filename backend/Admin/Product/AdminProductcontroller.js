import AdminProduct from "./AdminProductModel.js"

class AdminProductcontroller{


    async Adminproduct(req,res){
        try {
            const { title, price, description, discount, countInstock, totalprice, Brand, Featureimg, relevantimg } = req.body

            if (!title) return res.status(400).send({ message: "Missing Dipendency Of Title" })
            if (!price) return res.status(400).send({ message: "Missing Dipendency Of Price" })
            if (!description) return res.status(400).send({ message: "Missing Dipendency Of Discription" })
            if (!discount) return res.status(400).send({ message: "Missing Dipendency Of Discount" })
            if (!countInstock) return res.status(400).send({ message: "Missing Dipendency Of CountInStock" })
            if (!totalprice) return res.status(400).send({ message: "Missing Dipendency Of TotalPrice" })
            if (!Brand) return res.status(400).send({ message: "Missing Dipendency Of Brand" })
            if (!Featureimg) return res.status(400).send({ message: "Missing Dipendency Of FeatureImages" })
            if (!relevantimg) return res.status(400).send({ message: "Missing Dipendency Of RelevantImages" })


            const result = await AdminProduct.Addproduct(req.body)

            if(result){
             return  res.status(200).send({message:"success", Product:result})
            }
            return res.status(500).send({message:"something went wrong"})

        } catch (error) {
            console.log(error)
            return res.status(500).send({message:"internal server error"})
        }
    }
}


const adminproductcontroller = new AdminProductcontroller()

export default  adminproductcontroller