import React from "react";
import { Chapter, Manga } from "@/types";
import { getDetailMangaLink, getLangFlagUrl, getMangaTitle } from "@/lib/manga";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/services/mangadex";
import ChapterItem from "@/components/ChapterList/ChapterItem";

type Props = {
    manga: Manga;
    chapters: Chapter[];
};

const HistoryStretchItem = ({ manga, chapters }: Props) => {
    const title = getMangaTitle(manga);
    const coverArt = manga.relationships.find(
        (relation) => relation.type === "cover_art"
    );
    const flag = getLangFlagUrl(manga.attributes.originalLanguage);
    return (
        <div className="bg-accent p-2 rounded  grid grid-rows-[auto_1fr]  grid-cols-[50px_1fr] sm:grid-cols-[140px_1fr] gap-x-1 sm:gap-x-3">
            <div className="order-2 sm:order-1 sm:row-span-2">
                <Link href={getDetailMangaLink(manga)}>
                    <Image
                        className="w-full rounded"
                        src={getImageUrl(
                            "256",
                            manga.id,
                            coverArt?.attributes.fileName
                        )}
                        width={512}
                        height={728}
                        alt={`${title}`}
                    />
                </Link>
            </div>
            <div className="order-1 sm:order-2 mb-1 col-span-2 sm:col-span-1 row-span-1">
                <Link
                    href={getDetailMangaLink(manga)}
                    className="font-bold  text-sm sm:text-base pb-1 border-b border-[rgba(128,128,128,0.5)]  flex items-center gap-2"
                >
                    {flag && (
                        <Image
                            className="w-6 "
                            src={flag}
                            width={24}
                            height={24}
                            alt={title}
                        ></Image>
                    )}
                    <div className="break-all line-clamp-1 w-full ">
                        {title}
                    </div>
                </Link>
            </div>
            <div className="order-3 divide-y divide-background">
                <div className="divide-y divide-background">
                    {chapters.map((chapter) => (
                        <ChapterItem key={chapter.id} chapter={chapter} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HistoryStretchItem;
