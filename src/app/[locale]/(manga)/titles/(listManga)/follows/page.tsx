import { auth } from "@/auth";
import RecentMangaGridItem from "@/components/ListMangaItems/RecentMangaGridItem";
import RecentMangaListItem from "@/components/ListMangaItems/RecentMangaListItem";
import RecentMangaStretchItem from "@/components/ListMangaItems/RecentMangaStretchItem";
import RingLoader from "@/components/Loader/RingLoader";
import NotfoundData from "@/components/NotFoundData/NotfoundData";
import Pagination from "@/components/Pagination/Pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Follow, prisma } from "@/lib";
import { getMangaList, getStatisticsList } from "@/services/mangadex";
import { ReadingStatus, readingStatusData } from "@/types";
import { LayoutGrid, List, StretchHorizontal } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

type Props = {
    searchParams: {
        tab?: ReadingStatus;
        page?: number;
    };
};

async function page({ searchParams: { tab = "reading", page = 1 } }: Props) {
    const session = await auth();

    const totalDoc = prisma.follow.count({
        where: {
            userId: session!.user.id,
            status: tab,
        },
    });

    const limit = 32;
    const offset = (page - 1) * limit;
    const follows = prisma.follow.findMany({
        where: { userId: session!.user.id, status: tab },
        orderBy: [{ updatedAt: "desc" }],
        skip: offset,
        take: limit,
    });

    return (
        <div className="mt-4">
            <Tabs defaultValue={tab} className="w-full ">
                <TabsList className="py-1.5 rounded-none  h-auto ">
                    {readingStatusData.map((value) => {
                        if (value === "none") return null;
                        return (
                            <TabsTrigger key={value} value={value} asChild>
                                <Link
                                    className="capitalize"
                                    href={{
                                        query: {
                                            tab: value,
                                        },
                                    }}
                                >
                                    {value}
                                </Link>
                            </TabsTrigger>
                        );
                    })}
                </TabsList>
                <div className="mt-4">
                    {readingStatusData.map((value) => {
                        if (value === "none") return null;
                        return (
                            <TabsContent key={value} value={value}>
                                <Suspense
                                    fallback={
                                        <div className="flex items-center justify-center">
                                            {<RingLoader />}
                                        </div>
                                    }
                                >
                                    <FollowContent
                                        follows={follows}
                                        total={totalDoc}
                                        limit={limit}
                                    />
                                </Suspense>
                            </TabsContent>
                        );
                    })}
                </div>
            </Tabs>
        </div>
    );
}

const FollowContent = async ({
    follows,
    total,
    limit,
}: {
    follows: Promise<Follow[]>;
    total: Promise<number>;
    limit: number;
}) => {
    const [followsRes, totalDoc] = await Promise.all([follows, total]);
    const maxPage = Math.ceil(totalDoc / limit);
    const mangaListRes =
        followsRes.length > 0
            ? await getMangaList({
                  ids: followsRes.map((follow) => follow.mangaId),
                  includes: ["cover_art"],
              })
            : null;

    const statisticsResponse =
        mangaListRes &&
        (await getStatisticsList(
            "manga",
            mangaListRes.data.map((value) => value.id)
        ));

    const statistics = statisticsResponse?.statistics;

    return (
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
                        {mangaListRes &&
                        mangaListRes.data.length > 0 &&
                        statistics ? (
                            <div className="space-y-2">
                                {mangaListRes.data.map((manga) => (
                                    <RecentMangaListItem
                                        statistic={statistics[manga.id]}
                                        manga={manga}
                                        key={manga.id}
                                    />
                                ))}
                            </div>
                        ) : (
                            <NotfoundData />
                        )}
                    </TabsContent>
                    <TabsContent value="stretch">
                        {mangaListRes &&
                        mangaListRes.data.length > 0 &&
                        statistics ? (
                            <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
                                {mangaListRes.data.map((manga) => (
                                    <RecentMangaStretchItem
                                        statistic={statistics[manga.id]}
                                        manga={manga}
                                        key={manga.id}
                                    />
                                ))}
                            </div>
                        ) : (
                            <NotfoundData />
                        )}
                    </TabsContent>
                    <TabsContent value="grid">
                        {mangaListRes &&
                        mangaListRes.data.length > 0 &&
                        statistics ? (
                            <div className="grid gap-2 grid-cols-2 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
                                {mangaListRes.data.map((manga) => (
                                    <RecentMangaGridItem
                                        manga={manga}
                                        key={manga.id}
                                    />
                                ))}
                            </div>
                        ) : (
                            <NotfoundData />
                        )}
                    </TabsContent>
                </div>
            </Tabs>
            <Pagination asLink className="mt-4" totalPage={maxPage} />
        </div>
    );
};
export default page;
