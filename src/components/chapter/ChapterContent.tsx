"use client";
import { Button } from "@/components/ui/button";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import { ChevronLeft, Users } from "lucide-react";
import Link from "next/link";
import React, { CSSProperties, useRef, useState } from "react";
import { AtHomeResponse, Chapter } from "../../../types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ChapterSingleRead from "./chapterSingleRead";
import ChapterLongStripRead from "./ChapterLongStripRead";
import ChapterMenu from "./ChapterMenu";
import { PageType, useChapterMenu } from "@/contexts/ChapterMenuContext";
import ChapterProgress from "./ChapterProgress";

export interface MyCustomCSS extends CSSProperties {
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
                    Ch. 1
                </div>
                <h1 className="text-center sm:text-left">
                    <Link href={"#"} className="text-primary">
                        Hanninmae no Koibito
                    </Link>
                </h1>
                <div className="grid grid-cols-3 gap-x-2 mt-1.5">
                    <div className="bg-accent justify-center rounded-sm items-center flex py-1">
                        Vol.1 Ch.1
                    </div>
                    <div className="bg-accent justify-center rounded-sm items-center flex py-1">
                        {progressIndex + 1} / {imagesLength}
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
                        NKP : Nerjemah Kalo Pengen
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
                        ref={chapterSinglePageRef}
                        data={data}
                        onChange={(index) => setProgressIndex(index)}
                        defaultIndex={progressIndex}
                    />
                )}
                {chapterMenu.pageType === "longStrip" && (
                    <ChapterLongStripRead
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
            <ChapterMenu chapter={chapter} />
        </div>
    );
};

export default ChapterContent;
