import { Eye, MessageSquare, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

function RecentMangaStretchItem({}: Props) {
    return (
        <div className="flex gap-2 bg-accent rounded p-2">
            <Link href={"#"} className="block w-[80px] sm:w-[150px] ">
                <Image
                    className="w-full rounded "
                    src={
                        "https://mangadex.org/covers/4413d794-e0da-4a6e-b61a-afd5758914e6/7188e434-cc6e-43bb-9469-3cc7b7c60dfe.jpg.512.jpg"
                    }
                    alt="art"
                    width={512}
                    height={728}
                />
            </Link>
            <div className="flex-1">
                <div className="text-base font-bold  text-foreground">
                    Hanninmae no Koibito
                </div>
                <div className="flex flex-wrap gap-y-2 items-center justify-between mt-2">
                    <span className="text-sm flex items-center gap-1.5">
                        <Star size={16} />
                        8.95
                    </span>
                    <span className="text-sm flex items-center gap-1.5">
                        <Eye size={16} />
                        N/A
                    </span>
                    <span className="text-sm flex items-center gap-1.5">
                        <MessageSquare size={16} />
                        20
                    </span>
                    <span className=" rounded hidden sm:flex bg-accent-10 px-1.5 py-1  items-center gap-1.5">
                        <span className="inline-block rounded-full w-2 h-2 bg-status-green"></span>
                        <span className="text-xs ">Ongoing</span>
                    </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap mt-2">
                    <span className=" rounded flex sm:hidden bg-accent-10 px-1.5 sm:py-1  items-center gap-1.5">
                        <span className="inline-block rounded-full w-2 h-2 bg-status-green"></span>
                        <span className="text-xs ">Ongoing</span>
                    </span>
                    <Link
                        href={"#"}
                        className="text-[0.625rem] font-semibold uppercase text-foreground"
                    >
                        Action
                    </Link>
                    <Link
                        href={"#"}
                        className="text-[0.625rem] font-semibold uppercase text-foreground"
                    >
                        Comedy
                    </Link>
                    <Link
                        href={"#"}
                        className="text-[0.625rem] font-semibold uppercase text-foreground"
                    >
                        School life
                    </Link>
                    <Link
                        href={"#"}
                        className="text-[0.625rem] font-semibold uppercase text-foreground"
                    >
                        SLICE OF LIFE
                    </Link>
                </div>
                <div className="text-sm mt-2 line-clamp-5 md:line-clamp-6 ">
                    One day, when I was making school supplies in the art room,
                    a very scary-looking girl was staring at me...!? Crafts girl
                    vs. art boy romantic comedy!! One day, when I was making
                    school supplies in the art room, a very scary-looking girl
                    was staring at me...!? Crafts girl vs. art boy romantic
                    comedy!!
                </div>
            </div>
        </div>
    );
}

export default RecentMangaStretchItem;
