import express, { Request, Response } from "express";
import DailyOptOut  from "../models/dailyOptOut";
import User from "../models/user";
import MonthlySummary from "../models/monthlySummary";

const router = express.Router();

//add individaul optout status
router.post("/add", async (req :any, res: any) => {
    try {
        const {userId, date, isOptedOut} = req.body;
        //Ensure user exist
        const user = await User.findById(userId);
        if(!user)
        return res.status(404).json({message: "User not found"});

        //Parse date to extract year - month
        const optoutDate = new Date(date);
        const year = optoutDate.getFullYear();
        const month = (optoutDate.getMonth() + 1).toString().padStart(2, '0');
        const monthString = `${year}-${month}`;

        //if isOptedOut is true, update totalOptOutDays in monthlySummary
        if(isOptedOut){
            const existingOptout = await DailyOptOut.findOne({userId, date});

            if(existingOptout){
                return res.status(400).json({ message: "Already opted out for this day" });
            }
            
            await new DailyOptOut({userId, date}).save();
            await updateMonthlySummary(userId, monthString, 1);
            res.status(201).json({message: "Opted out successfully"});
        } else {
            const deletedOptOut = await DailyOptOut.findOneAndDelete({userId, date});

            if(!deletedOptOut)
                return res.status(400).json({message: "No opt-out record found for this day"});
            
            await updateMonthlySummary(userId, monthString, -1);
            res.status(200).json({ message: "Opt-out canceled successfully" });
        }

        // const optOut = new DailyOptOut({userId, date, isOptedOut});
        // await optOut.save();
        // res.status(201).json({message: "Opted out added successfully"});
    } catch (error) {
        console.error("Error handling opt-out:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// get opt out data
router.get("/", async (_req, res) => {
   const data = await DailyOptOut.find().populate("userId", "name phoneNumber");
   // Transform data to remove userId key and merge name & email directly
   const formattedData = data.map((item: any) => ({
    _id: item._id,
    name: item.userId?.name,
    phoneNumber: item.userId?.phoneNumber,
    date: item.date,
    isOptedOut: item.isOptedOut,
    __v: item.__v,
  }));
   res.json(formattedData);
});



//Helper function to update monthly summary.
const updateMonthlySummary = async (userId: string, month: string, change: number) => {
    const monthlySummary = await MonthlySummary.findOneAndUpdate(
        { userId, month },
        { $inc: { totalOptOutDays: change, totalAmount: change * 50 } },
        { upsert: true, new: true }
        );
        console.log(`Updated Monthly Summary for User ${userId}:`, monthlySummary);
}

export default router;