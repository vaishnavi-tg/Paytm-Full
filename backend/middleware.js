import { JWT_SECRET } from "./config.js"
import jwt from "jsonwebtoken"

const authmiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(403).json({})
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, JWT_SECRET)

        req.userId = decoded.userId
        console.log(req.userId)
        next()

    } catch (error) {
        return res.status(403).json({})
    }
}

export { authmiddleware }