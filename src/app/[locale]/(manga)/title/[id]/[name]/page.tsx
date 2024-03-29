import { auth } from "@/auth";
import ChapterList from "@/components/ChapterList/ChapterList";
import DetailDesc from "@/components/DetailDesc/DetailDesc";
import { statusDotVariants } from "@/components/MangaStatus/MangaStatus";
import StatisticInfo from "@/components/StatisticInfo/StatisticInfo";
import Tag from "@/components/Tag/Tag";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import { Follow, prisma } from "@/lib";
import {
    createTagLink,
    getCoverArtFromManga,
    getDataByLocale,
    getMangaTitle,
    getTagName,
} from "@/lib/manga";
import { cn } from "@/lib/utils";
import { getImageUrl, getMangaById, getStatistics } from "@/services/mangadex";
import { Relationship } from "@/types";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddLib from "./AddLib";
import ReadButton from "./ReadButton";

type Props = {
    params: {
        id: string;
        name: string;
    };
};

const page = async ({ params }: Props) => {
    const [manga, statisticsResult, session, t] = await Promise.all([
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
        getTranslations("detailManga"),
    ]);
    if (!manga) notFound();

    const follow = session
        ? await prisma.follow.findUnique({
              where: {
                  mangaId_userId: {
                      userId: session.user.id,
                      mangaId: manga.result.data.id,
                  },
              },
          })
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
            <Tag key={tag.id} variant={"default"} asChild>
                <Link href={createTagLink(tag)} className=" px-1.5">
                    {getTagName(tag)}
                </Link>
            </Tag>
        );
    });
    return (
        <Wrapper className="mt-2">
            <div className=" md:px-4 flex gap-6">
                <div className=" top-0 left-0 w-full -z-[1] [clip:rect(0,auto,auto,0)] [clip-path:inset(0_0)] h-[calc(var(--banner-height)_+_0.5rem)]  absolute">
                    <div className="fixed  top-0 left-0 w-full h-[calc(var(--banner-height)_+_0.5rem)] ">
                        <Image
                            src={getImageUrl(
                                "256",
                                params.id,
                                coverArt?.attributes.fileName
                            )}
                            width={256}
                            height={600}
                            className="w-full h-full object-cover object-[center_25%]"
                            alt="banner"
                        />
                    </div>
                    <div className="sm:backdrop-blur-sm absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-background/80 to-background from-0% to-100% sm:bg-gradient-to-tr sm:from-background/60 sm:from-[44%] sm:to-transparent"></div>
                </div>
                <div
                    className=" blur-xl hidden sm:block absolute h-[670px] w-full top-0 left-0  -z-[2]"
                    style={{
                        background: `radial-gradient(circle at top, hsla(var(--background) / 0.8), hsla(var(--background)) 75%), no-repeat top 30% center / 100% url(${getImageUrl(
                            "256",
                            params.id,
                            coverArt?.attributes.fileName
                        )})`,
                    }}
                >
                    <Image
                        src={getImageUrl(
                            "256",
                            params.id,
                            coverArt?.attributes.fileName
                        )}
                        width={256}
                        height={670}
                        className="w-full h-full object-cover  object-[center_35%] "
                        alt="banner"
                    />
                    <div
                        className=" absolute h-full w-full top-0 left-0"
                        style={{
                            background: `radial-gradient(circle at top, hsla(var(--background) / 0.8), hsla(var(--background)) 75%)`,
                        }}
                    ></div>
                </div>

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
                <div className="text-white flex sm:h-full sm:min-h-[360px] flex-col w-[calc(100%_-_100px_-_1.5rem)] sm:w-[calc(100%_-_200px_-_1.5rem)]">
                    <h1 className="text-2xl sm:text-[2.5rem]/10  md:text-5xl font-bold line-clamp-2">
                        {getMangaTitle(manga.result.data)}
                    </h1>
                    <div className="text-white text-base sm:text-xl line-clamp-2 mt-1">
                        {altTitle}
                    </div>
                    <div className="text-white sm:mt-auto text-xs sm:text-base font-normal">
                        {uniqueAuthorsAndArtist
                            .map((value) => value.attributes.name)
                            .join(", ")}
                    </div>
                    <div className="hidden sm:block mt-5">
                        <div className="flex items-center gap-2 ">
                            <AddLib
                                isLoggedIn={!!session}
                                follow={follow as Follow | undefined}
                                manga={manga.result.data}
                            />
                            <ReadButton mangaId={manga.result.data.id} />
                        </div>
                        <div className="tags flex gap-1.5 mt-3 overflow-hidden max-h-[18px] flex-wrap">
                            {manga.result.data.attributes.contentRating ===
                                "suggestive" && (
                                <Tag variant={"warning"} className="px-1.5 ">
                                    Suggestive
                                </Tag>
                            )}

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
                                {t("publication")}:{" "}
                                {manga.result.data.attributes.year},{" "}
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
                    <Tag variant={"warning"} className="px-1.5 ">
                        Suggestive
                    </Tag>
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

                    <ReadButton mangaId={manga.result.data.id} />
                </div>
            </div>
            <DetailDesc manga={manga.result.data} />
            <ChapterList manga={manga.result.data} />
        </Wrapper>
    );
};

export default page;
