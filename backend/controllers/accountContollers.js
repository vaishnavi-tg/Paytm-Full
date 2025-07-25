import { Account } from "../models/accountModel.js"

const balance = async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    })
    console.log(account)
    console.log(req.userId)
    res.json({
        balance: account.balance
    })
}

export { balance }