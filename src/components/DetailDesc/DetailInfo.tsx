import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
    className?: string;
};

const DetailInfo = ({ className }: Props) => {
    return (
        <div className={cn("flex flex-wrap gap-4", className)}>
            <div>
                <div className=" font-bold">Author</div>
                <Link
                    className="bg-accent hover:bg-primary text-xs rounded py-1 px-2 mt-2 inline-block transition-colors"
                    href={"/"}
                >
                    Kataoka Jinsei
                </Link>
            </div>
            <div>
                <div className=" font-bold">Artist</div>
                <Link
                    className="bg-accent hover:bg-primary text-xs rounded py-1 px-2 mt-2 inline-block transition-colors"
                    href={"/"}
                >
                    Kondou Kazuma
                </Link>
            </div>
            <div>
                <div className=" font-bold">Genres</div>
                <div className="flex items-center flex-wrap gap-2">
                    <Link
                        className="bg-accent hover:bg-primary text-xs rounded py-1 px-2 mt-2 inline-block transition-colors"
                        href={"/"}
                    >
                        Action
                    </Link>
                    <Link
                        className="bg-accent hover:bg-primary text-xs rounded py-1 px-2 mt-2 inline-block transition-colors"
                        href={"/"}
                    >
                        Comedy
                    </Link>
                    <Link
                        className="bg-accent hover:bg-primary text-xs rounded py-1 px-2 mt-2 inline-block transition-colors"
                        href={"/"}
                    >
                        Drama
                    </Link>
                    <Link
                        className="bg-accent hover:bg-primary text-xs rounded py-1 px-2 mt-2 inline-block transition-colors"
                        href={"/"}
                    >
                        Horror
                    </Link>
                    <Link
                        className="bg-accent hover:bg-primary text-xs rounded py-1 px-2 mt-2 inline-block transition-colors"
                        href={"/"}
                    >
                        Psychological
                    </Link>
                    <Link
                        className="bg-accent hover:bg-primary text-xs rounded py-1 px-2 mt-2 inline-block transition-colors"
                        href={"/"}
                    >
                        Mystery
                    </Link>
                    <Link
                        className="bg-accent hover:bg-primary text-xs rounded py-1 px-2 mt-2 inline-block transition-colors"
                        href={"/"}
                    >
                        Tragedy
                    </Link>
                </div>
            </div>
            <div className="w-full">
                <div className=" font-bold">Final Chapter</div>
                <div className="text-sm">
                    Chapter 57, Chapter 56, Chapter 55
                </div>
            </div>
        </div>
    );
};

export default DetailInfo;
