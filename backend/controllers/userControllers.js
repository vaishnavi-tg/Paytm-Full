import zod, { success } from "zod"
import { User } from "../models/userModel.js"
import { JWT_SECRET } from "../config.js"
import jwt from "jsonwebtoken"
import { Account } from "../models/accountModel.js"
import bcrypt from "bcrypt";


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

    const user = await User.findOne({
        email: req.body.email
    })

    if (user) {
        return res.status(411).json({
            msg: "Email already taken"
        })
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

    const dbUser = await User.create({
        email: req.body.email,
        password: hashedPassword,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    })
    await Account.create({
        userId: dbUser._id,
        balance: 1 + Math.random() * 10000
    });


    const token = jwt.sign({
        userId: dbUser._id
    }, JWT_SECRET)

    res.json({
        msg: "User created successfully",
        token: token
    })

}

const signInSchema = zod.object({
    email: zod.string(),
    password: zod.string()
})

const Signin = async (req, res) => {
    const body = req.body
    const parsed = signInSchema.safeParse(body)

    if (!parsed.success) {
        return res.status(411).json({
            "msg": "Incorrect Inputs"
        })
    }

    const user = await User.findOne({
        email: req.body.email
    });

    if (user && await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET)

        res.json({
            token
        })
        return
    }

    res.status(411).json({
        msg: "Error while logging In"
    })
}

const updateSchema = zod.object({
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional()
})

const updateBody = async (req, res, authmiddledware) => {

    const body = req.body
    const parsed = updateSchema.safeParse(body)

    if (!parsed.success) {
        return res.status(411).json({
            msg: "Error while updating information"
        })
    }

    await User.updateOne({
        _id: req.userId
    }, req.body)

    return res.json({
        msg: "User updated successfully"
    })

}

const getUsers = async (req, res) => {
    const filter = req.query.filter || ""

    const users = await User.findOne({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
}

export { Signup, Signin, updateBody, getUsers }