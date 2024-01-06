import { User, prisma } from "@/lib";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { signOut } from "./auth";
import { SIGN_IN_URL } from "./constants";

declare module "next-auth" {
    export interface Session {
        user: Omit<User, "password">;
    }
}
declare module "next-auth/jwt" {
    export interface JWT extends Omit<User, "password"> {}
}

export default {
    providers: [
        CredentialsProvider({
            credentials: {
                username: {},
                password: {},
            },
            async authorize(credentials, request) {
                const { username, password } = credentials;
                if (!username || !password) return null;
                try {
                    const existedUser = await prisma.user.findFirst({
                        where: {
                            OR: [{ email: username }, { username: username }],
                        },
                    });

                    if (!existedUser)
                        throw new Error("email or password invalid");
                    const matchPassword = await bcrypt.compare(
                        password as string,
                        existedUser.password || ""
                    );

                    if (!matchPassword)
                        throw new Error("email or password invalid");
                    return { ...existedUser, password: undefined };
                } catch (error) {
                    throw error;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user, account, trigger, session }) {
            if (trigger === "update") {
                token = { ...token, ...session.user };
                return token;
            }

            if (user) {
                await signOut({ redirect: false });
                return { ...token, ...user } as any;
            }
            return { ...token };
        },
        session({ session, token }) {
            return { ...session, user: token as any };
        },
    },
    pages: {
        signIn: SIGN_IN_URL,
    },
} satisfies NextAuthConfig;
