import mongoose, { Document } from "mongoose";
import avatar from "@/assets/avatar.png";
export interface IUser extends Document {
    email: string;
    username: string;
    password: string;
    verified: boolean;
    image: string;
    verifyCode?: string;
    createdAt?: string;
    updatedAt?: string;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        email: {
            type: String,
            require: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        verifyCode: {
            type: String,
            required: false,
        },
        image: {
            type: String,
            default: avatar.src,
        },
    },
    {
        timestamps: true,
    }
);

export const User =
    (mongoose.models?.User as mongoose.Model<IUser>) ||
    mongoose.model<IUser>("User", userSchema);
