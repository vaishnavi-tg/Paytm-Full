import zod from "zod"
import { User } from "../models/userModel.js"
import { JWT_SECRET } from "../config.js"

const signupSchema = zod.object({
    email: zod.string(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()
})
const Signup = async (req, res) => {
    const body = req.body
    const parsed = signupSchema.safeParse(body)

    if (!parsed.success) {
        return res.status(411).json({
            "msg": "Incorrect signup Inputs"
        })

    }
    const user = User.findOne({
        email: req.body.email
    })

    if (user._id) {
        return res.status(411).json({
            msg: "Email already taken"
        })
    }

    const dbUser = await User.create(body)
    const token = jwt.sign({
        userId: dbUser._id
    }, JWT_SECRET)
    res.json({
        msg: "User created successfully",
        token: token
    })

}

export { Signup }