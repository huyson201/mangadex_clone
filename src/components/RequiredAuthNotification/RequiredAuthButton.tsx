"use client";
import { SING_UP_URL } from "@/constants";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
type Props = {};

const RequiredAuthButton = (props: Props) => {
    const t = useTranslations("common");
    return (
        <div className="flex justify-center gap-2 mt-4">
            <Button onClick={() => signIn()} variant={"primary"}>
                {t("signInBtn")}
            </Button>
            <Link
                href={SING_UP_URL}
                className={cn(buttonVariants({ variant: "secondary" }))}
            >
                {t("registerBtn")}
            </Link>
        </div>
    );
};

export default RequiredAuthButton;
