"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMangaFeed } from "@/services/mangadex";
import { Manga } from "@/types";
import { useRef, useState } from "react";
import useSWR from "swr";
import DetailInfo from "../DetailDesc/DetailInfo";
import RingLoader from "../Loader/RingLoader";
import NotfoundData from "../NotFoundData/NotfoundData";
import Pagination from "../Pagination/Pagination";
import { Button } from "../ui/button";
import ChapterItem from "./ChapterItem";
import SelectChapterLang from "./SelectChapterLang";
type Props = {
    manga: Manga;
};

const ChapterList = ({ manga }: Props) => {
    const [chapterPage, setChapterPage] = useState(1);
    const [sortBy, setSortBy] = useState<"chapter.desc" | "chapter.asc">(
        "chapter.desc"
    );
    const maxPage = 312;
    const limit = 14;
    const offset = (chapterPage - 1) * limit;
    const scrollRef = useRef<HTMLDivElement>(null);
    const defaultTranslatedLanguage =
        manga.attributes.availableTranslatedLanguages.find(
            (value) => value == "en"
        ) || manga.attributes.availableTranslatedLanguages[0];

    const [chapterFilterLang, setChapterFilterLang] = useState(
        defaultTranslatedLanguage
    );

    const { data, isLoading } = useSWR(
        `/manga/${manga.id}/feed/${chapterFilterLang}/${sortBy}/${chapterPage}`,
        () =>
            getMangaFeed(manga.id, {
                order: sortBy,
                includes: ["scanlation_group", "user"],
                translatedLanguage: [chapterFilterLang],
                limit: limit,
                offset,
            })
    );

    const totalPage = data
        ? data.total - limit < 10000
            ? Math.ceil(data.total / limit)
            : maxPage
        : 0;

    return (
        <div className="mt-10 lg:mt-4">
            <Tabs defaultValue="chapters">
                <TabsList className="rounded-sm">
                    <TabsTrigger
                        className="hover:text-foreground text-gray-500 font-semibold"
                        value="chapters"
                    >
                        Chapters
                    </TabsTrigger>
                    <TabsTrigger
                        className="hover:text-foreground text-gray-500 font-semibold"
                        value="comment"
                    >
                        Comment
                    </TabsTrigger>
                </TabsList>
                <div className="grid grid-cols-12 gap-x-4 mt-4">
                    <div className="lg:col-span-4 lg:block hidden">
                        <DetailInfo className="" manga={manga} />
                    </div>
                    <div className="lg:col-span-8 col-span-12">
                        <TabsContent value="chapters">
                            {manga.attributes.availableTranslatedLanguages
                                .length !== 0 && (
                                <div
                                    className="flex gap-2 justify-between"
                                    ref={scrollRef}
                                >
                                    <Button
                                        variant={"secondary"}
                                        className="py-1 px-4 h-auto "
                                        onClick={() =>
                                            setSortBy((prev) =>
                                                prev === "chapter.desc"
                                                    ? "chapter.asc"
                                                    : "chapter.desc"
                                            )
                                        }
                                    >
                                        {sortBy === "chapter.desc"
                                            ? "Descending"
                                            : "Ascending"}
                                    </Button>
                                    <SelectChapterLang
                                        onChange={(value) =>
                                            setChapterFilterLang(
                                                value ||
                                                    defaultTranslatedLanguage
                                            )
                                        }
                                        availableTranslatedLanguages={
                                            manga.attributes
                                                .availableTranslatedLanguages
                                        }
                                        defaultTranslatedLanguage={
                                            defaultTranslatedLanguage
                                        }
                                    />
                                </div>
                            )}

                            {(!data && !isLoading) || data?.total === 0 ? (
                                <NotfoundData title="No Chapters" />
                            ) : (
                                <>
                                    <div className="mt-4 space-y-2">
                                        {isLoading && (
                                            <div className="flex py-6 items-center justify-center my-4">
                                                <RingLoader />
                                            </div>
                                        )}
                                        {data &&
                                            data.data.map((chapter) => (
                                                <ChapterItem
                                                    key={chapter.id}
                                                    chapter={chapter}
                                                />
                                            ))}
                                    </div>
                                    <div>
                                        <Pagination
                                            className="mt-6"
                                            onChange={(page) => {
                                                setChapterPage(page);
                                                scrollRef.current?.scrollIntoView(
                                                    {
                                                        block: "center",
                                                    }
                                                );
                                            }}
                                            defaultCurrent={1}
                                            totalPage={totalPage}
                                        />
                                    </div>
                                </>
                            )}
                        </TabsContent>
                        <TabsContent value="comment" className="mt-4">
                            Comment
                        </TabsContent>
                    </div>
                </div>
            </Tabs>
        </div>
    );
};

export default ChapterList;
