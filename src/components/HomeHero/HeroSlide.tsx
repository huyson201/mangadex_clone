import Wrapper from "@/layouts/Wrapper/Wrapper";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import useSWR from "swr";
import { Manga } from "../../../types";
import { getImageUrl } from "@/services/mangadex";
import { slugify } from "@/lib/utils";
import Tag from "../Tag/Tag";
type Props = {
    manga: Manga;
};

function HeroSlide({ manga }: Props) {
    const coverArt = useMemo(() => {
        return manga.relationships.find(
            (relation) => relation.type === "cover_art"
        );
    }, [manga]);

    const authors = useMemo(() => {
        return manga.relationships.filter(
            (relation) => relation.type === "author"
        );
    }, [manga]);

    const artist = useMemo(() => {
        return manga.relationships.filter(
            (relation) => relation.type === "artist"
        );
    }, [manga]);

    return (
        <Link
            href={`/title/${manga.id}/${slugify(manga.attributes.title.en)}`}
            className="block relative w-full h-[324px] md:h-[400px] lg:h-[440px]"
        >
            <Image
                className="w-full object-cover h-[150%] object-[0_30%]"
                src={getImageUrl(
                    "full",
                    manga.id,
                    coverArt!.attributes.fileName
                )}
                width={1270}
                height={660}
                alt="art"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-md-background/60 to-md-background"></div>
            <div className="absolute w-full h-[70%]   sm:h-[65%] md:h-[77%] bottom-0 mb-7 lg:mb-0">
                <Wrapper className="md:pb-6 pt-6 md:pt-8 flex gap-4">
                    <div className="block w-[112px] md:h-[278px] md:w-[200px]">
                        <Image
                            className="w-full md:h-full object-cover rounded-lg"
                            src={getImageUrl(
                                "512",
                                manga.id,
                                coverArt!.attributes.fileName
                            )}
                            alt="art"
                            width={512}
                            height={726}
                        />
                    </div>
                    <div className="flex flex-col w-[calc(100%_-_112px)] md:w-[calc(100%_-_200px)] ">
                        <h3 className="text-foreground font-bold text-xl lg:text-4xl line-clamp-5 sm:line-clamp-2 ">
                            {manga.attributes.title.en}
                        </h3>
                        <div className="tags md:flex gap-1.5 mt-3 hidden overflow-hidden max-h-[18px] flex-wrap">
                            {manga.attributes.contentRating ===
                                "suggestive" && (
                                <Tag className="px-1.5" variant={"warning"}>
                                    Suggestive
                                </Tag>
                            )}

                            {manga.attributes.tags.map((tag) => {
                                return (
                                    <Tag key={tag.id} className="px-1.5">
                                        {tag.attributes.name.en}
                                    </Tag>
                                );
                            })}
                        </div>
                        <div className="hidden sm:block">
                            <div
                                className="mt-3 text-sm line-clamp-3 md:line-clamp-4 lg:line-clamp-6"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        manga.attributes.description.en || "",
                                }}
                            ></div>
                        </div>

                        <div className="mt-auto ">
                            <span className="font-medium italic line-clamp-1">
                                {[...authors, ...artist]
                                    .map((value) => value.attributes.name)
                                    .join(", ")}
                            </span>
                        </div>
                    </div>
                </Wrapper>
                <Wrapper className="mt-2">
                    <div className="tags flex gap-1.5 mt-2 md:hidden flex-wrap overflow-hidden max-h-[18px] gap-y-3">
                        {manga.attributes.contentRating === "suggestive" && (
                            <Tag className="px-1.5" variant={"warning"}>
                                Suggestive
                            </Tag>
                        )}

                        {manga.attributes.tags.map((tag) => {
                            return (
                                <Tag key={tag.id} className="px-1.5">
                                    {tag.attributes.name.en}
                                </Tag>
                            );
                        })}
                    </div>
                </Wrapper>
            </div>
        </Link>
    );
}

export default HeroSlide;
