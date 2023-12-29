"use client";
import React, {
    useMemo,
    useState,
    useImperativeHandle,
    forwardRef,
} from "react";
import ComboBox from "../ui/combobox";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import useSWR from "swr";
import { getTags } from "@/services/mangadex";
import { getTagName } from "@/lib/manga";
import { cn } from "@/lib/utils";
import { Tag } from "../../../types";
type Props = {
    onSelect?: (data: { includes: string[]; excludes: string[] }) => void;
    defaultValue?: { id: string; state: "include" | "exclude" }[];
};

const FilterTag = forwardRef<{ reset: () => void }, Props>(
    ({ onSelect, defaultValue = [] }, ref) => {
        const [open, setOpen] = React.useState(false);
        const [searchKey, setSearchKey] = useState("");
        const [selectedData, setSelectedData] =
            useState<{ id: string; state: "include" | "exclude" }[]>(
                defaultValue
            );

        const { data, isLoading } = useSWR("/manga/tag", () => getTags());

        const formats = data?.data.filter(
            (tag) =>
                tag.attributes.group === "format" &&
                includesName(tag, searchKey)
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
                tag.attributes.group === "content" &&
                includesName(tag, searchKey)
        );

        useImperativeHandle(
            ref,
            () => {
                return {
                    reset() {
                        setSelectedData([]);
                        onSelect?.({ includes: [], excludes: [] });
                    },
                };
            },
            // eslint-disable-next-line react-hooks/exhaustive-deps
            []
        );

        const renderData = (title: string, tags?: Tag[]) => {
            return (
                tags &&
                tags.length > 0 && (
                    <div>
                        <div className="text-foreground gap-x-2 text-lg flex items-center">
                            <span className="bg-accent">{title}</span>
                            <hr className=" border-accent-2 w-full " />
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            {tags.map((tag) => {
                                const selectedTag = selectedData.find(
                                    (value) => value.id === tag.id
                                );
                                const variant = !selectedTag
                                    ? "default"
                                    : selectedTag.state === "include"
                                    ? "success"
                                    : "danger";
                                return (
                                    <FilterTagItem
                                        variant={variant}
                                        key={tag.id}
                                        onClick={() => handleClickTag(tag)}
                                    >
                                        {getTagName(tag)}
                                    </FilterTagItem>
                                );
                            })}
                        </div>
                    </div>
                )
            );
        };
        const handleClickTag = (tag: Tag) => {
            const cloneData = [...selectedData];
            const findIndex = cloneData.findIndex(
                (value) => value.id === tag.id
            );
            if (findIndex === -1) {
                cloneData.push({ id: tag.id, state: "include" });
                setSelectedData(cloneData);
                onSelect?.(statisticData(cloneData));
                return;
            }
            const currentTargetData = cloneData[findIndex];
            if (currentTargetData.state === "include") {
                currentTargetData.state = "exclude";
                setSelectedData(cloneData);
                onSelect?.(statisticData(cloneData));

                return;
            }

            cloneData.splice(findIndex, 1);
            setSelectedData(cloneData);
            onSelect?.(statisticData(cloneData));
        };

        const statisticData = (
            data: { id: string; state: "include" | "exclude" }[]
        ) => {
            const includes = data
                .filter((value) => value.state === "include")
                .map((value) => value.id);
            const excludes = data
                .filter((value) => value.state === "exclude")
                .map((value) => value.id);
            return { includes, excludes };
        };

        const title = useMemo(() => {
            const statisticsData = statisticData(selectedData);

            if (
                statisticsData.includes.length === 0 &&
                statisticsData.excludes.length === 0
            ) {
                return "Includes any";
            }

            if (!data) return "Includes any";

            const includesTitle = data.data
                .reduce((prev: string[], tag) => {
                    if (
                        statisticsData.includes.some(
                            (value) => value === tag.id
                        )
                    ) {
                        prev.push(getTagName(tag));
                    }
                    return prev;
                }, [])
                .join(" & ");

            const excludesTitle = data.data
                .reduce((prev: string[], tag) => {
                    if (
                        statisticsData.excludes.some(
                            (value) => value === tag.id
                        )
                    ) {
                        prev.push(getTagName(tag));
                    }
                    return prev;
                }, [])
                .join(" & ");

            const existIncludes = statisticsData.includes.length > 0;
            const existExcludes = statisticsData.excludes.length > 0;

            return `${existIncludes ? `Includes ${includesTitle}` : ""}${
                existIncludes && existExcludes ? " And " : " "
            }${existExcludes ? `Excludes ${excludesTitle}` : ""}`;
        }, [selectedData, data]);

        return (
            <ComboBox
                open={open}
                onOpenChange={() => setOpen((prev) => !prev)}
                title={title}
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
                            onChange={(e) =>
                                setSearchKey(e.currentTarget.value)
                            }
                        />
                    </div>
                    <Button
                        className="flex mt-2 w-full "
                        variant={"destructive"}
                        onClick={() => setSelectedData([])}
                    >
                        Reset
                    </Button>
                    <div className="mt-4 space-y-4">
                        {isLoading && <div>Loading....</div>}

                        {renderData("Format", formats)}
                        {renderData("Genre", genres)}
                        {renderData("Theme", themes)}
                        {renderData("Content", contents)}
                    </div>
                </div>
            </ComboBox>
        );
    }
);

FilterTag.displayName = "FilterTag";

const includesName = (tag: Tag, value: string) => {
    const tagName = getTagName(tag).toLocaleLowerCase();
    return tagName.includes(value.trim().toLocaleLowerCase());
};
const FilterTagItem = ({
    children,
    onClick,
    variant,
}: {
    children: any;
    onClick?: () => void;
    variant?: "success" | "danger" | "default";
}) => {
    return (
        <span
            onClick={onClick}
            className={cn(
                " border cursor-pointer capitalize text-xs   px-2 py-1  rounded-md",
                variant === "success" &&
                    "bg-status-green/[0.05]  border-status-green text-status-green",
                variant === "danger" &&
                    "bg-status-red/[0.05] border-dashed  border-status-red text-status-red",
                (!variant || variant == "default") &&
                    "bg-background text-foreground"
            )}
        >
            {children}
        </span>
    );
};
export default FilterTag;
