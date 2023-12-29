import { Button } from "@/components/ui/button";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import { ArrowLeft, LayoutGrid, List, StretchHorizontal } from "lucide-react";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecentMangaGridItem from "@/components/ListMangaItems/RecentMangaGridItem";
import RecentMangaStretchItem from "@/components/ListMangaItems/RecentMangaStretchItem";
import RecentMangaListItem from "@/components/ListMangaItems/RecentMangaListItem";
import {
    getRecentlyAddedMangaList,
    getStatisticsList,
} from "@/services/mangadex";
import Pagination from "@/components/Pagination/Pagination";

type Props = {
    searchParams: {
        page: number;
    };
};

const page = async ({ searchParams: { page = 1 } }: Props) => {
    const limit = 32;
    const maxPage = 312;
    const offset = (page - 1) * limit;
    const recentListResponse = await getRecentlyAddedMangaList(limit, offset, [
        "cover_art",
    ]);

    const recentAddedList = recentListResponse.data;

    const statisticsResponse = await getStatisticsList(
        "manga",
        recentAddedList.map((value) => value.id)
    );
    const statistics = statisticsResponse.statistics;

    const totalPage =
        recentListResponse.total - limit < 10000
            ? Math.ceil(recentListResponse.total / limit)
            : maxPage;
    return (
        <Wrapper>
            <div className="flex items-center gap-6">
                <Button
                    variant={"outline"}
                    className="rounded-full w-10 h-10 p-0"
                >
                    <ArrowLeft />
                </Button>
                <span className="capitalize text-2xl font-medium">
                    Recently Added
                </span>
            </div>
            <div className="mt-4">
                <Tabs defaultValue="grid" className="w-full flex flex-col">
                    <TabsList className="p-0 rounded-none  h-auto ml-auto">
                        <TabsTrigger value="list" className="h-12">
                            <List />
                        </TabsTrigger>
                        <TabsTrigger value="stretch" className="h-12">
                            <StretchHorizontal />
                        </TabsTrigger>
                        <TabsTrigger value="grid" className="h-12">
                            <LayoutGrid />
                        </TabsTrigger>
                    </TabsList>
                    <div className="mt-4">
                        <TabsContent value="list">
                            <div className="space-y-2">
                                {recentAddedList.map((manga) => (
                                    <RecentMangaListItem
                                        statistic={statistics[manga.id]}
                                        manga={manga}
                                        key={manga.id}
                                    />
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="stretch">
                            <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
                                {recentAddedList.map((manga) => (
                                    <RecentMangaStretchItem
                                        statistic={statistics[manga.id]}
                                        manga={manga}
                                        key={manga.id}
                                    />
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="grid">
                            <div className="grid gap-2 grid-cols-2 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
                                {recentAddedList.map((manga) => (
                                    <RecentMangaGridItem
                                        manga={manga}
                                        key={manga.id}
                                    />
                                ))}
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
            <Pagination asLink className="mt-4" totalPage={totalPage} />
        </Wrapper>
    );
};

export default page;
