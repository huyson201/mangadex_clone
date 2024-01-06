import { auth, update } from "@/auth";
import { User, prisma } from "@/lib";
import { verifyMailToken } from "@/lib/utils";
import VerifyNotification from "./VerifyNotification";
type Props = {
    searchParams: {
        user_id?: string;
        token?: string;
    };
};

const page = async ({ searchParams }: Props) => {
    const { token } = searchParams;
    const session = await auth();

    // handle verify email if token exist
    if (token) {
        const decoded = (await verifyMailToken(token)) as {
            email: string;
            _id: string;
            username: string;
        };

        const user = await prisma.user.findUnique({
            where: { id: decoded._id },
        });

        // check saved token and current token
        if (!user || user.verifyCode !== token) {
            throw new Error("User not found or invalid token.");
        }

        if (user.verified) return <VerifyNotification type="verified" />;

        user.verified = true;
        await prisma.user.update({
            where: { id: user.id },
            data: user,
        });
        await update({
            user: { ...user, password: undefined } as Partial<
                Omit<User, "password">
            >,
        });

        return <VerifyNotification type="verified" />;
    }

    if (!session?.user) throw new Error("Unauthorized");

    //check email has verified before
    if (session.user.verified) {
        return (
            <VerifyNotification email={session.user.email} type="verified" />
        );
    }

    return <VerifyNotification email={session.user.email} type="sent-mail" />;
};

export default page;
