import mongoose from "mongoose"
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

const transfer = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        let { amount, to } = req.body;

        amount = Number(amount);
        if (isNaN(amount) || amount <= 0) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Invalid amount" });
        }

        if (!mongoose.isValidObjectId(to)) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Invalid recipient userId format" });
        }

        // Validate sender's userId
        if (!mongoose.isValidObjectId(req.userId)) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Invalid sender userId format" });
        }

        const account = await Account.findOne({ userId: req.userId }).session(session);
        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Insufficient Balance" });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Recipient account not found" });
        }
        

        // Perform the transfer
        await Account.updateOne(
            { userId: req.userId },
            { $inc: { balance: -amount } }
        ).session(session);

        await Account.updateOne(
            { userId: to },
            { $inc: { balance: amount } }
        ).session(session);

        await session.commitTransaction();
        session.endSession();

        res.json({ msg: "Transfer Successful" });

    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.error("Transfer Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export { balance, transfer }