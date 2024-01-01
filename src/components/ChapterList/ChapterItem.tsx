import { Clock, Eye, MessageSquare, User, Users } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Chapter } from "../../../types";
import {
    getChapterTitle,
    getDetailChapterLink,
    getLangFlagUrl,
    timeAgoFormat,
} from "@/lib/utils";
import { Button } from "../ui/button";
import Image from "next/image";

type Props = {
    chapter: Chapter;
};
function ChapterItem({ chapter }: Props) {
    const scanlation_groups = chapter.relationships.filter(
        (relation) => relation.type === "scanlation_group"
    );
    const user = chapter.relationships.find(
        (relation) => relation.type === "user"
    );
    const displayTitle = getChapterTitle(chapter);
    const flagUrl = getLangFlagUrl(chapter.attributes.translatedLanguage);

    return (
        <div className="bg-accent rounded">
            <div className="w-full px-2 py-1.5 bg-accent hover:bg-accent-hover-2 transition-colors  ">
                <div className="sm:gap-x-6 flex  justify-between sm:justify-start">
                    <Link
                        href={getDetailChapterLink(chapter)}
                        className="sm:flex-1 flex items-center  gap-2  text-xs sm:text-sm font-semibold text-foreground"
                    >
                        {flagUrl && (
                            <Image
                                className="w-5 sm:w-6"
                                src={flagUrl}
                                width={24}
                                height={24}
                                alt={chapter.attributes.translatedLanguage}
                            />
                        )}

                        <div className="break-all line-clamp-1">
                            {displayTitle}
                        </div>
                    </Link>
                    <span className="sm:flex py-1 hidden whitespace-nowrap items-center gap-1  text-xs sm:text-sm ">
                        <Clock size={16} />
                        {timeAgoFormat(chapter.attributes.updatedAt)}
                    </span>
                    <div className="text-xs   text-foreground font-normal hidden sm:flex items-center gap-1">
                        <Eye size={16} />
                        N/A
                    </div>
                    <div className=" text-right sm:text-left sm:hidden block ">
                        <Button
                            className="w-auto gap-1.5 h-auto px-1.5 sm:py-1 py-0.5 hover:bg-customs-accent-hover"
                            variant={"outline"}
                            size={"xs"}
                        >
                            <MessageSquare size={16} />
                        </Button>
                    </div>
                </div>
                <div className="sm:gap-x-6 flex items-center justify-between sm:justify-start">
                    <div className="sm:flex-1 whitespace-nowrap  text-xs sm:text-sm flex items-center  gap-1 text-foreground">
                        <Users size={16} />
                        {scanlation_groups.length > 0 ? (
                            scanlation_groups.map((value) => (
                                <Link
                                    key={value.id}
                                    href={"/"}
                                    className="break-all line-clamp-1 px-1 rounded hover:bg-customs-accent-hover"
                                >
                                    {value.attributes?.name}
                                </Link>
                            ))
                        ) : (
                            <span className="break-all line-clamp-1 px-1 rounded hover:bg-customs-accent-hover">
                                No Group
                            </span>
                        )}
                    </div>
                    <div className="hidden text-xs sm:text-sm sm:flex items-center  gap-1 text-foreground">
                        <User size={16} />
                        <Link
                            href={"/"}
                            className="break-all line-clamp-1  px-1 rounded hover:bg-customs-accent-hover"
                        >
                            {user?.attributes.username || "No User"}
                        </Link>
                    </div>
                    <div className=" hidden sm:block text-right sm:text-left ">
                        <Button
                            className="w-auto gap-1.5 h-auto px-1.5 py-1 hover:bg-customs-accent-hover"
                            variant={"outline"}
                            size={"xs"}
                        >
                            <MessageSquare size={16} />
                        </Button>
                    </div>
                    <div className="text-xs   text-foreground font-normal sm:hidden flex items-center gap-1">
                        <Eye size={16} />
                        N/A
                    </div>
                </div>
                <div className="sm:gap-x-6 flex sm:hidden items-center  justify-between sm:justify-start">
                    <div className=" text-xs sm:text-sm flex items-center  gap-1 text-foreground">
                        <User size={16} />
                        <Link
                            href={"/"}
                            className="break-all line-clamp-1  px-1 rounded hover:bg-customs-accent-hover"
                        >
                            {user?.attributes.username || "No User"}
                        </Link>
                    </div>
                    <span className="flex py-1  whitespace-nowrap items-center gap-1  text-xs sm:text-sm ">
                        <Clock size={16} />
                        {timeAgoFormat(chapter.attributes.updatedAt)}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ChapterItem;
