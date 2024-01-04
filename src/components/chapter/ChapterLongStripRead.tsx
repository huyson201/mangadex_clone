"use client";
import { useChapterMenu } from "@/contexts/ChapterMenuContext";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import { cn } from "@/lib/utils";
import { AtHomeResponse } from "@/types";
import Image from "next/image";
import Link from "next/link";
import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { InView } from "react-intersection-observer";
import RingLoader from "../Loader/RingLoader";
import { Button } from "../ui/button";
type Props = {
    data: AtHomeResponse;
    onChange?: (value: number) => void;
    defaultValue?: number;
    nextChapter?: string;
    prevChapter?: string;
};

const ChapterLongStripRead = forwardRef<
    { scrollToIndex: (index: number) => void },
    Props
>(({ data, onChange, defaultValue, prevChapter, nextChapter }, ref) => {
    const { imageFit, headerType } = useChapterMenu();
    const images = data.chapter.data;
    const quality = "data";
    const hash = data.chapter.hash;
    const base_url = data.baseUrl;
    const [first, setFirst] = useState(false);
    const imageRef = useRef<HTMLImageElement[] | null[]>([]);
    const [loadedImgs, setLoadedImgs] = useState(
        Array.from({ length: images.length }).map(() => false)
    );
    useImperativeHandle(
        ref,
        () => {
            return {
                scrollToIndex: (index: number) => {
                    imageRef.current[index]?.scrollIntoView();
                },
            };
        },
        []
    );

    useEffect(() => {
        setTimeout(() => {
            if (!defaultValue) return;
            imageRef.current[defaultValue]?.scrollIntoView({
                behavior: "smooth",
            });
        }, 300);

        if (!defaultValue) return;
        imageRef.current.map((img, index) => {
            if (img?.complete) {
                setLoadedImgs((prev) => {
                    prev[index] = true;
                    return [...prev];
                });
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            {images.map((filename, index) => {
                return (
                    <InView
                        key={filename}
                        threshold={
                            imageFit === "height" || imageFit === "width"
                                ? 0.5
                                : 0.8
                        }
                        as="div"
                        skip={!loadedImgs[index]}
                        className={cn("w-full flex justify-center")}
                        onChange={(inview, entry) => {
                            if (index === images.length - 1) {
                                setFirst(true);
                            }
                            if (!inview || !first) return;
                            onChange?.(index);
                        }}
                    >
                        {!loadedImgs[index] && (
                            <div className="flex justify-center py-12">
                                <RingLoader color="primary" />
                            </div>
                        )}
                        <Image
                            ref={(ref) => (imageRef.current[index] = ref)}
                            src={`${base_url}/${quality}/${hash}/${filename}`}
                            alt="img"
                            width={640}
                            height={906}
                            priority
                            onLoad={() => {
                                setLoadedImgs((prev) => {
                                    prev[index] = true;
                                    return [...prev];
                                });
                            }}
                            className={cn(
                                "w-auto object-contain ",
                                loadedImgs[index] ? "block" : "hidden",
                                imageFit === "height" && "max-h-screen w-full",

                                imageFit === "width" && "w-full",
                                imageFit === "both" && "max-h-screen w-full",

                                imageFit === "no-limit" && "h-auto w-auto"
                            )}
                        />
                    </InView>
                );
            })}
            {(nextChapter || prevChapter) && (
                <Wrapper className="pt-6 pb-10 space-y-4">
                    {nextChapter && (
                        <Button variant={"primary"} asChild>
                            <Link
                                className="w-full rounded-none"
                                href={`${nextChapter}`}
                            >
                                Next Chapter
                            </Link>
                        </Button>
                    )}
                    {prevChapter && (
                        <Button variant={"primary"} asChild>
                            <Link
                                className="w-full rounded-none"
                                href={`${prevChapter}`}
                            >
                                Prev Chapter
                            </Link>
                        </Button>
                    )}
                </Wrapper>
            )}
        </>
    );
});
ChapterLongStripRead.displayName = "ChapterLongStripRead";
export default ChapterLongStripRead;
