import mongoose from "mongoose";

const connectDb=async()=>{
    try {
        const connectionInstance=await mongoose.connect(process.env.MONGODB_URI)
        console.log(`\n Mongo DB connected successfully ${connectionInstance}`)
    } catch (error) {
        console.log("Mongo DB connection error :",error)
    }
}

export default connectDb;