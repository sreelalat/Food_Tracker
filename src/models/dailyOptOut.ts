import mongoose, { Schema, Document} from "mongoose";

export interface DailyOptOut extends Document {
    userId: mongoose.Types.ObjectId;
    date: Date;
    // isOptedOut: boolean;
}

const dailyOptOutSchema = new Schema<DailyOptOut>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now, required: true },
    // isOptedOut: { type: Boolean, default: false, required: true }
})


export default mongoose.model<DailyOptOut>('DailyOptOut', dailyOptOutSchema);
