import { Button } from "@/components/ui/button";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import {
    BookOpen,
    Bookmark,
    Eye,
    MessageSquare,
    MoreHorizontal,
    Star,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DetailDesc from "@/components/DetailDesc/DetailDesc";
import ChapterList from "@/components/ChapterList/ChapterList";
import { getImageUrl, getMangaById, getStatistics } from "@/services/mangadex";
import { notFound } from "next/navigation";
import { Relationship } from "../../../../../../../types";
type Props = {
    params: {
        id: string;
        name: string;
    };
};

const page = async ({ params }: Props) => {
    const [manga, statisticsResult] = await Promise.all([
        getMangaById(params.id, [
            "artist",
            "author",
            "cover_art",
            "creator",
            "tag",
            "manga",
        ]),
        getStatistics("manga", params.id),
    ]);
    if (!manga) notFound();

    const statistics =
        statisticsResult.result.statistics[
            Object.keys(statisticsResult.result.statistics)[0]
        ];

    const coverArt = manga.result.data.relationships.find(
        (relation) => relation.type === "cover_art"
    );
    const uniqueAuthorsAndArtist = manga.result.data.relationships
        .filter(
            (relation) =>
                relation.type === "author" || relation.type === "artist"
        )
        .reduce((data: Relationship[], authorOrArtist) => {
            //handle remove duplicate data
            const exist = data.find(
                (obj) => obj.attributes.name === authorOrArtist.attributes.name
            );
            if (exist) return data;
            data.push(authorOrArtist);
            return data;
        }, []);

    const altTitle =
        manga.result.data.attributes.altTitles.length > 1
            ? manga.result.data.attributes.altTitles[0][
                  Object.keys(manga.result.data.attributes.altTitles[0])[0]
              ]
            : "";

    const tagList = manga.result.data.attributes.tags.map((tag) => {
        return (
            <span
                key={tag.id}
                className="uppercase  text-[11px] text-foreground font-bold px-1.5 rounded-md bg-customs-accent"
            >
                {tag.attributes.name.en}
            </span>
        );
    });
    return (
        <Wrapper className="mt-2">
            <div className=" md:px-4 flex gap-6">
                <div className="top-0 left-0 w-full -z-[1] [clip:rect(0,auto,auto,0)] [clip-path:inset(0_0)] h-[calc(var(--banner-height)_+_0.5rem)]  absolute">
                    <div
                        className="fixed  top-0 left-0 w-full h-[calc(var(--banner-height)_+_0.5rem)] "
                        style={{
                            background: `no-repeat  center 25% / cover  url(${getImageUrl(
                                "256",
                                params.id,
                                coverArt?.attributes.fileName
                            )})`,
                        }}
                    ></div>
                    <div className="backdrop-blur-sm absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-md-background/80 to-md-background from-0% to-100% sm:bg-gradient-to-tr sm:from-black/60 sm:from-[44%] sm:to-transparent"></div>
                </div>
                <div
                    className="blur-xl hidden sm:block absolute min-h-[670px] w-full top-0 left-0  -z-[2]"
                    style={{
                        background: `radial-gradient(circle at top, hsla(var(--md-background) / 0.8), hsla(var(--md-background)) 75%), no-repeat top 30% center / 100% url(${getImageUrl(
                            "256",
                            params.id,
                            coverArt?.attributes.fileName
                        )})`,
                    }}
                ></div>

                <div className="w-[100px] sm:w-[200px]">
                    <Image
                        className="w-full rounded"
                        width={512}
                        height={725}
                        src={getImageUrl(
                            "512",
                            params.id,
                            coverArt?.attributes.fileName
                        )}
                        alt="cover_art"
                    />
                </div>
                <div className="flex sm:h-full sm:min-h-[360px] flex-col w-[calc(100%_-_100px_-_1.5rem)] sm:w-[calc(100%_-_200px_-_1.5rem)]">
                    <h1 className="text-2xl sm:text-[2.5rem]/10  md:text-5xl/ font-bold line-clamp-2">
                        {manga.result.data.attributes.title.en}
                    </h1>
                    <div className="text-foreground text-base sm:text-xl line-clamp-2 mt-1">
                        {altTitle}
                    </div>
                    <div className="text-foreground sm:mt-auto text-xs sm:text-base font-normal">
                        {uniqueAuthorsAndArtist
                            .map((value) => value.attributes.name)
                            .join(", ")}
                    </div>
                    <div className="hidden sm:block mt-5">
                        <div className="flex items-center gap-2 ">
                            <Button
                                className="rounded px-8"
                                variant={"primary"}
                            >
                                Add To Library
                            </Button>
                            <Button
                                variant={"secondary"}
                                className="px-2 rounded"
                            >
                                <BookOpen />
                            </Button>
                        </div>
                        <div className="tags flex gap-1.5 mt-3 overflow-hidden max-h-[18px] flex-wrap">
                            <span className="uppercase  text-[11px] text-foreground font-bold px-1.5 rounded-md bg-status-yellow">
                                Suggestive
                            </span>
                            {tagList}
                        </div>
                        <div className="flex items-center gap-2 text-status-blue mt-2">
                            <span className="w-2 h-2 rounded-full bg-status-blue"></span>
                            <span className="uppercase sm:font-semibold text-foreground text-xs">
                                PUBLICATION: {manga.result.data.attributes.year}
                                ,{" "}
                                <span>
                                    {manga.result.data.attributes.status}
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="flex mt-auto sm:mt-3  gap-2 items-baseline sm:text-base text-sm">
                        <span className="flex items-center gap-1 text-primary ">
                            <Star size={16} />
                            {statistics?.rating?.average?.toFixed(2) ||
                                statistics?.rating?.bayesian?.toFixed(2)}
                        </span>
                        <span className="flex items-center gap-1 text-foreground  ">
                            <Bookmark size={16} />
                            {statistics?.follows || 0}
                        </span>
                        <span className="flex items-center gap-1 text-foreground  ">
                            <MessageSquare size={16} />
                            {statistics?.comments?.repliesCount || 0}
                        </span>
                        <span className="flex items-center gap-1 text-foreground  ">
                            <Eye size={16} />
                            N/A
                        </span>
                    </div>
                </div>
            </div>
            <div className="sm:hidden">
                <div className=" tags flex gap-1.5 mt-3 flex-wrap max-h-[39px] overflow-hidden">
                    <span className="uppercase  text-[11px] text-foreground font-semibold px-1.5 rounded-md bg-status-yellow">
                        Suggestive
                    </span>
                    {tagList}
                </div>

                <div className="flex items-center gap-2 text-status-blue mt-2">
                    <span className="w-2 h-2 rounded-full bg-status-blue"></span>
                    <span className="uppercase text-foreground text-xs">
                        PUBLICATION: {manga.result.data.attributes.year},{" "}
                        <span>{manga.result.data.attributes.status}</span>
                    </span>
                </div>

                <div className="mt-4 flex items-center gap-2 ">
                    <Button variant={"primary"} className="px-2 rounded-sm">
                        <Bookmark />
                    </Button>
                    <Button
                        variant={"secondary"}
                        className="outline-none  border-none px-2 rounded-sm"
                    >
                        <MoreHorizontal />
                    </Button>
                    {/* <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button
                                        variant={"secondary"}
                                        className="outline-none  border-none px-2 rounded-sm"
                                    >
                                        <MoreHorizontal />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-accent-2 min-w-[140px] rounded-lg">
                                    <DropdownMenuItem>Share</DropdownMenuItem>
                                    <DropdownMenuItem>Upload</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div> */}
                    <Button
                        className="grow capitalize gap-4 rounded-sm"
                        variant={"secondary"}
                    >
                        <BookOpen /> Read
                    </Button>
                </div>
            </div>
            <DetailDesc manga={manga.result.data} />
            <ChapterList manga={manga.result.data} />
        </Wrapper>
    );
};

export default page;
