import Image from "next/image";
import Link from "next/link";
import React from "react";
import ChapterItem from "../ChapterList/ChapterItem";
import { Chapter, Manga } from "../../../types";
import { getDetailMangaLink, getLangFlagUrl, getMangaTitle } from "@/lib/utils";

type Props = {
    manga: Manga;
    chapters: Chapter[];
};

function LatestMangaListitem({ manga, chapters }: Props) {
    const title = getMangaTitle(manga);
    const flag = getLangFlagUrl(manga.attributes.originalLanguage);

    return (
        <div className="bg-accent p-2 rounded ">
            <div className="mb-1">
                <Link
                    href={getDetailMangaLink(manga)}
                    className="font-bold text-sm sm:text-base pb-1 border-b border-[rgba(128,128,128,0.5)]  flex items-center gap-2"
                >
                    {flag && (
                        <Image
                            className="w-6"
                            src={flag}
                            width={24}
                            height={24}
                            alt={title}
                        ></Image>
                    )}
                    {title}
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
