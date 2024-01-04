"use client";
import { ReadingHistoryItem } from "@/app/[locale]/(manga)/my/history/HistoryContent";
import { Button } from "@/components/ui/button";
import { READING_HISTORY_KEY } from "@/constants";
import { useChapterMenu } from "@/contexts/ChapterMenuContext";
import { useLocalStorage } from "@/hooks";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import { cn, getDataByLocale, getPrevAndNextChapter } from "@/lib/utils";
import { getMangaAggregate } from "@/services/mangadex";
import { AtHomeResponse, Chapter } from "@/types";
import { ChevronLeft, Users } from "lucide-react";
import Link from "next/link";
import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import useSWR from "swr";
import ChapterLongStripRead from "./ChapterLongStripRead";
import ChapterMenu from "./ChapterMenu";
import ChapterProgress from "./ChapterProgress";
import ChapterSingleRead from "./chapterSingleRead";

interface MyCustomCSS extends CSSProperties {
    "--current-progress": number | string;
}
type Props = {
    data: AtHomeResponse;
    chapter: Chapter;
};

const ChapterContent = ({ data, chapter }: Props) => {
    const [progressIndex, setProgressIndex] = useState(0);
    const chapterMenu = useChapterMenu();
    const imagesLength = data.chapter.data.length;
    const chapterLongStripReadRef = useRef<{
        scrollToIndex: (index: number) => void;
    }>(null);
    const chapterSinglePageRef = useRef<{
        slideToIndex: (index: number) => void;
    }>(null);

    const chapterGroup = chapter.relationships.find(
        (relation) => relation.type === "scanlation_group"
    );
    const manga = chapter.relationships.find(
        (relation) => relation.type === "manga"
    );
    const { data: history, setData } =
        useLocalStorage<ReadingHistoryItem[]>(READING_HISTORY_KEY);

    const { data: aggregate, isLoading } = useSWR(
        manga ? `manga/${manga.id}/aggregate` : null,
        () =>
            getMangaAggregate(manga!.id, {
                translatedLanguage: [chapter.attributes.translatedLanguage],
            })
    );

    const { nextChapter, prevChapter } = useMemo(() => {
        return getPrevAndNextChapter(chapter.id, aggregate);
    }, [aggregate, chapter]);

    useEffect(() => {
        if (!manga) return;

        const newData = history ? [...history] : [];

        const index = newData.findIndex(
            (item) => item.chapterId === chapter.id
        );

        if (index !== -1) {
            newData.splice(index, 1);
        }

        const historyItem: ReadingHistoryItem = {
            mangaId: manga.id,
            chapterId: chapter.id,
            date: new Date(),
        };

        newData.push(historyItem);
        setData(newData);
    }, []);

    return (
        <div
            className={cn(
                chapterMenu.headerType === "shown"
                    ? "pt-[calc(var(--navbar-height)_+_1rem)]"
                    : "pt-4"
            )}
        >
            <Wrapper className="border-b border-b-accent pb-3">
                <div className="text-lg font-medium text-center sm:text-left">
                    {chapter.attributes.title ||
                        `Ch. ${chapter.attributes.chapter}`}
                </div>
                <h1 className="text-center sm:text-left">
                    <Link href={"#"} className="text-primary">
                        {getDataByLocale(manga?.attributes.title)}
                    </Link>
                </h1>
                <div className="grid grid-cols-3 gap-x-2 mt-1.5">
                    <div className="bg-accent justify-center rounded-sm items-center flex py-1">
                        {chapter.attributes.volume &&
                            `Vol. ${chapter.attributes.volume}`}
                        ,{` Ch. ${chapter.attributes.chapter}`}
                    </div>
                    <div className="bg-accent justify-center rounded-sm items-center flex py-1">
                        Pg. {progressIndex + 1} / {imagesLength}
                    </div>
                    <Button
                        onClick={() => chapterMenu.open()}
                        className="hover:bg-accent-10 py-1 h-auto rounded-sm"
                        variant={"default"}
                    >
                        Menu
                        <ChevronLeft />
                    </Button>
                </div>
                <div className="flex items-center gap-1 mt-2">
                    <Users size={20} />
                    <Link
                        href={"#"}
                        className="rounded hover:bg-accent-2-hover px-1 text-sm"
                    >
                        {chapterGroup?.attributes.name}
                    </Link>
                </div>
            </Wrapper>

            <div
                onClick={() => {
                    chapterMenu.close();
                }}
            >
                {chapterMenu.pageType === "single" && (
                    <ChapterSingleRead
                        nextChapter={nextChapter}
                        prevChapter={prevChapter}
                        ref={chapterSinglePageRef}
                        data={data}
                        onChange={(index) => setProgressIndex(index)}
                        defaultIndex={progressIndex}
                    />
                )}
                {chapterMenu.pageType === "longStrip" && (
                    <ChapterLongStripRead
                        nextChapter={nextChapter}
                        prevChapter={prevChapter}
                        defaultValue={progressIndex}
                        ref={chapterLongStripReadRef}
                        data={data}
                        onChange={(value) => setProgressIndex(value)}
                    />
                )}
            </div>

            <ChapterProgress
                totalStep={imagesLength}
                step={progressIndex}
                onClickStep={(step) => {
                    chapterLongStripReadRef.current?.scrollToIndex(step);
                    chapterSinglePageRef.current?.slideToIndex(step);
                }}
            />
            {aggregate && (
                <ChapterMenu chapter={chapter} aggregate={aggregate} />
            )}
        </div>
    );
};

export default ChapterContent;
