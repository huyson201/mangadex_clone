import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Manga } from "../../../types";
import { getImageUrl } from "@/services/mangadex";
import { cn } from "@/lib/utils";

type Props = {
    manga: Manga;
    className?: string;
};

function HorizontalListItem({ manga, className }: Props) {
    const coverArt = manga.relationships.find(
        (relation) => relation.type === "cover_art"
    );

    return (
        <div className="relative">
            <Link
                href={`/title/${manga.id}/${encodeURIComponent(
                    manga.attributes.title.en
                )}`}
            >
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
            </Link>
            <Link
                href={`/title/${manga.id}/${encodeURIComponent(
                    manga.attributes.title.en
                )}`}
                className="mt-2 block"
            >
                <h6 className="text-sm line-clamp-2">
                    {manga.attributes.title.en}
                </h6>
            </Link>
        </div>
    );
}

export default HorizontalListItem;
