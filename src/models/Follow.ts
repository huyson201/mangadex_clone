import mongoose, { Document } from "mongoose";
import { IUser } from "./user";
import { ReadingStatus, readingStatusData } from "../../types";

export interface IFollow extends Document {
    userId: IUser["_id"];
    mangaId: string;
    status: ReadingStatus;
    createdAt?: string;
    updatedAt?: string;
}

const tagSchema = new mongoose.Schema<IFollow>(
    {
        userId: {
            required: true,
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        mangaId: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: readingStatusData,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Follow =
    (mongoose.models?.Follow as mongoose.Model<IFollow>) ||
    mongoose.model<IFollow>("Follow", tagSchema);
