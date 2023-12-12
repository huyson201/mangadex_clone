import { Eye, MessageSquare, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

function RecentMangaListItem({}: Props) {
    return (
        <div className="p-2 rounded bg-accent grid gap-x-2 grid-rows-[auto_1fr_auto] sm:grid-rows-[auto_auto_1fr] grid-cols-[64px_1fr_auto]">
            <Link
                href={"#"}
                className="block col-span-1 row-span-2 sm:row-span-3"
            >
                <Image
                    className="w-full rounded"
                    src={
                        "https://mangadex.org/covers/4413d794-e0da-4a6e-b61a-afd5758914e6/7188e434-cc6e-43bb-9469-3cc7b7c60dfe.jpg.256.jpg"
                    }
                    width={512}
                    height={728}
                    alt="art"
                />
            </Link>
            <div className="col-span-2">
                <div className="flex sm:items-center justify-between flex-col sm:flex-row ">
                    <Link className="font-bold text-foreground" href={"#"}>
                        Hanninmae no Koibito
                    </Link>
                    <div className="flex flex-wrap gap-y-2 gap-2 items-center justify-between">
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
                </div>
            </div>
            <div>
                <div className="flex col-span-2 items-center gap-2 flex-wrap mt-2">
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
            </div>
            <div className="col-span-3 sm:col-span-2 text-sm mt-2">
                One day, when I was making school supplies in the art room, a
                very scary-looking girl was staring at me...!? Crafts girl vs.
                art boy romantic comedy!!
            </div>
        </div>
    );
}

export default RecentMangaListItem;
