"use client"; // Error components must be Client Components

import { JsonWebTokenError } from "jsonwebtoken";
import { ChevronsLeft } from "lucide-react";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div>
            <h1 className="mt-5 text-white text-xl text-center font-semibold">
                We are sorry...
            </h1>

            <div className="text-xs mt-4 text-[#deefef]">
                {error instanceof JsonWebTokenError &&
                error.name === "TokenExpiredError"
                    ? "Token expired"
                    : "An error occurred, please login again through your application."}
            </div>
            <div>
                <Link href={"/"} className="text-xs  text-[#ff6740]">
                    <ChevronsLeft className="inline-block" size={12} /> Back to
                    home.
                </Link>
            </div>
        </div>
    );
}
