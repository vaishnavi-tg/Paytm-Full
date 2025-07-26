import mongoose from "mongoose"
import { Account } from "../models/accountModel.js"

const balance = async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    })
    res.json({
        balance: account.balance
    })
}

const transfer = async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    const account = await Account.findOne({ userId:req.userId}).session(session);
    console.log(account)
    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: req.body.to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    await session.commitTransaction();

    res.json({
        message: "Transfer successful"
    })
}
export { balance, transfer }