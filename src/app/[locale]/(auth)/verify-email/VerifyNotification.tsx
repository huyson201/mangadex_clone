import { AlertTriangle, ChevronsLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
    email?: string;
    type: "verified" | "sent-mail";
};

const VerifyNotification = ({ email, type }: Props) => {
    if (type === "verified") {
        return (
            <div>
                <h1 className="mt-5 text-white text-xl text-center font-semibold">
                    You are already logged in.
                </h1>

                <div className="text-xs mt-4 text-[#deefef]">
                    You are already logged in.
                </div>
                <div>
                    <Link href={"/"} className="text-xs  text-[#ff6740]">
                        <ChevronsLeft className="inline-block" size={12} /> Back
                        to home.
                    </Link>
                </div>
            </div>
        );
    }
    return (
        <div className="pb-[5rem] sm:pb-16">
            <h1 className="mt-5 text-white text-xl text-center font-semibold">
                Email verification
            </h1>
            <div className="border-t-2 border-[#ec7a08] bg-[#36322f] text-[#d8a731] flex mt-6 p-4 gap-2">
                <AlertTriangle fill="#d8a731" color="#212328" size={32} />
                <span className="text-sm font-bold text-[#deefef]">
                    You need to verify your email address to activate your
                    account.
                </span>
            </div>
            <div className=" mt-1.5 text-xs text-[#deefef]">
                An email with instructions to verify your email address has been
                sent to your address {email}.
            </div>
            <div className="bg-[#2e2f37] px-5 text-center text-[#deefef] flex-col text-sm py-4 absolute w-full bottom-0 left-0">
                <div>
                    Haven&apos; received a verification code in your email?
                </div>
                <div>
                    <Link href={"/"} className="text-[#ff6740] hover:underline">
                        Click here
                    </Link>
                    to re-send the email.
                </div>
            </div>
        </div>
    );
};

export default VerifyNotification;
