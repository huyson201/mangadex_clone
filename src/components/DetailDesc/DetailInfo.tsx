import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Manga } from "../../../types";

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

    return (
        <div className={cn("flex flex-wrap gap-4", className)}>
            {authors.length > 1 && (
                <div>
                    <div className=" font-bold">Author</div>
                    {authors.map((author) => (
                        <Link
                            key={author.id}
                            className="mr-2 bg-accent hover:bg-primary text-xs rounded py-1 px-2 mt-2 inline-block transition-colors"
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
                            className="mr-2 bg-accent hover:bg-primary text-xs rounded py-1 px-2 mt-2 inline-block transition-colors"
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
                                className="bg-accent hover:bg-primary text-xs rounded py-1 px-2 mt-2 inline-block transition-colors"
                                href={"/"}
                            >
                                {value.attributes.name.en}
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
                                className="bg-accent hover:bg-primary text-xs rounded py-1 px-2 mt-2 inline-block transition-colors"
                                href={"/"}
                            >
                                {value.attributes.name.en}
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
                            className="bg-accent hover:bg-primary text-xs rounded py-1 px-2 mt-2 inline-block transition-colors"
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
                                className="bg-accent hover:bg-primary text-xs rounded py-1 px-2 mt-2 inline-block transition-colors"
                                href={"/"}
                            >
                                {value.attributes.name.en}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            <div className="w-full">
                <div className=" font-bold">Alternative Titles</div>
                <div className="text-sm divide-y-2 divide-accent">
                    {manga.attributes.altTitles.map((title, index) => {
                        const key = Object.keys(title)[0];
                        return (
                            <div className="py-1.5" key={key + index}>
                                {title[key]}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DetailInfo;
