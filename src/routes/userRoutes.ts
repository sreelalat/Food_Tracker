import express from "express";
import User from "../models/user";

const router = express.Router();

//Add new user
router.post("/add", async (req, res) => {
    try {
        const {name, phoneNumber} = req.body;
        const user = new User({name, phoneNumber});
        await user.save();
        res.status(201).json({message: "User added successfully"});

    } catch (error) {
        res.status(500).json({message: "Failed to add user"});
    }
})

//Get users
router.get('/', async (_req, res)=>{
    const users = await User.find();
    res.json(users)
})


export default router;