"use client";
import React from "react";

type Props = {};
import LogoIcon from "@/assets/mangadex-logo.svg";
import LogoText from "@/assets/logo-text.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MANGA_DETAIL_BASE_URL } from "@/constants";

const Logo = (props: Props) => {
    const pathname = usePathname();
    return (
        <div className="flex items-center ml-3">
            <Image src={LogoIcon} alt="logo-icon" />
            <Image
                className={cn(
                    "logo ml-2 hidden  xs:inline-block",
                    pathname.startsWith(`${MANGA_DETAIL_BASE_URL}/`) &&
                        "sm:group-[:not(scrolling)]/navbar:filter sm:group-[:not(.scrolling)]/navbar:invert"
                )}
                src={LogoText}
                alt="logo-text"
            />
        </div>
    );
};

export default Logo;
