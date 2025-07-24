import { Router } from "express";
import {Signup} from "../controllers/userControllers.js"

const router = Router()

router.post("/signup",Signup)

// router.post("/signin",Signin)

export default router