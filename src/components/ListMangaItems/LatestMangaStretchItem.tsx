import Image from "next/image";
import React from "react";
import jpFlag from "@/assets/flags/jp.svg";
import Link from "next/link";
import ChapterItem from "../ChapterList/ChapterItem";
type Props = {};

const LatestMangaStretchItem = (props: Props) => {
    return (
        <div className="bg-accent p-2 rounded  grid grid-rows-[auto_1fr]  grid-cols-[50px_1fr] sm:grid-cols-[140px_1fr] gap-x-1 sm:gap-x-3">
            <div className="order-2 sm:order-1 sm:row-span-2">
                <Link href={"#"}>
                    <Image
                        className="w-full rounded"
                        src={
                            "https://mangadex.org/covers/cedc7401-8c70-4057-b14a-4ecbbcd73945/fd566b46-0560-46e7-81fe-a67c2942aed8.jpg.256.jpg"
                        }
                        width={512}
                        height={728}
                        alt="art"
                    />
                </Link>
            </div>
            <div className="order-1 sm:order-2 mb-1 col-span-2 sm:col-span-1 row-span-1">
                <Link
                    href={"#"}
                    className="font-bold text-sm sm:text-base pb-1 border-b border-[rgba(128,128,128,0.5)]  flex items-center gap-2"
                >
                    <Image
                        className="w-6 "
                        src={jpFlag}
                        alt=" Otoyomegatari"
                    ></Image>
                    Otoyomegatari
                </Link>
            </div>
            <div className="order-3 divide-y divide-background">
                <ChapterItem />
                <ChapterItem />
                <ChapterItem />
            </div>
        </div>
    );
};

export default LatestMangaStretchItem;
