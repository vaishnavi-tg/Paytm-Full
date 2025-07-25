import { Router } from "express";
import { Signup, Signin, updateBody, getUsers } from "../controllers/userControllers.js"

const router = Router()

router.post("/signup", Signup)

router.post("/signin", Signin)

router.put("/update",updateBody)

router.get("/users",getUsers)

export default router