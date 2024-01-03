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
import { cn } from "@/lib/utils";
import Tag, { tagVariants } from "../Tag/Tag";
import TagCollapse from "../Tag/TagCollapse";
import MangaStatus from "../MangaStatus/MangaStatus";

type Props = {
    manga: Manga;
    statistic?: Statistic;
};

function RecentMangaListItem({ manga, statistic }: Props) {
    const coverArt = getCoverArtFromManga(manga);
    const title = getMangaTitle(manga);
    const tagsWithGroupContent = getTagsWithGroupContent(manga.attributes.tags);
    const flag = getLangFlagUrl(manga.attributes.originalLanguage);
    const isDoujinshi = manga.relationships.some(
        (relation) => relation.related === "doujinshi"
    );

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
                        <div className="break-all line-clamp-1">
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
                        </div>
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

                        <MangaStatus
                            className="hidden sm:flex"
                            variant={manga.attributes.status}
                            title={manga.attributes.status}
                        />
                    </div>
                </div>
            </div>
            <div className="col-span-2">
                <TagCollapse className="mt-0" variant={"normal"}>
                    <div className="flex  items-center gap-2 flex-wrap mt-1.5">
                        <MangaStatus
                            variant={manga.attributes.status}
                            title={manga.attributes.status}
                            className="sm:hidden"
                        />
                        {manga.attributes.contentRating === "suggestive" && (
                            <Tag className="px-1" variant={"warning"}>
                                Suggestive
                            </Tag>
                        )}
                        {tagsWithGroupContent.map((tag) => (
                            <Tag asChild key={tag.id} variant={"danger"}>
                                <Link
                                    href={createTagLink(tag)}
                                    key={tag.id}
                                    className="px-1"
                                >
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
                                <Tag key={tag.id} variant={"none"}>
                                    <Link
                                        href={createTagLink(tag)}
                                        className="px-1"
                                    >
                                        {getTagName(tag)}
                                    </Link>
                                </Tag>
                            );
                        })}
                    </div>
                </TagCollapse>
            </div>
            <div className="col-span-3 sm:col-span-2 text-sm mt-1.5 line-clamp-4">
                {getDataByLocale(manga.attributes.description)}
            </div>
        </div>
    );
}

export default RecentMangaListItem;
