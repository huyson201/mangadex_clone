import {
    cn,
    createTagLink,
    getLangFlagUrl,
    getStatisticsLink,
    getTagName,
} from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Manga } from "../../types";
import Image from "next/image";
import mangaLinkIcons from "@/data/mangaLinkIcon.json";
type Props = {
    className?: string;
    manga: Manga;
};

const DetailInfo = ({ manga, className }: Props) => {
    const authors = manga.relationships.filter(
        (relation) => relation.type === "author"
    );
    const artists = manga.relationships.filter(
        (relation) => relation.type === "artist"
    );
    const genres = manga.attributes.tags.filter(
        (tag) => tag.attributes.group === "genre"
    );
    const themes = manga.attributes.tags.filter(
        (tag) => tag.attributes.group === "theme"
    );
    const formats = manga.attributes.tags.filter(
        (tag) => tag.attributes.group === "format"
    );
    const links = getStatisticsLink(manga.attributes.links);

    return (
        <div className={cn("flex flex-wrap gap-4", className)}>
            {authors.length > 1 && (
                <div>
                    <div className=" font-bold">Author</div>
                    {authors.map((author) => (
                        <Link
                            key={author.id}
                            className="mr-2 bg-accent hover:bg-primary hover:text-primary-foreground text-xs rounded py-1 px-2 mt-2 inline-block transition-colors"
                            href={"/"}
                        >
                            {author.attributes.name}
                        </Link>
                    ))}
                </div>
            )}
            {artists.length > 1 && (
                <div>
                    <div className=" font-bold">Artist</div>
                    {artists.map((author) => (
                        <Link
                            key={author.id}
                            className="mr-2 bg-accent hover:bg-primary hover:text-primary-foreground text-xs rounded py-1 px-2 mt-2 inline-block transition-colors"
                            href={"/"}
                        >
                            {author.attributes.name}
                        </Link>
                    ))}
                </div>
            )}
            {genres.length > 1 && (
                <div>
                    <div className=" font-bold">Genres</div>
                    <div className="flex items-center flex-wrap gap-2">
                        {genres.map((value) => (
                            <Link
                                key={value.id}
                                className="bg-accent hover:bg-primary hover:text-primary-foreground text-xs rounded py-1 px-2 mt-2 inline-block transition-colors"
                                href={createTagLink(value)}
                            >
                                {getTagName(value)}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            {themes.length > 1 && (
                <div>
                    <div className=" font-bold">Themes</div>
                    <div className="flex items-center flex-wrap gap-2">
                        {themes.map((value) => (
                            <Link
                                key={value.id}
                                className="bg-accent hover:bg-primary hover:text-primary-foreground text-xs rounded py-1 px-2 mt-2 inline-block transition-colors"
                                href={createTagLink(value)}
                            >
                                {getTagName(value)}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            {manga.attributes.publicationDemographic && (
                <div>
                    <div className=" font-bold">Demographic</div>
                    <div className="flex items-center flex-wrap gap-2">
                        <Link
                            className="bg-accent hover:bg-primary hover:text-primary-foreground text-xs rounded py-1 px-2 mt-2 inline-block transition-colors"
                            href={"/"}
                        >
                            {manga.attributes.publicationDemographic}
                        </Link>
                    </div>
                </div>
            )}

            {formats.length > 1 && (
                <div>
                    <div className=" font-bold">Format</div>
                    <div className="flex items-center flex-wrap gap-2">
                        {formats.map((value) => (
                            <Link
                                key={value.id}
                                className="bg-accent hover:bg-primary hover:text-primary-foreground text-xs rounded py-1 px-2 mt-2 inline-block transition-colors"
                                href={createTagLink(value)}
                            >
                                {getTagName(value)}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            {links.readOrBuy.length > 1 && (
                <div>
                    <div className=" font-bold">Read or Buy</div>
                    <div className="flex items-center flex-wrap gap-2">
                        {links.readOrBuy.map((value) => (
                            <Link
                                key={value.key}
                                className="bg-accent hover:bg-primary hover:text-primary-foreground text-xs rounded py-1 px-2 mt-2 inline-flex gap-1 transition-colors"
                                href={value.link}
                            >
                                <Image
                                    src={
                                        value.key === "engtl"
                                            ? `${mangaLinkIcons[value.key]}${
                                                  value.link
                                              }`
                                            : mangaLinkIcons[value.key]
                                    }
                                    width={16}
                                    height={16}
                                    alt={value.key}
                                />
                                {value.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            {links.track.length > 1 && (
                <div>
                    <div className=" font-bold">Track</div>
                    <div className="flex items-center flex-wrap gap-2">
                        {links.track.map((value) => (
                            <Link
                                key={value.key}
                                className="bg-accent hover:bg-primary hover:text-primary-foreground text-xs rounded py-1 px-2 mt-2 inline-flex gap-1 transition-colors"
                                href={value.link}
                            >
                                <Image
                                    src={mangaLinkIcons[value.key]}
                                    width={16}
                                    height={16}
                                    alt={value.key}
                                />
                                {value.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            {manga.attributes.altTitles.length > 0 && (
                <div className="w-full">
                    <div className=" font-bold">Alternative Titles</div>
                    <div className="text-sm divide-y-2 divide-accent">
                        {manga.attributes.altTitles.map((title, index) => {
                            const key = Object.keys(title)[0];
                            const flag = getLangFlagUrl(key);
                            return (
                                <div
                                    className="py-1.5 flex items-center gap-2"
                                    key={key + index}
                                >
                                    {flag && (
                                        <Image
                                            width={24}
                                            height={24}
                                            src={flag}
                                            alt={key}
                                            className="w-6 h-6"
                                        />
                                    )}

                                    {title[key]}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailInfo;
