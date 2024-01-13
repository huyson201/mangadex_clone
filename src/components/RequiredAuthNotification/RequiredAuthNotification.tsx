import React from "react";

import { auth } from "@/auth";
import { getTranslations } from "next-intl/server";
import RequiredAuthButton from "./RequiredAuthButton";

type Props = {
    children?: React.ReactNode;
};

const RequiredAuthNotification = async ({ children }: Props) => {
    const [session, t] = await Promise.all([auth(), getTranslations("common")]);
    if (session && session.user.verified) {
        return <>{children}</>;
    }

    return (
        <div className="flex items-center justify-center flex-col py-6">
            <div className="font-bold">{t("requiredLoginMessage")}</div>
            <RequiredAuthButton />
        </div>
    );
};

export default RequiredAuthNotification;
