import Image from "next/image";
import React from "react";
import jpFlag from "@/assets/flags/jp.svg";
import Link from "next/link";
import ChapterItem from "../ChapterList/ChapterItem";
import { Chapter, Manga } from "../../../types";
import { getImageUrl, getMangaById } from "@/services/mangadex";
import { getDetailMangaLink, getMangaTitle } from "@/lib/utils";
type Props = {
    manga: Manga;
    chapters: Chapter[];
};

const LatestMangaStretchItem = async ({ manga, chapters }: Props) => {
    const mangaWithCoverArt = await getMangaById(manga.id, ["cover_art"]);
    const coverAt = mangaWithCoverArt?.result.data.relationships.find(
        (relation) => relation.type === "cover_art"
    );

    const title = getMangaTitle(manga);
    return (
        <div className="bg-accent p-2 rounded  grid grid-rows-[auto_1fr]  grid-cols-[50px_1fr] sm:grid-cols-[140px_1fr] gap-x-1 sm:gap-x-3">
            <div className="order-2 sm:order-1 sm:row-span-2">
                <Link href={getDetailMangaLink(manga)}>
                    <Image
                        className="w-full rounded"
                        src={getImageUrl(
                            "256",
                            manga.id,
                            coverAt?.attributes.fileName
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
                    <Image className="w-6 " src={jpFlag} alt={title}></Image>
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

export default LatestMangaStretchItem;
