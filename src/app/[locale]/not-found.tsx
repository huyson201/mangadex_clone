"use client";
import Image from "next/image";
import Link from "next/link";
import catBook from "@/assets/cat-books.svg";
import { Button } from "@/components/ui/button";
import { HOME_URL } from "@/constants";
export default function NotFound() {
    return (
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
                <h2 className="text-xl sm:text-3xl font-semibold">Not Found</h2>
                <p className="">Could not find requested resource</p>
                <Button asChild variant={"primary"} className="rounded-sm">
                    <Link href={HOME_URL}>Return Home</Link>
                </Button>
            </div>
        </div>
    );
}
