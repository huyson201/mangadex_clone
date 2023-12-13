import { Button } from "@/components/ui/button";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import { ArrowLeft, LayoutGrid, List, StretchHorizontal } from "lucide-react";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecentMangaGridItem from "@/components/ListMangaItems/RecentMangaGridItem";
import RecentMangaStretchItem from "@/components/ListMangaItems/RecentMangaStretchItem";
import RecentMangaListItem from "@/components/ListMangaItems/RecentMangaListItem";

type Props = {};

const page = (props: Props) => {
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
                                <RecentMangaListItem />
                                <RecentMangaListItem />
                                <RecentMangaListItem />
                                <RecentMangaListItem />
                                <RecentMangaListItem />
                                <RecentMangaListItem />
                            </div>
                        </TabsContent>
                        <TabsContent value="stretch">
                            <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
                                <RecentMangaStretchItem />
                                <RecentMangaStretchItem />
                                <RecentMangaStretchItem />
                                <RecentMangaStretchItem />
                                <RecentMangaStretchItem />
                                <RecentMangaStretchItem />
                            </div>
                        </TabsContent>
                        <TabsContent value="grid">
                            <div className="grid gap-2 grid-cols-2 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
                                <RecentMangaGridItem />
                                <RecentMangaGridItem />
                                <RecentMangaGridItem />
                                <RecentMangaGridItem />
                                <RecentMangaGridItem />
                                <RecentMangaGridItem />
                                <RecentMangaGridItem />
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </Wrapper>
    );
};

export default page;
