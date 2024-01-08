import RecentMangaGridItem from "@/components/ListMangaItems/RecentMangaGridItem";
import RecentMangaListItem from "@/components/ListMangaItems/RecentMangaListItem";
import RecentMangaStretchItem from "@/components/ListMangaItems/RecentMangaStretchItem";
import NotfoundData from "@/components/NotFoundData/NotfoundData";
import Pagination from "@/components/Pagination/Pagination";
import OpenFilterButton from "@/components/SearchFilter/OpenFilterButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMangaList, getStatisticsList } from "@/services/mangadex";
import { LayoutGrid, List, StretchHorizontal } from "lucide-react";

type Props = {
    params: {
        name: string;
        id: string;
    };
    searchParams: {
        page?: number;
    };
};

const page = async ({ params, searchParams: { page = 1 } }: Props) => {
    const limit = 32;
    const offset = (page - 1) * limit;
    const maxPage = 312;
    const response = await getMangaList({
        includedTags: [params.id],
        offset,
        limit,
        includes: ["cover_art"],
    });
    const statistics = (
        await getStatisticsList(
            "manga",
            response.data.map((manga) => manga.id)
        )
    ).statistics;
    const totalPage =
        response.total - limit < 10000
            ? Math.ceil(response.total / limit)
            : maxPage;

    const renderItem = (type: "list" | "stretch" | "grid") => {
        const comps = {
            list: RecentMangaListItem,
            stretch: RecentMangaStretchItem,
            grid: RecentMangaGridItem,
        };
        const Comp = comps[type];
        return response.data.map((manga) => (
            <Comp
                statistic={statistics[manga.id]}
                manga={manga}
                key={manga.id}
            />
        ));
    };
    return (
        <>
            <Tabs defaultValue="grid" className="w-full flex flex-col">
                <div className="flex justify-between md:justify-end items-stretch">
                    <OpenFilterButton />
                    <TabsList className="p-0 rounded-none  h-auto ">
                        <TabsTrigger value="list" className="h-10 w-10">
                            <div>
                                <List size={24} />
                            </div>
                        </TabsTrigger>
                        <TabsTrigger value="stretch" className="h-10 w-10">
                            <div>
                                <StretchHorizontal />
                            </div>
                        </TabsTrigger>
                        <TabsTrigger value="grid" className="h-10 w-10">
                            <div>
                                <LayoutGrid />
                            </div>
                        </TabsTrigger>
                    </TabsList>
                </div>
                <div className="mt-4">
                    <TabsContent value="list">
                        {response.data.length === 0 && <NotfoundData />}

                        <div className="space-y-2">{renderItem("list")}</div>
                    </TabsContent>

                    <TabsContent value="stretch">
                        {response.data.length === 0 && <NotfoundData />}
                        <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
                            {renderItem("stretch")}
                        </div>
                    </TabsContent>
                    <TabsContent value="grid">
                        {response.data.length === 0 && <NotfoundData />}
                        <div className="grid gap-2 grid-cols-2 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
                            {renderItem("grid")}
                        </div>
                    </TabsContent>
                </div>
            </Tabs>
            <Pagination asLink totalPage={totalPage} className="mt-4" />
        </>
    );
};

export default page;
