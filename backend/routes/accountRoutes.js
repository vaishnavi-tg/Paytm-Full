import { Router } from "express";
import { balance } from "../controllers/accountContollers.js";
import { authmiddleware } from "../middleware.js"

const accountRouter = Router()

accountRouter.get("/balance", authmiddleware, balance)

export { accountRouter }