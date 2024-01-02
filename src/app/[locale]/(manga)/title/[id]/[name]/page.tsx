import React from "react";
import { Button } from "@/components/ui/button";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import { BookOpen, Bookmark, MoreHorizontal } from "lucide-react";
import Image from "next/image";
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
import {
    getCoverArtFromManga,
    getDataByLocale,
    getMangaTitle,
    getTagName,
} from "@/lib/manga";
import StatisticInfo from "@/components/StatisticInfo/StatisticInfo";
import { cn } from "@/lib/utils";
import { statusDotVariants } from "@/components/MangaStatus/MangaStatus";
import AddLib from "./AddLib";
import { auth } from "@/auth";
import connectDb from "@/lib/mongodb";
import { Follow } from "@/models/Follow";

type Props = {
    params: {
        id: string;
        name: string;
    };
};

const page = async ({ params }: Props) => {
    const [manga, statisticsResult, session] = await Promise.all([
        getMangaById(params.id, [
            "artist",
            "author",
            "cover_art",
            "creator",
            "tag",
            "manga",
        ]),
        getStatistics("manga", params.id),
        auth(),
    ]);
    if (!manga) notFound();

    await connectDb();
    const follow = session
        ? (
              await Follow.findOne({
                  userId: session.user._id,
                  mangaId: manga.result.data.id,
              })
          )?.toJSON()
        : undefined;
    const statistics = statisticsResult.result.statistics[manga.result.data.id];
    const coverArt = getCoverArtFromManga(manga.result.data);

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
            ? getDataByLocale(manga.result.data.attributes.altTitles[0])
            : "";

    const tagList = manga.result.data.attributes.tags.map((tag) => {
        return (
            <span
                key={tag.id}
                className="uppercase  text-[11px] text-foreground font-bold px-1.5 rounded-md bg-customs-accent"
            >
                {getTagName(tag)}
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
                        className="w-full h-[144px] sm:h-[290px] object-cover rounded"
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
                    <h1 className="text-2xl sm:text-[2.5rem]/10  md:text-5xl font-bold line-clamp-2">
                        {getMangaTitle(manga.result.data)}
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
                            <AddLib
                                isLoggedIn={!!session}
                                follow={
                                    follow && JSON.parse(JSON.stringify(follow))
                                }
                                manga={manga.result.data}
                            />
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
                            <span
                                className={cn(
                                    statusDotVariants({
                                        variant:
                                            manga.result.data.attributes.status,
                                    })
                                )}
                            ></span>
                            <span className="uppercase sm:font-semibold text-foreground text-xs">
                                PUBLICATION: {manga.result.data.attributes.year}
                                ,{" "}
                                <span>
                                    {manga.result.data.attributes.status}
                                </span>
                            </span>
                        </div>
                    </div>
                    <StatisticInfo
                        className="flex-wrap gap-y-1 mt-4 sm sm:gap-y-2"
                        statistics={statistics}
                    />
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
                    <span
                        className={cn(
                            statusDotVariants({
                                variant: manga.result.data.attributes.status,
                            })
                        )}
                    ></span>
                    <span className="uppercase text-foreground text-xs">
                        PUBLICATION: {manga.result.data.attributes.year},{" "}
                        <span>{manga.result.data.attributes.status}</span>
                    </span>
                </div>

                <div className="mt-4 flex items-center gap-2 ">
                    <AddLib
                        follow={follow && JSON.parse(JSON.stringify(follow))}
                        isLoggedIn={!!session}
                        manga={manga.result.data}
                    />
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
