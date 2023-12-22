"use client";
import React, { useState } from "react";
import ComboBox from "../ui/combobox";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import useSWR from "swr";
import { getTags } from "@/services/mangadex";
import { getTagName } from "@/lib/manga";
import { cn } from "@/lib/utils";
import { Tag } from "../../../types";
type Props = {};

const FilterTag = (props: Props) => {
    const [open, setOpen] = React.useState(false);
    const [searchKey, setSearchKey] = useState("");
    const { data, isLoading } = useSWR("/manga/tag", () => getTags());
    const formats = data?.data.filter(
        (tag) =>
            tag.attributes.group === "format" && includesName(tag, searchKey)
    );
    const genres = data?.data.filter(
        (tag) =>
            tag.attributes.group === "genre" && includesName(tag, searchKey)
    );
    const themes = data?.data.filter(
        (tag) =>
            tag.attributes.group === "theme" && includesName(tag, searchKey)
    );
    const contents = data?.data.filter(
        (tag) =>
            tag.attributes.group === "content" && includesName(tag, searchKey)
    );

    return (
        <ComboBox
            open={open}
            onOpenChange={() => setOpen((prev) => !prev)}
            title="Include any"
            contentClass="overflow-auto custom-scrollbar md:max-h-[260px] custom-scrollbar md:w-[500px] w-[var(--radix-popover-trigger-width)]"
        >
            <div className="p-1.5">
                <div className="relative">
                    <Search
                        size={18}
                        className="absolute top-2/4 -translate-y-2/4 left-2"
                    />
                    <Input
                        className="pl-8 text-sm placeholder-[#9ca3af] text-foreground py-2 rounded-lg bg-accent-10"
                        placeholder="Search tags"
                        variant={"default"}
                        onChange={(e) => setSearchKey(e.currentTarget.value)}
                    />
                </div>
                <Button className="flex mt-2 w-full " variant={"destructive"}>
                    Reset
                </Button>
                <div className="mt-4 space-y-4">
                    {isLoading && <div>Loading....</div>}

                    {formats && formats.length > 0 && (
                        <div>
                            <div className="text-foreground gap-x-2 text-lg flex items-center">
                                <span className="bg-accent">Format</span>
                                <hr className=" border-accent-2 w-full " />
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                {formats.map((tag) => (
                                    <FilterTagItem key={tag.id}>
                                        {getTagName(tag)}
                                    </FilterTagItem>
                                ))}
                            </div>
                        </div>
                    )}
                    {genres && genres.length > 0 && (
                        <div>
                            <div className="text-foreground gap-x-2 text-lg flex items-center">
                                <span className="bg-accent">Genre</span>
                                <hr className=" border-accent-2 w-full " />
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                {genres.map((tag) => (
                                    <FilterTagItem key={tag.id}>
                                        {getTagName(tag)}
                                    </FilterTagItem>
                                ))}
                            </div>
                        </div>
                    )}
                    {themes && themes.length > 0 && (
                        <div>
                            <div className="text-foreground gap-x-2 text-lg flex items-center">
                                <span className="bg-accent">Theme</span>
                                <hr className=" border-accent-2 w-full " />
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                {themes.map((tag) => (
                                    <FilterTagItem key={tag.id}>
                                        {getTagName(tag)}
                                    </FilterTagItem>
                                ))}
                            </div>
                        </div>
                    )}
                    {contents && contents.length > 0 && (
                        <div>
                            <div className="text-foreground gap-x-2 text-lg flex items-center">
                                <span className="bg-accent">Content</span>
                                <hr className=" border-accent-2 w-full " />
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                {contents.map((tag) => (
                                    <FilterTagItem key={tag.id}>
                                        {getTagName(tag)}
                                    </FilterTagItem>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ComboBox>
    );
};

const includesName = (tag: Tag, value: string) => {
    const tagName = getTagName(tag).toLocaleLowerCase();
    return tagName.includes(value.trim().toLocaleLowerCase());
};
const FilterTagItem = ({ children }: { children: any }) => {
    return (
        <span
            className={cn(
                "capitalize text-xs text-foreground bg-background px-2 py-1  rounded-md"
            )}
        >
            {children}
        </span>
    );
};
export default FilterTag;
