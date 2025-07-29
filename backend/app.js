import express from "express"
import { config } from "dotenv"
import userRouter from "./routes/userRoutes.js"
import {accountRouter} from "./routes/accountRoutes.js"
import cors from "cors"

config()

const app = express()

app.use(express.json())
app.use(cors({origin:"http://localhost:5173",credentials:true}))

app.use("/api/v1/user", userRouter)
app.use("/api/v1/account",accountRouter)

try {
    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`)
    })
} catch (error) {
    console.log(error)
}

export default app