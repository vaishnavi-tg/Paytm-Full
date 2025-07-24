import mongoose from "mongoose"
import { config } from "dotenv"

config()

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
            console.log("Connected to Paytm DB")
    }
    catch (error) {
        console.log(error)
    }
}

export { connectToDb }