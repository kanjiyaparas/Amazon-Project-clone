import mongoose from "mongoose"

const connectDB = async()=>{
    try {
        const s = await mongoose.connect('mongodb://127.0.0.1:27017/amazona')
        console.log('db connection established')
    } catch (error) {
        console.log('db connection error')
    }
}
export default connectDB