"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib";
import { revalidatePath } from "next/cache";
import { ReadingStatus } from "../types";

export const addMangaToLib = async (mangaId: string, status: ReadingStatus) => {
    const session = await auth();
    if (!session) {
        throw new Error("Unauthorized");
    }
    try {
        if (status === "none") {
            await prisma.follow.delete({
                where: {
                    mangaId_userId: {
                        userId: session.user.id,
                        mangaId,
                    },
                },
            });
        } else {
            await prisma.follow.upsert({
                create: {
                    userId: session.user.id,
                    mangaId,
                    status,
                },
                update: {
                    status,
                    updatedAt: new Date(),
                },
                where: {
                    mangaId_userId: {
                        userId: session.user.id,
                        mangaId,
                    },
                },
            });
        }

        revalidatePath(`/(manga)/title/[id]/[name]`, "page");
    } catch (error) {
        console.log(error);
        throw error;
    }
};
