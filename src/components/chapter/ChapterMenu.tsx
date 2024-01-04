"use client";
import { READ_CHAPTER_URL } from "@/constants";
import {
    HeaderType,
    ImageFit,
    PageType,
    ProgressbarType,
    ReadingDirection,
    useChapterMenu,
} from "@/contexts/ChapterMenuContext";
import { cn, getDataByLocale } from "@/lib/utils";
import { MangaAggregateResponse } from "@/services/mangadex";
import { Chapter } from "@/types";
import { Popover } from "@radix-ui/react-popover";
import {
    ArrowLeftCircle,
    ArrowRightCircle,
    Ban,
    BookOpen,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Expand,
    MoveHorizontal,
    MoveVertical,
    PanelTop,
    Square,
    StickyNote,
    User,
    Users,
    X,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { PopoverContent, PopoverTrigger } from "../ui/popover";

export const LongStripIcon = () => {
    return (
        <svg
            data-v-4c681a64=""
            data-v-a31e942f=""
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="icon"
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 2v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2m0 20v-6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6"
            ></path>
        </svg>
    );
};
export const NormalProgressbarIcon = () => {
    return (
        <svg
            width={24}
            data-v-4c681a64=""
            data-v-a31e942f=""
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="icon "
        >
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 15h16M7 15v-5m10 5v-5M4 9h16"
            ></path>
        </svg>
    );
};

export const HiddenProgressbarIcon = () => {
    return (
        <svg
            width={24}
            height={24}
            data-v-4c681a64=""
            data-v-a31e942f=""
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="icon"
        >
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 15h16"
            ></path>
        </svg>
    );
};
type Props = {
    chapter: Chapter;
    aggregate: MangaAggregateResponse;
};

const pageTypeIcon: Record<
    PageType,
    { icon: React.JSX.Element; name: string }
> = {
    single: {
        icon: <StickyNote />,
        name: "Single Page",
    },
    longStrip: {
        icon: <LongStripIcon />,
        name: "Long Strip",
    },
};
const readingDirectionIcon: Record<
    ReadingDirection,
    { icon: React.JSX.Element; name: string }
> = {
    "left-right": {
        icon: <ArrowRightCircle />,
        name: "left to right",
    },
    "right-left": {
        icon: <ArrowLeftCircle />,
        name: "right to left",
    },
};
const progressbarIcons: Record<
    ProgressbarType,
    { icon: React.JSX.Element; name: string }
> = {
    hidden: {
        name: "Progress hidden",
        icon: <HiddenProgressbarIcon />,
    },
    normal: {
        name: "Normal Progress",
        icon: <NormalProgressbarIcon />,
    },
};
const headerTypeIcons: Record<
    HeaderType,
    { icon: React.JSX.Element; name: string }
> = {
    hidden: {
        name: "Header hidden",
        icon: <Square />,
    },
    shown: {
        name: "Header Shown",
        icon: <PanelTop />,
    },
};

const imgFitIcons: Record<ImageFit, { icon: React.JSX.Element; name: string }> =
    {
        height: {
            name: "Fit height",
            icon: <MoveVertical />,
        },
        width: {
            name: "Fit width",
            icon: <MoveHorizontal />,
        },
        both: {
            name: "Fit both",
            icon: <Expand />,
        },
        "no-limit": {
            name: "No limit",
            icon: <Ban />,
        },
    };
const ChapterMenu = ({ chapter, aggregate }: Props) => {
    const chapterMenu = useChapterMenu();
    const [openList, setOpenList] = useState(false);
    const manga = chapter.relationships.find((value) => value.type === "manga");

    const chapterGroup = chapter.relationships.find(
        (relation) => relation.type === "scanlation_group"
    );
    const chapterUser = chapter.relationships.find(
        (relation) => relation.type === "user"
    );

    const renderChapterList = () => {
        let chapterPrev = "";
        let chapterNext = "";
        let hasPrev = false;
        let hasNext = false;
        const chapters = aggregate ? Object.values(aggregate.volumes) : [];

        const chapterElements = chapters.map((volume) => {
            const volumeElement = (
                <div
                    key={volume.volume}
                    className=" px-1.5 py-1 flex items-center gap-2"
                >
                    <span className="text-sm text-midTone capitalize">
                        {volume.volume === "none"
                            ? volume.volume
                            : `Volume ${volume.volume}`}
                    </span>
                    <hr className="border-t-[1.5px] grow border-t-midTone" />
                </div>
            );

            const chapters = Object.values(volume.chapters).map(
                (chapterWithKey) => {
                    if (chapterWithKey.id === chapter.id) hasPrev = true;
                    if (!hasPrev) {
                        chapterPrev = chapterWithKey.id;
                    }

                    if (
                        !hasNext &&
                        hasPrev &&
                        chapterWithKey.id !== chapter.id
                    ) {
                        chapterNext = chapterWithKey.id;
                        hasNext = true;
                    }

                    return (
                        <Link
                            key={chapterWithKey.id}
                            className={cn(
                                "hover:bg-accent-hover transition-all w-full block rounded px-1.5 py-1",
                                chapter.id === chapterWithKey.id && "bg-primary"
                            )}
                            href={`${READ_CHAPTER_URL}/${chapterWithKey.id}`}
                        >
                            Chapter {chapterWithKey.chapter}
                        </Link>
                    );
                }
            );
            return [volumeElement, chapters];
        });

        return {
            chapterElements,
            chapterPrev,
            chapterNext,
        };
    };

    const renderChapterData = renderChapterList();
    return (
        <div
            className={cn(
                "fixed bg-background overflow-y-auto custom-scrollbar z-[var(--drawer-index)] border-l border-l-accent py-4 max-w-[var(--drawer-menu-max-width)] min-w-[var(--drawer-menu-width)] w-full top-0 right-0 h-screen transition-all duration-500",
                chapterMenu.isOpen ? "translate-x-0" : "translate-x-full"
            )}
        >
            <div>
                <div className="px-2">
                    <Button
                        onClick={() => chapterMenu.close()}
                        variant={"ghost"}
                        className="rounded-full"
                        size={"icon"}
                    >
                        <X />
                    </Button>
                </div>
                <div className="px-4">
                    <div className="py-4 space-y-2">
                        <div className="flex items-center gap-2.5">
                            <BookOpen />
                            <span className="text-primary break-all line-clamp-1">
                                {getDataByLocale(manga?.attributes.title)}
                            </span>
                        </div>
                        <div className="flex items-center  gap-2.5">
                            <StickyNote />
                            <span className="break-all line-clamp-1">
                                {chapter.attributes.title ||
                                    `Chapter ${chapter.attributes.chapter}`}
                            </span>
                        </div>
                    </div>
                    <div className="py-4">
                        <div className="flex items-stretch gap-2">
                            <Link
                                href={
                                    renderChapterData.chapterPrev
                                        ? `${READ_CHAPTER_URL}/${renderChapterData.chapterPrev}`
                                        : "#"
                                }
                                className={cn(
                                    buttonVariants({ variant: "secondary" }),
                                    "px-1 h-auto py-4 w-auto  hover:bg-accent-10 justify-start gap-2 rounded  text-base",
                                    renderChapterData.chapterPrev === "" &&
                                        "pointer-events-none opacity-60"
                                )}
                            >
                                <ChevronLeft />
                            </Link>
                            <div className="grow">
                                <Popover
                                    open={openList}
                                    onOpenChange={() =>
                                        setOpenList((prev) => !prev)
                                    }
                                >
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="default"
                                            role="combobox"
                                            aria-expanded={openList}
                                            className={cn(
                                                " h-full border-none w-full py-1.5 gap-1  justify-between border  active:border-primary",
                                                openList && "bg-accent-hover"
                                            )}
                                        >
                                            <div className="text-left">
                                                <div className="text-xs font-normal opacity-80">
                                                    Chapter
                                                </div>
                                                <div>
                                                    Chapter{" "}
                                                    {chapter.attributes.chapter}
                                                </div>
                                            </div>
                                            <span
                                                className={cn(
                                                    "transition-all",
                                                    openList && "rotate-180"
                                                )}
                                            >
                                                <ChevronDown size={20} />
                                            </span>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className={cn(
                                            " p-1 max-h-[320px] overflow-y-auto custom-scrollbar bg-accent w-[var(--radix-popover-trigger-width)]"
                                        )}
                                    >
                                        {renderChapterData.chapterElements}
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <Link
                                href={
                                    renderChapterData.chapterNext
                                        ? `${READ_CHAPTER_URL}/${renderChapterData.chapterNext}`
                                        : "#"
                                }
                                className={cn(
                                    buttonVariants({ variant: "secondary" }),
                                    "px-1 h-auto py-4 w-auto  hover:bg-accent-10 justify-start gap-2 rounded  text-base",
                                    renderChapterData.chapterNext === "" &&
                                        "pointer-events-none opacity-60"
                                )}
                            >
                                <ChevronRight />
                            </Link>
                        </div>
                    </div>
                    <div className="py-4 border-y border-y-accent-2">
                        <div className="capitalize font-medium">
                            Uploaded By
                        </div>
                        <div className="flex items-center mt-2 gap-2.5">
                            <Users />
                            <Link
                                href={"#"}
                                className="hover:bg-accent-2-hover rounded px-1 break-all line-clamp-1"
                            >
                                {chapterGroup?.attributes.name}
                            </Link>
                        </div>
                        <div className="flex items-center mt-2 gap-2.5">
                            <User />
                            <Link
                                href={"#"}
                                className="hover:bg-accent-2-hover rounded px-1 break-all line-clamp-1"
                            >
                                {chapterUser?.attributes.username}
                            </Link>
                        </div>
                    </div>
                    <div className="py-4 space-y-2   ">
                        <Button
                            className="flex w-full hover:bg-accent-10 justify-start gap-2 rounded  text-base"
                            variant={"secondary"}
                            onClick={() => chapterMenu.togglePageType()}
                        >
                            {pageTypeIcon[chapterMenu.pageType].icon}
                            <span className="capitalize">
                                {pageTypeIcon[chapterMenu.pageType].name}
                            </span>
                        </Button>
                        <Button
                            className="flex w-full hover:bg-accent-10 justify-start gap-2 rounded  text-base"
                            variant={"secondary"}
                            onClick={() => chapterMenu.toggleImageFitType()}
                        >
                            {imgFitIcons[chapterMenu.imageFit].icon}
                            <span className="capitalize">
                                {imgFitIcons[chapterMenu.imageFit].name}
                            </span>
                        </Button>
                        <Button
                            className="flex w-full hover:bg-accent-10 justify-start gap-2 rounded text-base"
                            variant={"secondary"}
                            onClick={() => chapterMenu.toggleReadingDirection()}
                        >
                            {
                                readingDirectionIcon[
                                    chapterMenu.readingDirection
                                ].icon
                            }
                            <span className="capitalize">
                                {
                                    readingDirectionIcon[
                                        chapterMenu.readingDirection
                                    ].name
                                }
                            </span>
                        </Button>
                        <Button
                            onClick={() => chapterMenu.toggleHeaderType()}
                            className="flex w-full hover:bg-accent-10 justify-start gap-2 rounded text-base"
                            variant={"secondary"}
                        >
                            {headerTypeIcons[chapterMenu.headerType].icon}
                            <span className="capitalize">
                                {headerTypeIcons[chapterMenu.headerType].name}
                            </span>
                        </Button>
                        <Button
                            onClick={() => chapterMenu.toggleProgressbarType()}
                            className="flex w-full hover:bg-accent-10 justify-start gap-2 rounded text-base"
                            variant={"secondary"}
                        >
                            {progressbarIcons[chapterMenu.progressbarType].icon}
                            <span className="capitalize">
                                {
                                    progressbarIcons[
                                        chapterMenu.progressbarType
                                    ].name
                                }
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChapterMenu;
