"use client";
import React from "react";

import { useParams, usePathname } from "next/navigation";

type Props = {
    children?: React.ReactNode;
};

const ExcludeLoginRegisterWrapper = ({ children }: Props) => {
    const pathname = usePathname();
    const { locale } = useParams();
    const isMatch = ["/login", "/register", "/verify-email"].some((value) =>
        pathname.replace(`/${locale}`, "").startsWith(value)
    );

    if (isMatch) return null;
    return <>{children}</>;
};

export default ExcludeLoginRegisterWrapper;
