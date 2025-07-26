import { Router } from "express";
import { Signup, Signin, updateBody, getUsers } from "../controllers/userControllers.js"
import { authmiddleware } from "../middleware.js";

const userRouter = Router()

userRouter.post("/signup", Signup)

userRouter.post("/signin", Signin)

userRouter.put("/update",authmiddleware, updateBody)

userRouter.get("/users",getUsers)

export default userRouter