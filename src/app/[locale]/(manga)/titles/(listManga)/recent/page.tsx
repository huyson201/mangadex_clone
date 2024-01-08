import RecentMangaGridItem from "@/components/ListMangaItems/RecentMangaGridItem";
import RecentMangaListItem from "@/components/ListMangaItems/RecentMangaListItem";
import RecentMangaStretchItem from "@/components/ListMangaItems/RecentMangaStretchItem";
import Pagination from "@/components/Pagination/Pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    getRecentlyAddedMangaList,
    getStatisticsList,
} from "@/services/mangadex";
import { LayoutGrid, List, StretchHorizontal } from "lucide-react";

type Props = {
    searchParams: {
        page: number;
    };
};

const page = async ({ searchParams: { page = 1 } }: Props) => {
    const limit = 32;
    const maxPage = 312;
    const offset = ((page > maxPage ? maxPage : page) - 1) * limit;
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
    const renderItem = (type: "list" | "stretch" | "grid") => {
        const comps = {
            list: RecentMangaListItem,
            stretch: RecentMangaStretchItem,
            grid: RecentMangaGridItem,
        };
        const Comp = comps[type];
        return recentAddedList.map((manga) => (
            <Comp
                statistic={statistics[manga.id]}
                manga={manga}
                key={manga.id}
            />
        ));
    };
    return (
        <>
            <div className="mt-10">
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
                                {renderItem("list")}
                            </div>
                        </TabsContent>
                        <TabsContent value="stretch">
                            <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
                                {renderItem("stretch")}
                            </div>
                        </TabsContent>
                        <TabsContent value="grid">
                            <div className="grid gap-2 grid-cols-2 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
                                {renderItem("grid")}
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
            <Pagination asLink className="mt-4" totalPage={totalPage} />
        </>
    );
};

export default page;
