import mongoose, { Schema, Document} from "mongoose";

export interface MonthlySummary extends Document {
    userId: mongoose.Types.ObjectId;
    month: string;
    totalOptOutDays: number;
    totalAmount: number;
}

const MonthlySummarySchema = new Schema<MonthlySummary>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    month: {type: String, required: true},
    totalOptOutDays: {type: Number, default: 0},
    totalAmount: {type: Number, default: 0}
})

export default mongoose.model<MonthlySummary>('MonthlySummary', MonthlySummarySchema);