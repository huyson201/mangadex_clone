"use server";

import { auth } from "@/auth";
import connectDb from "@/lib/mongodb";
import { Follow } from "@/models/Follow";
import { ReadingStatus } from "../../types";
import { revalidatePath } from "next/cache";

export const addMangaToLib = async (
    mangaId: string,
    status: ReadingStatus,
    revalidateUrl: string
) => {
    const session = await auth();
    if (!session) {
        throw new Error("Unauthorized");
    }
    try {
        await connectDb();

        if (status === "none") {
            await Follow.findOneAndDelete({
                userId: session.user._id,
                mangaId,
            });
        } else {
            await Follow.findOneAndUpdate(
                { userId: session.user._id, mangaId },
                {
                    $set: {
                        status: status,
                    },
                },
                { upsert: true, new: true }
            );
        }

        revalidatePath(revalidateUrl, "page");
    } catch (error) {
        console.log(error);
        throw error;
    }
};
