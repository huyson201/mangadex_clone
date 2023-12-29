import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Manga } from "../../../types";
import {
    getCoverArtFromManga,
    getDetailMangaLink,
    getLangFlagUrl,
    getMangaTitle,
} from "@/lib/manga";
import { getImageUrl } from "@/services/mangadex";

type Props = {
    manga: Manga;
};

function RecentMangaGridItem({ manga }: Props) {
    const coverArt = getCoverArtFromManga(manga);
    const title = getMangaTitle(manga);
    const flag = getLangFlagUrl(manga.attributes.originalLanguage);

    return (
        <div>
            <Link
                className="block h-full relative"
                href={getDetailMangaLink(manga)}
            >
                <Image
                    className="w-full h-full object-cover rounded"
                    src={getImageUrl(
                        "512",
                        manga.id,
                        coverArt?.attributes.fileName
                    )}
                    alt={title}
                    width={512}
                    height={728}
                />
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 px-2 text-sm to-transparent py-3">
                    {flag && (
                        <Image
                            className="inline-block mr-1"
                            src={flag}
                            alt={manga.attributes.originalLanguage}
                            width={24}
                            height={24}
                        />
                    )}
                    <span>{title}</span>
                </div>
            </Link>
        </div>
    );
}

export default RecentMangaGridItem;
