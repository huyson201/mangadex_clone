import LatestMangaListitem from "@/components/ListMangaItems/LatestMangaListItem";
import LatestMangaStretchItem from "@/components/ListMangaItems/LatestMangaStretchItem";
import Pagination from "@/components/Pagination/Pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getLatestUpdateList } from "@/services/mangadex";
import { Chapter, Manga } from "@/types";
import { List, StretchHorizontal } from "lucide-react";

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
        <>
            <div className="mt-10">
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
            <Pagination asLink className="mt-4" totalPage={maxPage} />
        </>
    );
}

export default page;
