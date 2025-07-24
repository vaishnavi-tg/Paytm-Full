import express from "express"
import { config } from "dotenv"
import router from "./routes/userRoutes.js"
import cors from "cors"

config()

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/v1/user", router)

try {
    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`)
    })
} catch (error) {
    console.log(error)
}

export default app