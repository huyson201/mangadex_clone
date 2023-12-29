"use client";
import React, { useState } from "react";
import { AtHomeResponse } from "../../../types";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
    data: AtHomeResponse;
    onChange?: (value: number) => void;
};

function ChapterSingleRead({ data, onChange }: Props) {
    const images = data.chapter.data;
    const quality = "data";
    const hash = data.chapter.hash;
    const base_url = data.baseUrl;
    const [imageIndex, setImageIndex] = useState(0);
    return (
        <div className="h-[calc(100vh_-_var(--navbar-height))]">
            <div className=" h-full flex relative items-center justify-center">
                <div
                    className="absolute w-1/3  left-0 top-0 h-full cursor-pointer"
                    onClick={() => {
                        if (imageIndex === 0) return;
                        const value = imageIndex - 1;
                        setImageIndex(value);
                        onChange?.(value);
                    }}
                ></div>
                <div className="h-full">
                    {images.map((filename, index) => {
                        return (
                            <Image
                                key={filename}
                                src={`${base_url}/${quality}/${hash}/${filename}`}
                                alt="img"
                                width={312}
                                height={700}
                                className={cn(
                                    "w-auto h-full ",
                                    index === imageIndex ? "" : "hidden"
                                )}
                            />
                        );
                    })}
                </div>
                <div
                    onClick={() => {
                        if (imageIndex === images.length - 1) return;
                        const value = imageIndex + 1;
                        setImageIndex(value);
                        onChange?.(value);
                    }}
                    className="absolute w-1/3  right-0 top-0 h-full cursor-pointer"
                ></div>
            </div>
        </div>
    );
}

export default ChapterSingleRead;
