import BackNavigation from "@/components/BackNavigation/BackNavigation";
import RecentMangaGridItem from "@/components/ListMangaItems/RecentMangaGridItem";
import RecentMangaListItem from "@/components/ListMangaItems/RecentMangaListItem";
import RecentMangaStretchItem from "@/components/ListMangaItems/RecentMangaStretchItem";
import NotfoundData from "@/components/NotFoundData/NotfoundData";
import Pagination from "@/components/Pagination/Pagination";
import OpenFilterButton from "@/components/SearchFilter/OpenFilterButton";
import SearchFilter from "@/components/SearchFilter/SearchFilter";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchFilterProvider } from "@/contexts/SearchFilterContext";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import { advancedSearch, getStatisticsList } from "@/services/mangadex";
import { LayoutGrid, List, StretchHorizontal } from "lucide-react";
import { getTranslations } from "next-intl/server";

type Props = {
    searchParams: {
        q?: string;
        order: string;
        year?: number;
        excludes?: string;
        includes?: string;
        status?: string;
        rating?: string;
        artists?: string;
        authors?: string;
        demos?: string;
        page: number;
    };
};

const page = async ({ searchParams: { page = 1, ...searchParams } }: Props) => {
    const limit = 32;
    const maxPage = 312;
    const offset = (page - 1) * limit;
    const t = await getTranslations("listMangaTitles");
    const data = await advancedSearch(searchParams.q, {
        order: searchParams.order,
        excludedTags: searchParams.excludes?.split(","),
        includedTags: searchParams.includes?.split(","),
        status: searchParams.status?.split(","),
        publicationDemographic: searchParams.demos?.split(","),
        authors: searchParams.authors?.split(","),
        artists: searchParams.artists?.split(","),
        year: searchParams.year,
        includes: ["cover_art"],
        offset,
        limit,
    });
    const statisticsResult = await getStatisticsList(
        "manga",
        data.data.map((manga) => manga.id)
    );
    const statistics = statisticsResult.statistics;

    const totalPage =
        data.total - limit < 10000 ? Math.ceil(data.total / limit) : maxPage;
    const isNotFound = data.data.length === 0;
    const renderItem = (type: "list" | "stretch" | "grid") => {
        if (isNotFound) return null;
        const comps = {
            list: RecentMangaListItem,
            stretch: RecentMangaStretchItem,
            grid: RecentMangaGridItem,
        };
        const Comp = comps[type];
        return data.data.map((manga) => (
            <Comp
                statistic={statistics[manga.id]}
                manga={manga}
                key={manga.id}
            />
        ));
    };
    return (
        <Wrapper className="mt-4">
            <BackNavigation title={t("advancedSearch")} />
            <div className="mt-10">
                <SearchFilterProvider>
                    <SearchFilter />
                    <div className="mt-6">
                        <Tabs
                            defaultValue="stretch"
                            className="w-full flex flex-col"
                        >
                            <div className="flex justify-between md:justify-end items-stretch">
                                <OpenFilterButton />
                                <TabsList className="p-0 rounded-none  h-auto ">
                                    <TabsTrigger
                                        value="list"
                                        className="h-10 w-10"
                                    >
                                        <div>
                                            <List size={24} />
                                        </div>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="stretch"
                                        className="h-10 w-10"
                                    >
                                        <div>
                                            <StretchHorizontal />
                                        </div>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="grid"
                                        className="h-10 w-10"
                                    >
                                        <div>
                                            <LayoutGrid />
                                        </div>
                                    </TabsTrigger>
                                </TabsList>
                            </div>
                            <div className="mt-4">
                                <TabsContent value="list">
                                    {isNotFound && <NotfoundData />}

                                    <div className="space-y-2">
                                        {renderItem("list")}
                                    </div>
                                </TabsContent>

                                <TabsContent value="stretch">
                                    {isNotFound && <NotfoundData />}

                                    <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
                                        {renderItem("stretch")}
                                    </div>
                                </TabsContent>
                                <TabsContent value="grid">
                                    {isNotFound && <NotfoundData />}

                                    <div className="grid gap-2 grid-cols-2 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
                                        {renderItem("grid")}
                                    </div>
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>
                </SearchFilterProvider>
            </div>
            <Pagination asLink className="mt-4" totalPage={totalPage} />
        </Wrapper>
    );
};

export default page;
