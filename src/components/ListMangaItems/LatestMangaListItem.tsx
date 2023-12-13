import Image from "next/image";
import Link from "next/link";
import React from "react";
import jpFlag from "@/assets/flags/jp.svg";
import ChapterItem from "../ChapterList/ChapterItem";

type Props = {};

function LatestMangaListitem({}: Props) {
    return (
        <div className="bg-accent p-2 rounded ">
            <div className="mb-1">
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
            <div className="divide-y divide-background">
                <ChapterItem />
                <ChapterItem />
                <ChapterItem />
            </div>
        </div>
    );
}

export default LatestMangaListitem;
