"use client";
import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { AtHomeResponse } from "@/types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { InView } from "react-intersection-observer";
import { useChapterMenu } from "@/contexts/ChapterMenuContext";
type Props = {
    data: AtHomeResponse;
    onChange?: (value: number) => void;
    defaultValue?: number;
};

const ChapterLongStripRead = forwardRef<
    { scrollToIndex: (index: number) => void },
    Props
>(({ data, onChange, defaultValue }, ref) => {
    const { imageFit, headerType } = useChapterMenu();
    const images = data.chapter.data;
    const quality = "data";
    const hash = data.chapter.hash;
    const base_url = data.baseUrl;
    const [first, setFirst] = useState(false);
    const imageRef = useRef<HTMLImageElement[] | null[]>([]);
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            {images.map((filename, index) => {
                return (
                    <InView
                        key={filename}
                        threshold={0.8}
                        as="div"
                        className={cn(
                            "w-full flex justify-center items-center"
                        )}
                        onChange={(inview, entry) => {
                            if (index === images.length - 1) {
                                setFirst(true);
                            }
                            if (!inview || !first) return;
                            onChange?.(index);
                        }}
                    >
                        <Image
                            ref={(ref) => (imageRef.current[index] = ref)}
                            src={`${base_url}/${quality}/${hash}/${filename}`}
                            alt="img"
                            width={312}
                            height={700}
                            className={cn(
                                "block",
                                "w-auto h-full object-contain ",
                                imageFit === "height" && "h-screen",

                                imageFit === "width" && "w-full",
                                imageFit === "both" && "h-screen w-full",

                                imageFit === "no-limit" && "h-auto w-auto"
                            )}
                        />
                    </InView>
                );
            })}
        </>
    );
});
ChapterLongStripRead.displayName = "ChapterLongStripRead";
export default ChapterLongStripRead;
