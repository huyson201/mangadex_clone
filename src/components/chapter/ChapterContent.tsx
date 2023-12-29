"use client";
import { Button } from "@/components/ui/button";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import { Users } from "lucide-react";
import Link from "next/link";
import React, { CSSProperties, useRef, useState } from "react";
import { AtHomeResponse } from "../../../types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ChapterSingleRead from "./chapterSingleRead";
import ChapterLongStripRead from "./ChapterLongStripRead";

export interface MyCustomCSS extends CSSProperties {
    "--current-progress": number | string;
}
type Props = {
    data: AtHomeResponse;
};

const ChapterContent = ({ data }: Props) => {
    const [progressIndex, setProgressIndex] = useState(0);

    const images = data.chapter.data;
    const quality = "data";
    const hash = data.chapter.hash;
    const base_url = data.baseUrl;
    const progressRef = useRef<HTMLDivElement>(null);
    const progressPercentage = progressRef.current
        ? ((progressIndex + 1) / images.length) *
          progressRef.current.clientWidth
        : 0;

    return (
        <>
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
                        {progressIndex + 1} / {images.length}
                    </div>
                    <Button
                        className="hover:bg-accent-10 py-1 h-auto rounded-sm"
                        variant={"default"}
                    >
                        Menu
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
            {/* <div className="h-[calc(100vh_-_var(--navbar-height))]">
                <div className=" h-full flex relative items-center justify-center">
                    <div
                        className="absolute w-1/3  left-0 top-0 h-full cursor-pointer"
                        onClick={() => {
                            setImageIndex((prev) => {
                                if (prev === 0) return prev;
                                return prev - 1;
                            });
                        }}
                    ></div>
                    <div>
                        {images.map((filename, index) => {
                            return (
                                <Image
                                    key={filename}
                                    src={`${base_url}/${quality}/${hash}/${filename}`}
                                    alt="img"
                                    width={312}
                                    height={700}
                                    className={cn(
                                        "w-auto h-auto",
                                        index === imageIndex ? "" : "hidden"
                                    )}
                                />
                            );
                        })}
                    </div>
                    <div
                        onClick={() => {
                            setImageIndex((prev) => {
                                if (prev === images.length - 1) return prev;
                                return prev + 1;
                            });
                        }}
                        className="absolute w-1/3  right-0 top-0 h-full cursor-pointer"
                    ></div>
                </div>
            </div> */}
            <ChapterSingleRead
                data={data}
                onChange={(value) => setProgressIndex(value)}
            />
            {/* <ChapterLongStripRead
                data={data}
                onChange={(value) => setProgressIndex(value)}
            /> */}
            <div className="transition-all group pb-1 fixed flex items-center bottom-0 pt-6 hover:pt-0 hover:h-[var(--chapter-progress-height)] hover:bg-background hover:border-t hover:border-t-accent left-0 w-full px-[var(--side-margin)]">
                <div
                    ref={progressRef}
                    className="w-full  flex relative rounded-full  bg-accent group-hover:opacity-100 opacity-70 gap-1 
                before:absolute before:z-[1] before:pointer-events-none before:opacity-50 before:h-full before:transition-all before:rounded-full before:w-[var(--current-progress)] before:bg-primary"
                    style={
                        {
                            [`--current-progress`]: `${
                                progressPercentage - 4
                            }px`,
                        } as MyCustomCSS
                    }
                >
                    {Array.from({ length: data.chapter.data.length }).map(
                        (value, index) => {
                            return (
                                <div
                                    data-index={index + 1}
                                    onClick={() => setProgressIndex(index)}
                                    className={cn(
                                        `first:rounded-tl-full first:rounded-bl-full last:rounded-tr-full last:rounded-br-full  group-hover:h-2.5 after:w-7 after:h-7 hover:after:inline-flex  after:items-center 
                                    after:justify-center after:text-xs after:bg-accent after:rounded-full after:content-[attr(data-index)]
                                     after:z-[2] after:absolute after:left-2/4 after:-translate-x-2/4 after:top-0 after:-translate-y-[calc(100%_+_4px)]
                                    transition-all relative after:hidden  h-1 bg-accent-2 grow cursor-pointer`,
                                        index === progressIndex &&
                                            "before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-primary before:rounded-full hover:after:inline-flex hover:after:bg-primary"
                                    )}
                                    key={`${index}`}
                                >
                                    {" "}
                                </div>
                            );
                        }
                    )}
                </div>
            </div>
        </>
    );
};

export default ChapterContent;
