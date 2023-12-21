import mongoose, { Document } from "mongoose";
import avatar from "@/assets/avatar.png";

export interface ITag extends Document {
    name: string;
    id: string;
    group: string;
    createdAt?: string;
    updatedAt?: string;
}

const tagSchema = new mongoose.Schema<ITag>(
    {
        id: {
            type: String,
            require: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        group: {
            type: String,
            enum: ["genre", "theme", "format", "content"],
        },
    },
    {
        timestamps: true,
    }
);

export const Tag =
    (mongoose.models?.Tag as mongoose.Model<ITag>) ||
    mongoose.model<ITag>("Tag", tagSchema);
