import React from "react";

import { auth } from "@/auth";
import RequiredAuthButton from "./RequiredAuthButton";

type Props = {
    children?: React.ReactNode;
};

const RequiredAuthNotification = async ({ children }: Props) => {
    const session = await auth();
    if (session) {
        return <>{children}</>;
    }

    return (
        <div className="flex items-center justify-center flex-col py-6">
            <div className="font-bold">
                You need to sign in to access this page.
            </div>
            <RequiredAuthButton />
        </div>
    );
};

export default RequiredAuthNotification;
