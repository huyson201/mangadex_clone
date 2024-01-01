import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Manga } from "../../../types";
import { getImageUrl } from "@/services/mangadex";
import {
    cn,
    getDetailMangaLink,
    getLangFlagUrl,
    getMangaTitle,
} from "@/lib/utils";

type Props = {
    manga: Manga;
    className?: string;
};

function HorizontalListItem({ manga, className }: Props) {
    const coverArt = manga.relationships.find(
        (relation) => relation.type === "cover_art"
    );
    const flagLanguage = getLangFlagUrl(manga.attributes.originalLanguage);
    return (
        <div className="relative">
            <Link className="relative" href={getDetailMangaLink(manga)}>
                <Image
                    className={cn("w-full  object-cover rounded", className)}
                    src={getImageUrl(
                        "256",
                        manga.id,
                        coverArt!.attributes.fileName
                    )}
                    alt="manga_art"
                    width={256}
                    height={364}
                />
                {flagLanguage && (
                    <Image
                        className=" absolute bottom-2 right-2"
                        src={flagLanguage}
                        width={24}
                        height={24}
                        alt={manga.attributes.originalLanguage}
                    />
                )}
            </Link>
            <Link href={getDetailMangaLink(manga)} className="mt-2 block">
                <h6 className="text-sm line-clamp-2">{getMangaTitle(manga)}</h6>
            </Link>
        </div>
    );
}

export default HorizontalListItem;
