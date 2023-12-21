import { User } from "@/models/user";
import React from "react";
import connectDb from "@/lib/mongodb";
import { verifyMailToken } from "@/lib/utils";
import VerifyNotification from "./VerifyNotification";
import { JsonWebTokenError } from "jsonwebtoken";
import { auth, update } from "@/auth";

type Props = {
    searchParams: {
        user_id?: string;
        token?: string;
    };
};

const page = async ({ searchParams }: Props) => {
    const { token } = searchParams;
    const session = await auth();

    console.log(session);
    // handle verify email if token exist
    if (token) {
        const decoded = (await verifyMailToken(token)) as {
            email: string;
            _id: string;
            username: string;
        };

        await connectDb();
        const user = await User.findById(decoded._id);

        // check saved token and current token
        if (!user || user.verifyCode !== token) {
            throw new Error("User not found or invalid token.");
        }

        if (user.verified) return <VerifyNotification type="verified" />;

        user.verified = true;
        await user.save();
        await update({ user: user.toJSON() });

        return <VerifyNotification type="verified" />;
    }

    if (!session?.user) throw new Error("Unauthorized");

    //check email has verified before
    if (session.user.verified) {
        console.log("verified");

        return (
            <VerifyNotification email={session.user.email} type="verified" />
        );
    }

    return <VerifyNotification email={session.user.email} type="sent-mail" />;
};

export default page;
