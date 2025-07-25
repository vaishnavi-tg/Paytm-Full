import { Router } from "express";
import { Signup, Signin, updateBody, getUsers } from "../controllers/userControllers.js"

const userRouter = Router()

userRouter.post("/signup", Signup)

userRouter.post("/signin", Signin)

userRouter.put("/update",updateBody)

userRouter.get("/users",getUsers)

export default userRouter