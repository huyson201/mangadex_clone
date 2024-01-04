"use client";
import { READ_CHAPTER_URL } from "@/constants";
import { useChapterMenu } from "@/contexts/ChapterMenuContext";
import { cn } from "@/lib/utils";
import { AtHomeResponse } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { forwardRef, useImperativeHandle, useState } from "react";

type Props = {
    data: AtHomeResponse;
    onChange?: (index: number) => void;
    defaultIndex?: number;
    nextChapter?: string;
    prevChapter?: string;
};

const ChapterSingleRead = forwardRef<
    { slideToIndex: (index: number) => void },
    Props
>(function ChapterSingleReadFC(
    { data, defaultIndex, onChange, prevChapter, nextChapter },
    ref
) {
    const { readingDirection, headerType, imageFit } = useChapterMenu();
    const [imageIndex, setImageIndex] = useState(defaultIndex || 0);
    const images = data.chapter.data;
    const arrImgLength = images.length;
    const quality = "data";
    const hash = data.chapter.hash;
    const base_url = data.baseUrl;
    const router = useRouter();

    useImperativeHandle(
        ref,
        () => {
            return {
                slideToIndex: (index: number) => {
                    setImageIndex(index);
                    onChange?.(index);
                },
            };
        },
        []
    );

    const handlePrev = () => {
        if (imageIndex === 0) {
            if (prevChapter) {
                router.push(`${READ_CHAPTER_URL}/${prevChapter}`);
            }
            return;
        }

        const newIndex = imageIndex - 1;
        setImageIndex(newIndex);
        onChange?.(newIndex);
    };

    const handleNext = () => {
        if (imageIndex === arrImgLength - 1) {
            if (nextChapter) {
                router.push(`${READ_CHAPTER_URL}/${nextChapter}`);
            }
            return;
        }
        const newIndex = imageIndex + 1;
        setImageIndex(newIndex);
        onChange?.(newIndex);
    };

    return (
        <div
            className={cn(
                "relative",
                headerType === "shown"
                    ? "min-h-[calc(100vh_-_var(--navbar-height))]"
                    : "min-h-screen"
            )}
        >
            <div
                className="absolute w-1/3 z-[1]   left-0 top-0 h-full cursor-pointer"
                onClick={() => {
                    if (readingDirection === "left-right") {
                        handlePrev();
                        return;
                    }
                    handleNext();
                }}
            ></div>
            <div
                className={cn(
                    "h-full  w-full z-[0] flex items-center justify-center ",
                    imageFit === "width" ? "" : "top-0 left-0 absolute"
                )}
            >
                {images.map((filename, index) => {
                    return (
                        <Image
                            key={filename}
                            src={`${base_url}/${quality}/${hash}/${filename}`}
                            alt="img"
                            width={312}
                            height={700}
                            priority
                            className={cn(
                                "w-auto object-contain ",
                                imageFit === "height" && "h-full",
                                imageFit === "width" && "w-full",
                                imageFit === "both" && "h-full w-full",
                                imageFit === "no-limit" && "h-auto w-auto",
                                index === imageIndex ? "" : "hidden"
                            )}
                        />
                    );
                })}
            </div>
            <div
                onClick={() => {
                    if (readingDirection === "left-right") {
                        handleNext();
                        return;
                    }
                    handlePrev();
                }}
                className="absolute w-1/3  right-0 top-0 h-full cursor-pointer"
            ></div>
        </div>
    );
});

export default ChapterSingleRead;
