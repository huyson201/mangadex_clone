"use client";

import Image from "next/image";
import catBook from "@/assets/cat-books.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HOME_URL } from "@/constants";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div>
            <div>
                <div className="text-center">
                    <Image
                        className="w-full max-w-[400px] inline-block"
                        src={catBook}
                        width={600}
                        height={600}
                        alt="cat-book"
                    />
                </div>
                <div className="text-center space-y-2">
                    <h2 className="text-xl sm:text-3xl font-semibold">
                        Something went wrong!
                    </h2>
                    <p className="">{error.message}</p>
                    <div className="space-x-2">
                        <Button
                            variant={"secondary"}
                            asChild
                            className="rounded-sm"
                        >
                            <Link href={HOME_URL}>Return Home</Link>
                        </Button>
                        <Button
                            variant={"primary"}
                            className="rounded-sm"
                            onClick={() => reset()}
                        >
                            Try again
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
