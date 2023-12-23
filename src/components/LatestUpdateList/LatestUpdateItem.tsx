import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegCommentAlt } from "react-icons/fa";
import { Button } from "../ui/button";
import { FiUser } from "react-icons/fi";
import { Chapter, Manga, Statistic } from "../../../types";
import {
    getChapter,
    getImageUrl,
    getMangaById,
    getStatistics,
} from "@/services/mangadex";
import {
    getChapterTitle,
    getDetailMangaLink,
    slugify,
    timeAgoFormat,
} from "@/lib/utils";
import { Users } from "lucide-react";
type Props = {
    chapter: Chapter;
    statistic: Statistic;
};

async function LatestUpdateItem({ chapter, statistic }: Props) {
    const mangaId = chapter.relationships.find(
        (relation) => relation.type === "manga"
    )!.id;

    const [result] = await Promise.all([getMangaById(mangaId, ["cover_art"])]);

    const group = chapter.relationships.find(
        (relation) => relation.type === "scanlation_group"
    );

    const manga = result!.result.data;
    const coverArt = manga.relationships.find(
        (relation) => relation.type === "cover_art"
    );
    return (
        <div className="flex gap-x-2">
            <div className="w-14">
                <Link
                    href={`/title/${manga.id}/${slugify(
                        manga.attributes.title.en
                    )}`}
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
                <Link href={getDetailMangaLink(manga)}>
                    <h6 className="line-clamp-1 break-all font-bold">
                        {manga.attributes.title.en}
                    </h6>
                </Link>
                <div className="flex  w-full items-center justify-between">
                    <span className="line-clamp-1">
                        <Link href={"#"}>{getChapterTitle(chapter)}</Link>
                    </span>
                    <Button
                        className="w-auto gap-1.5 h-auto px-1.5 py-1 hover:bg-customs-accent-hover"
                        variant={"outline"}
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
                        <Users />
                        <Link
                            href={"/"}
                            className="text-sm inline-block px-1 rounded hover:bg-customs-accent-hover"
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
