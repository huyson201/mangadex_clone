import { ArrowLeft, List, StretchHorizontal } from "lucide-react";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import { Button } from "@/components/ui/button";
import LatestMangaStretchItem from "@/components/ListMangaItems/LatestMangaStretchItem";
import LatestMangaListitem from "@/components/ListMangaItems/LatestMangaListItem";
import Pagination from "@/components/Pagination/Pagination";
import BackNavigation from "@/components/BackNavigation/BackNavigation";
import { getLatestUpdateList } from "@/services/mangadex";
import { Chapter, Manga } from "../../../../../../types";

type Props = {
    searchParams: {
        page: number;
    };
};

async function page({ searchParams: { page = 1 } }: Props) {
    const maxPage = 312;
    const limit = 32;
    const offset = (page - 1) * limit;

    const latestChapters = await getLatestUpdateList(offset, limit, [
        "manga",
        "scanlation_group",
        "user",
    ]);
    const groupData = latestChapters.data.reduce(
        (prevValue: { manga: Manga; chapters: Chapter[] }[], chapter) => {
            const manga = chapter.relationships.find(
                (relation) => relation.type === "manga"
            );
            const savedManga = prevValue.find(
                (value) => value.manga.id === manga?.id
            );
            if (savedManga) {
                savedManga.chapters.push(chapter);
            } else {
                prevValue.push({
                    manga: manga as Manga,
                    chapters: [chapter],
                });
            }
            return prevValue;
        },
        []
    );

    return (
        <Wrapper className="mt-4">
            <BackNavigation title="Latest Updates" />
            <div className="mt-4">
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
                            <div className="space-y-4">
                                {groupData.map((value) => (
                                    <LatestMangaListitem
                                        key={value.manga.id}
                                        manga={value.manga}
                                        chapters={value.chapters}
                                    />
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="stretch">
                            <div className="grid grid-cols-1 gap-y-2">
                                {groupData.map((value) => (
                                    <LatestMangaStretchItem
                                        key={value.manga.id}
                                        manga={value.manga}
                                        chapters={value.chapters}
                                    />
                                ))}
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
            <Pagination className="mt-4" totalPage={maxPage} />
        </Wrapper>
    );
}

export default page;
