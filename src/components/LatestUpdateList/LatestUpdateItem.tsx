import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegCommentAlt } from "react-icons/fa";
import { Button } from "../ui/button";
import { Chapter, Manga, Statistic } from "../../types";
import {
    getChapter,
    getImageUrl,
    getMangaById,
    getStatistics,
} from "@/services/mangadex";
import {
    getChapterTitle,
    getDetailChapterLink,
    getDetailMangaLink,
    getLangFlagUrl,
    getMangaTitle,
    slugify,
    timeAgoFormat,
} from "@/lib/utils";
import { Users } from "lucide-react";
type Props = {
    statistic: Statistic;
    manga: Manga;
};

async function LatestUpdateItem({ statistic, manga }: Props) {
    const chapter = (
        await getChapter(manga.attributes.latestUploadedChapter, [
            "scanlation_group",
            "user",
        ])
    ).result.data;

    const group = chapter.relationships.find(
        (relation) => relation.type === "scanlation_group"
    );
    const coverArt = manga.relationships.find(
        (relation) => relation.type === "cover_art"
    );
    const chapterLang = getLangFlagUrl(chapter.attributes.translatedLanguage);
    return (
        <div className="flex gap-x-2">
            <div className="w-14">
                <Link
                    href={getDetailMangaLink(manga)}
                    className="block w-full h-full "
                >
                    <Image
                        src={getImageUrl(
                            "256",
                            manga.id,
                            coverArt!.attributes.fileName
                        )}
                        alt="manga-name"
                        width={256}
                        height={341}
                        className="rounded shadow-md h-full object-cover"
                    />
                </Link>
            </div>
            <div className="w-[calc(100%_-_56px)] space-y-1">
                <Link
                    href={getDetailMangaLink(manga)}
                    className="gap-x-1 inline-flex"
                >
                    <h6 className="line-clamp-1 break-all font-bold">
                        {getMangaTitle(manga)}
                    </h6>
                </Link>
                <div className="flex  w-full items-center justify-between">
                    <div className="flex gap-1">
                        {chapterLang && (
                            <Image
                                className="w-5"
                                src={chapterLang}
                                width={20}
                                height={20}
                                alt={chapter.attributes.translatedLanguage}
                            />
                        )}
                        <span className="line-clamp-1">
                            <Link href={getDetailChapterLink(chapter)}>
                                {getChapterTitle(chapter)}
                            </Link>
                        </span>
                    </div>
                    <Button
                        className="w-auto gap-1.5 h-auto px-1.5 py-1 hover:bg-accent-2-hover"
                        variant={"ghost"}
                        size={"xs"}
                    >
                        <FaRegCommentAlt />
                        {statistic.comments?.repliesCount && (
                            <span>{statistic.comments.repliesCount}</span>
                        )}
                    </Button>
                </div>

                <div className="flex  w-full items-center justify-between">
                    <div className="flex items-center  gap-1 text-foreground">
                        <Users size={18} />
                        <Link
                            href={"/"}
                            className="text-sm inline-block px-1 rounded hover:bg-accent-2-hover"
                        >
                            {!group ? "No Group" : group.attributes.name}
                        </Link>
                    </div>
                    <span className="text-sm font-medium">
                        {timeAgoFormat(chapter.attributes.updatedAt)}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default LatestUpdateItem;
