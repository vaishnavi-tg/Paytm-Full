import { Router } from "express";
import { balance, transfer } from "../controllers/accountContollers.js";
import { authmiddleware } from "../middleware.js"

const accountRouter = Router()

accountRouter.get("/balance", authmiddleware, balance)
accountRouter.post("/transfer", authmiddleware, transfer)

export { accountRouter }