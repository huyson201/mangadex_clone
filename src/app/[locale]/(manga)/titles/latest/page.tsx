import { ArrowLeft, List, StretchHorizontal } from "lucide-react";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import { Button } from "@/components/ui/button";
import LatestMangaStretchItem from "@/components/ListMangaItems/LatestMangaStretchItem";
import LatestMangaListitem from "@/components/ListMangaItems/LatestMangaListItem";
import Pagination from "@/components/Pagination/Pagination";

type Props = {};

function page({}: Props) {
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
                                <LatestMangaListitem />
                                <LatestMangaListitem />
                                <LatestMangaListitem />
                                <LatestMangaListitem />
                            </div>
                        </TabsContent>
                        <TabsContent value="stretch">
                            <div className="grid grid-cols-1 gap-y-2">
                                <LatestMangaStretchItem />
                                <LatestMangaStretchItem />
                                <LatestMangaStretchItem />
                                <LatestMangaStretchItem />
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
            <Pagination className="mt-4" totalPage={112} />
        </Wrapper>
    );
}

export default page;
