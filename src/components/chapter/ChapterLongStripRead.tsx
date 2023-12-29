"use client";
import React from "react";
import { AtHomeResponse } from "../../../types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { InView } from "react-intersection-observer";
type Props = {
    data: AtHomeResponse;
    onChange?: (value: number) => void;
};

function ChapterLongStripRead({ data, onChange }: Props) {
    const images = data.chapter.data;
    const quality = "data";
    const hash = data.chapter.hash;
    const base_url = data.baseUrl;
    return (
        <div className="flex items-center justify-center">
            <div>
                {images.map((filename, index) => {
                    return (
                        <InView
                            key={filename}
                            threshold={0.8}
                            as="div"
                            onChange={(inview, _) => {
                                if (!inview) return;
                                onChange?.(index);
                            }}
                        >
                            <Image
                                src={`${base_url}/${quality}/${hash}/${filename}`}
                                alt="img"
                                width={312}
                                height={700}
                                className={cn("w-auto h-auto")}
                            />
                        </InView>
                    );
                })}
            </div>
        </div>
    );
}

export default ChapterLongStripRead;
