import { Bookmark, Eye, MessageSquare, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Manga, Statistic } from "../../../types";
import {
    getCoverArtFromManga,
    getDataByLocale,
    getDetailMangaLink,
    getMangaTitle,
    getTagName,
} from "@/lib/manga";
import { getImageUrl } from "@/services/mangadex";

type Props = {
    manga: Manga;
    statistic?: Statistic;
};

function RecentMangaListItem({ manga, statistic }: Props) {
    const coverArt = getCoverArtFromManga(manga);
    const title = getMangaTitle(manga);
    return (
        <div className="p-2 rounded bg-accent grid gap-x-2 grid-rows-[auto_1fr_auto] sm:grid-rows-[auto_auto_1fr] sm:grid-cols-[84px_1fr_auto] grid-cols-[64px_1fr_auto]">
            <Link
                href={getDetailMangaLink(manga)}
                className="block col-span-1 row-span-2 sm:row-span-3"
            >
                <Image
                    className="w-full rounded object-cover h-[85px] sm:h-[120px]"
                    src={getImageUrl(
                        "256",
                        manga.id,
                        coverArt?.attributes.fileName
                    )}
                    width={512}
                    height={728}
                    alt={title}
                />
            </Link>
            <div className="col-span-2">
                <div className="flex sm:items-center justify-between flex-col sm:flex-row ">
                    <Link
                        className="font-bold text-foreground"
                        href={getDetailMangaLink(manga)}
                    >
                        <div className="break-all line-clamp-1">{title}</div>
                    </Link>
                    <div className="flex  gap-y-2 gap-2 items-center justify-between">
                        <span className="text-sm flex items-center gap-1.5">
                            <Star size={16} />
                            {statistic?.rating?.average?.toFixed(2) ||
                                statistic?.rating?.bayesian?.toFixed(2) ||
                                "N/A"}
                        </span>
                        <span className="text-sm flex items-center gap-1.5">
                            <Bookmark size={16} />
                            {statistic?.follows || ""}
                        </span>
                        <span className="text-sm flex items-center gap-1.5">
                            <Eye size={16} />
                            N/A
                        </span>
                        <span className="text-sm flex items-center gap-1.5">
                            <MessageSquare size={16} />
                            {statistic?.comments?.repliesCount || ""}
                        </span>
                        <span className=" rounded hidden sm:flex bg-accent-10 px-1.5 py-1  items-center gap-1.5">
                            <span className="inline-block rounded-full w-2 h-2 bg-status-green"></span>
                            <span className="text-xs ">
                                {manga.attributes.status}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex col-span-2 items-center gap-2 flex-wrap mt-2">
                    <span className=" rounded flex sm:hidden bg-accent-10 px-1.5 sm:py-1  items-center gap-1.5">
                        <span className="inline-block rounded-full w-2 h-2 bg-status-green"></span>
                        <span className="text-xs ">
                            {manga.attributes.status}
                        </span>
                    </span>
                    {manga.attributes.tags.map((tag) => (
                        <Link
                            key={tag.id}
                            href={"#"}
                            className="text-[0.625rem] font-semibold uppercase text-foreground"
                        >
                            {getTagName(tag)}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="col-span-3 sm:col-span-2 text-sm mt-2 line-clamp-4">
                {getDataByLocale(manga.attributes.description)}
            </div>
        </div>
    );
}

export default RecentMangaListItem;
