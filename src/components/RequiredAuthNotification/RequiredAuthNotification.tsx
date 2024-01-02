"use client";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { SING_UP_URL } from "@/constants";
import { cn } from "@/lib/utils";

type Props = {};

const RequiredAuthNotification = (props: Props) => {
    return (
        <div className="flex items-center justify-center flex-col">
            <div className="font-bold">
                You need to sign in to access this page.
            </div>
            <div className="flex justify-center gap-2 mt-4">
                <Button onClick={() => signIn()} variant={"primary"}>
                    Sign in
                </Button>
                <Link
                    href={SING_UP_URL}
                    className={cn(buttonVariants({ variant: "secondary" }))}
                >
                    Register
                </Link>
            </div>
        </div>
    );
};

export default RequiredAuthNotification;
