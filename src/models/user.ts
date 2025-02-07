import mongoose, { Schema, Document} from "mongoose";


export interface User extends Document {
    name: string;
    phoneNumber: string;
    createdAt: Date;
}

const userSchema = new Schema<User>({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
}); 

export default mongoose.model<User>('User', userSchema);