import { Bookmark, Eye, MessageSquare, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Manga, Statistic } from "../../types";
import {
    createTagLink,
    getCoverArtFromManga,
    getDataByLocale,
    getDetailMangaLink,
    getLangFlagUrl,
    getMangaTitle,
    getTagName,
    getTagsWithGroupContent,
} from "@/lib/manga";
import { getImageUrl } from "@/services/mangadex";
import { formatNumber } from "@/lib/utils";
import Tag from "../Tag/Tag";
import MangaStatus from "../MangaStatus/MangaStatus";
import TagCollapse from "../Tag/TagCollapse";

type Props = {
    manga: Manga;
    statistic?: Statistic;
};

function RecentMangaStretchItem({ manga, statistic }: Props) {
    const coverArt = getCoverArtFromManga(manga);
    const title = getMangaTitle(manga);
    const contentTag = getTagsWithGroupContent(manga.attributes.tags);
    const flag = getLangFlagUrl(manga.attributes.originalLanguage);
    const isDoujinshi = manga.relationships.some(
        (relation) => relation.related === "doujinshi"
    );
    return (
        <div className="flex gap-2 bg-accent rounded p-2">
            <Link href={getDetailMangaLink(manga)} className="block w-1/4   ">
                <Image
                    className=" object-cover w-full  rounded  "
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
            <div className="w-3/4">
                <Link
                    href={getDetailMangaLink(manga)}
                    className="text-base line-clamp-2 font-bold  text-foreground"
                >
                    {flag && (
                        <Image
                            src={flag}
                            width={24}
                            height={24}
                            className="inline-block mr-1"
                            alt={manga.attributes.originalLanguage}
                        />
                    )}
                    {title}
                </Link>
                <div className="flex  gap-y-2 items-center justify-between mt-2">
                    <span className="text-sm flex items-center gap-1.5">
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
                        {statistic?.comments?.repliesCount || ""}
                    </span>
                    <MangaStatus
                        className="sm:flex hidden"
                        variant={manga.attributes.status}
                        title={manga.attributes.status}
                    />
                </div>
                <TagCollapse variant={"collapse"} className="mt-2">
                    <MangaStatus
                        className="flex sm:hidden"
                        variant={manga.attributes.status}
                        title={manga.attributes.status}
                    />
                    {manga.attributes.contentRating === "suggestive" && (
                        <Tag variant={"warning"} className="px-1">
                            {manga.attributes.contentRating}
                        </Tag>
                    )}
                    {contentTag.map((tag) => (
                        <Tag asChild key={tag.id} variant={"danger"}>
                            <Link className="px-1" href={createTagLink(tag)}>
                                {getTagName(tag)}
                            </Link>
                        </Tag>
                    ))}
                    {isDoujinshi && (
                        <Tag variant={"purple"} className="px-1">
                            Doujinshi
                        </Tag>
                    )}

                    {manga.attributes.tags.map((tag) => {
                        if (tag.attributes.group === "content") return null;
                        return (
                            <Tag asChild key={tag.id} variant={"none"}>
                                <Link
                                    className="px-1"
                                    href={createTagLink(tag)}
                                >
                                    {getTagName(tag)}
                                </Link>
                            </Tag>
                        );
                    })}
                </TagCollapse>

                <div className="text-sm mt-2 line-clamp-5 md:line-clamp-6 ">
                    {getDataByLocale(manga.attributes.description)}
                </div>
            </div>
        </div>
    );
}

export default RecentMangaStretchItem;
