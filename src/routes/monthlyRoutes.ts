import express from "express";
import MonthlySummary from "../models/monthlySummary";

const router = express.Router();

//Get Monthly summary
 router.get('/', async (_req, res)=>{
     const summaries = await MonthlySummary.find().populate("userId", "name phoneNumber");
     res.json(summaries);
 })

 export default router;