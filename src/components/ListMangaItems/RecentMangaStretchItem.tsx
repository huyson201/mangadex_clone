import { Bookmark, Eye, MessageSquare, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Manga, Statistic } from "../../../types";
import {
    getCoverArtFromManga,
    getDataByLocale,
    getMangaTitle,
    getTagName,
} from "@/lib/manga";
import { getImageUrl } from "@/services/mangadex";

type Props = {
    manga: Manga;
    statistic?: Statistic;
};

function RecentMangaStretchItem({ manga, statistic }: Props) {
    const coverArt = getCoverArtFromManga(manga);
    const title = getMangaTitle(manga);

    return (
        <div className="flex gap-2 bg-accent rounded p-2">
            <Link href={"#"} className="block w-[80px] sm:w-[150px] ">
                <Image
                    className="w-full rounded "
                    src={getImageUrl(
                        "512",
                        manga.id,
                        coverArt?.attributes.fileName
                    )}
                    alt={title}
                    width={512}
                    height={728}
                />
            </Link>
            <div className="flex-1">
                <div className="text-base font-bold  text-foreground">
                    {title}
                </div>
                <div className="flex flex-wrap gap-y-2 items-center justify-between mt-2">
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
                <div className="flex items-center gap-2 flex-wrap mt-2">
                    <span className=" rounded flex sm:hidden bg-accent-10 px-1.5 sm:py-1  items-center gap-1.5">
                        <span className="inline-block rounded-full w-2 h-2 bg-status-green"></span>
                        <span className="text-xs ">Ongoing</span>
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
                <div className="text-sm mt-2 line-clamp-5 md:line-clamp-6 ">
                    {getDataByLocale(manga.attributes.description)}
                </div>
            </div>
        </div>
    );
}

export default RecentMangaStretchItem;
