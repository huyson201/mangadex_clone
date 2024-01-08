"use client";
import LatestMangaListitem from "@/components/ListMangaItems/LatestMangaListItem";
import RingLoader from "@/components/Loader/RingLoader";
import NotfoundData from "@/components/NotFoundData/NotfoundData";
import Pagination from "@/components/Pagination/Pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { READING_HISTORY_KEY } from "@/constants";
import { useLocalStorage } from "@/hooks";
import { getChapters, getMangaList } from "@/services/mangadex";
import { Chapter, Manga } from "@/types";
import { List, StretchHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import HistoryStretchItem from "./HistoryStretchItem";

type Props = {};
export interface ReadingHistoryItem {
    mangaId: string;
    chapterId: string;
    date: Date;
}

const HistoryContent = (props: Props) => {
    const { data, setData } =
        useLocalStorage<ReadingHistoryItem[]>(READING_HISTORY_KEY);
    const searchParams = useSearchParams();
    const page = +(searchParams.get("page") || 1);
    const limit = 32;
    let offset = (page - 1) * limit;
    const totalPage = Math.ceil((data?.length || 0) / limit);
    const historyDataByPage =
        data
            ?.sort(
                (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .slice(offset, limit) || [];

    const groupHistoryData = historyDataByPage.reduce(
        (result: { mangaId: string; chapters: string[] }[], item) => {
            const lastItem = result[result.length - 1];
            if (item.mangaId === lastItem?.mangaId) {
                lastItem.chapters = [...lastItem.chapters, item.chapterId];
            } else {
                result.push({
                    mangaId: item.mangaId,
                    chapters: [item.chapterId],
                });
            }
            return result;
        },
        []
    );

    const { data: resData, isLoading } = useSWR(
        historyDataByPage.length > 0 ? `/history/${page}` : null,
        async () => {
            const mangaIds = groupHistoryData.map((item) => item.mangaId);
            const chapterIds = historyDataByPage.map((item) => item.chapterId);

            const [mangaListRes, chaptersRes] = await Promise.all([
                getMangaList({
                    ids: mangaIds,
                    includes: ["cover_art", "artist"],
                    limit: mangaIds.length,
                    offset: 0,
                }),
                getChapters({
                    ids: chapterIds,
                    includes: ["scanlation_group", "user"],
                    limit: chapterIds.length,
                    offset: 0,
                }),
            ]);

            const mangaListMap = mangaListRes.data.reduce(
                (result: Record<string, Manga>, manga) => {
                    result[manga.id] = manga;
                    return result;
                },
                {}
            );

            const chaptersMap = chaptersRes.data.reduce(
                (result: Record<string, Chapter>, chapter) => {
                    result[chapter.id] = chapter;
                    return result;
                },
                {}
            );

            return {
                mangaList: mangaListMap,
                chapters: chaptersMap,
            };
        }
    );

    if ((!isLoading && !resData) || !data) {
        return <NotfoundData />;
    }

    const renderData = (type: "list" | "stretch") => {
        const Comp = type === "list" ? LatestMangaListitem : HistoryStretchItem;
        if (isLoading) {
            return (
                <div className="flex items-center justify-center py-6">
                    <RingLoader />
                </div>
            );
        }

        if (resData && !isLoading) {
            return groupHistoryData.map((value, index) => {
                const manga = resData?.mangaList[value.mangaId];
                const chapters = value.chapters.map((id) => {
                    return resData.chapters?.[id];
                });

                return (
                    <Comp
                        key={`${value.mangaId}-${index}`}
                        manga={manga}
                        chapters={chapters}
                    />
                );
            });
        }
    };

    return (
        <>
            <Tabs defaultValue="stretch" className="w-full flex flex-col">
                <TabsList className="p-0 rounded-none  h-auto ml-auto">
                    <TabsTrigger value="list" className="h-12">
                        <List />
                    </TabsTrigger>
                    <TabsTrigger value="stretch" className="h-12">
                        <StretchHorizontal />
                    </TabsTrigger>
                </TabsList>
                <div className="mt-4">
                    <TabsContent value="list">
                        <div className="space-y-4">{renderData("list")}</div>
                    </TabsContent>
                    <TabsContent value="stretch">
                        <div className="grid grid-cols-1 gap-y-2">
                            {renderData("stretch")}
                        </div>
                    </TabsContent>
                </div>
            </Tabs>
            <Pagination asLink totalPage={totalPage} className="mt-4" />
        </>
    );
};

export default HistoryContent;
