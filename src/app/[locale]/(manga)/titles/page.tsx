import BackNavigation from "@/components/BackNavigation/BackNavigation";
import OpenFilterButton from "@/components/SearchControl/OpenFilterButton";
import SearchControl from "@/components/SearchControl/SearchControl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchFilterProvider } from "@/contexts/SearchFilterContext";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import {
    ChevronDown,
    Filter,
    LayoutGrid,
    List,
    Search,
    StretchHorizontal,
} from "lucide-react";
import React from "react";

type Props = {};

const page = (props: Props) => {
    return (
        <Wrapper className="mt-4">
            <BackNavigation title="Advanced Search" />
            <div className="mt-4">
                <SearchFilterProvider>
                    <SearchControl />
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
                                    <div className="space-y-4">dasdad</div>
                                </TabsContent>
                                <TabsContent value="stretch">
                                    <div className="grid grid-cols-1 gap-y-2">
                                        dasdad
                                    </div>
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>
                </SearchFilterProvider>
            </div>
        </Wrapper>
    );
};

export default page;
