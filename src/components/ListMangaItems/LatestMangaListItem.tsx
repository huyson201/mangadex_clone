import Image from "next/image";
import Link from "next/link";
import React from "react";
import jpFlag from "@/assets/flags/jp.svg";
import ChapterItem from "../ChapterList/ChapterItem";
import { Chapter, Manga } from "../../../types";
import { getDetailMangaLink, getMangaTitle } from "@/lib/utils";

type Props = {
    manga: Manga;
    chapters: Chapter[];
};

async function LatestMangaListitem({ manga, chapters }: Props) {
    const title = getMangaTitle(manga);

    return (
        <div className="bg-accent p-2 rounded ">
            <div className="mb-1">
                <Link
                    href={getDetailMangaLink(manga)}
                    className="font-bold text-sm sm:text-base pb-1 border-b border-[rgba(128,128,128,0.5)]  flex items-center gap-2"
                >
                    <Image
                        className="w-6 "
                        src={jpFlag}
                        alt={`${title}`}
                    ></Image>
                    {Object.values(title)}
                </Link>
            </div>
            <div className="divide-y divide-background">
                {chapters.map((chapter) => (
                    <ChapterItem key={chapter.id} chapter={chapter} />
                ))}
            </div>
        </div>
    );
}

export default LatestMangaListitem;
