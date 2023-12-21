import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import connectDb from "@/lib/mongodb";
import { User } from "./models/user";
import bcrypt from "bcryptjs";
import { signOut } from "./auth";
import { SIGN_IN_URL } from "./constants";
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
                await connectDb();
                const user = await User.findOne({
                    $or: [
                        {
                            email: username,
                        },
                        {
                            username: username,
                        },
                    ],
                });

                if (!user) throw new Error("email or password invalid");
                const matchPassword = await bcrypt.compare(
                    password as string,
                    user.password
                );
                if (!matchPassword)
                    throw new Error("email or password invalid");

                return { ...user.toJSON(), password: undefined };
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
