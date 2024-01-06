import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export { prisma };

export interface User {
    id: string;
    email: string;
    username: string;
    password: string | null;
    verified: boolean;
    image: string;
    verifyCode: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Follow {
    id: string;
    mangaId: string;
    userId: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
