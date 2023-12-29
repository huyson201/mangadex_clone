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
import MangaStatus from "../MangaStatus/MangaStatus";
import { formatNumber } from "@/lib/utils";

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
                            {formatNumber(statistic?.follows || 0) || ""}
                        </span>
                        <span className="text-sm flex items-center gap-1.5">
                            <Eye size={16} />
                            N/A
                        </span>
                        <span className="text-sm flex items-center gap-1.5">
                            <MessageSquare size={16} />
                            {formatNumber(
                                statistic?.comments?.repliesCount || 0
                            ) || ""}
                        </span>
                    </div>
                    <div>
                        <MangaStatus
                            variant={manga.attributes.status}
                            title={manga.attributes.status}
                        />
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default SearchResultItem;
