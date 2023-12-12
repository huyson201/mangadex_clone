"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";
import ChapterItem from "./ChapterItem";
import DetailInfo from "../DetailDesc/DetailInfo";

type Props = {};

const ChapterList = (props: Props) => {
    return (
        <div className="mt-10 lg:mt-4">
            <Tabs defaultValue="chapters">
                <TabsList className="rounded-sm">
                    <TabsTrigger
                        className="hover:text-foreground text-gray-500 font-semibold"
                        value="chapters"
                    >
                        Chapters
                    </TabsTrigger>
                    <TabsTrigger
                        className="hover:text-foreground text-gray-500 font-semibold"
                        value="comment"
                    >
                        Comment
                    </TabsTrigger>
                </TabsList>
                <div className="grid grid-cols-12 mt-4">
                    <div className="lg:col-span-4 lg:block hidden">
                        <DetailInfo className="" />
                    </div>
                    <div className="lg:col-span-8 col-span-12">
                        <TabsContent value="chapters">
                            <div>
                                <Button
                                    variant={"secondary"}
                                    className="py-1 px-4 h-auto"
                                >
                                    Descending
                                </Button>
                            </div>
                            <div className="mt-4 space-y-2">
                                <ChapterItem />
                                <ChapterItem />
                                <ChapterItem />
                                <ChapterItem />
                                <ChapterItem />
                                <ChapterItem />
                            </div>
                        </TabsContent>
                        <TabsContent value="comment" className="mt-4">
                            Change your password here.
                        </TabsContent>
                    </div>
                </div>
            </Tabs>
        </div>
    );
};

export default ChapterList;
