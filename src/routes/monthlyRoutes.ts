import express from "express";
import MonthlySummary from "../models/monthlySummary";

const router = express.Router();

//Get Monthly summary
 router.get('/', async (_req, res)=>{
     const summaries = await MonthlySummary.find().populate("userId", "name phoneNumber");
     const formattedData = summaries.map((item: any) => ({
       _id: item._id,
       month: item.month,
       userId: item.userId?._id,
       name: item.userId?.name,
       phoneNumber: item.userId?.phoneNumber,
       totalAmount: item.totalAmount,
       totalOptOutDays: item.totalOptOutDays,
       __v: item.__v,
     }));
     res.json(formattedData);
 })

 export default router;