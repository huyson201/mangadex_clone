import { Bookmark, Eye, MessageSquare, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Manga, Statistic } from "../../../types";
import {
    getCoverArtFromManga,
    getDetailMangaLink,
    getMangaTitle,
} from "@/lib/manga";
import { getImageUrl } from "@/services/mangadex";

type Props = {
    manga: Manga;
    statistic?: Statistic;
};

function SearchResultItem({ manga, statistic }: Props) {
    const coverArt = getCoverArtFromManga(manga);
    const title = getMangaTitle(manga);
    return (
        <Link href={getDetailMangaLink(manga)}>
            <div className="flex gap-x-2 bg-accent p-1.5 rounded hover:bg-accent-hover-2 transition-colors">
                <Image
                    className="w-14 h-20 object-cover rounded"
                    src={getImageUrl(
                        "256",
                        manga.id,
                        coverArt?.attributes.fileName
                    )}
                    alt={title}
                    width={256}
                    height={342}
                />
                <div className="flex justify-between flex-col">
                    <div className="line-clamp-2 font-bold text-lg">
                        {title}
                    </div>
                    <div className="flex flex-wrap gap-y-2 items-center gap-x-2">
                        <span className="text-sm flex items-center gap-1.5 text-primary">
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
                    </div>
                    <div>
                        <span className=" rounded inline-flex bg-accent-10 px-1.5 py-1  items-center gap-1.5">
                            <span className="inline-block rounded-full w-2 h-2 bg-status-green"></span>
                            <span className="text-xs ">
                                {manga.attributes.status}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default SearchResultItem;
