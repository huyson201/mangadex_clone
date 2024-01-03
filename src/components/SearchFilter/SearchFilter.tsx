"use client";
import React, {
    FormEvent,
    useCallback,
    useMemo,
    useEffect,
    useRef,
    useState,
} from "react";
import MultipleSelection from "../ui/MultipleSelection";
import FilterTag from "../FilterTag/FilterTag";
import SingleSelection from "../ui/SingleSelection";
import { sortByData, contentRating, demographics, publicStatus } from "@/data";
import NumberInput from "../ui/NumberInput";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import AuthorOrArtistFilter from "./AuthorOrArtistFilter";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSearchFilter } from "@/contexts/SearchFilterContext";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { ADVANCED_SEARCH_URL } from "@/constants";
import SingleFilter from "./SingleFilter";
import MultipleFilter from "./MultipleFilter";

type Props = {};
const parseArray = (value?: string | string[]) => {
    return value ? (Array.isArray(value) ? value : [value]) : [];
};

export interface FilterData {
    order: string;
    includes: string[];
    excludes: string[];
    rating: string[];
    demos: string[];
    status: string[];
    authors: string[];
    artists: string[];
    year: string;
}
const SearchFilter = ({}: Props) => {
    const searchParams = useSearchParams();
    const [data, setData] = useState<Partial<FilterData>>({});
    const [searchKey, setSearchKey] = useState("");

    const searchFilters = useSearchFilter();
    const router = useRouter();

    const filterTagsRef = useRef<{ reset: () => void }>(null);

    const defaultValue = useMemo(() => {
        console.log("parsed");
        const parsed = queryString.parse(searchParams.toString(), {
            arrayFormat: "comma",
        }) as Partial<FilterData>;

        const parsedValue = {
            order: parsed.order,
            excludes: parseArray(parsed.excludes),
            includes: parseArray(parsed.includes),
            status: parseArray(parsed.status),
            rating: parseArray(parsed.rating),
            artists: parseArray(parsed.artists),
            authors: parseArray(parsed.authors),
            demos: parseArray(parsed.demos),
            year: parsed.year,
        };
        setData({ ...parsedValue });
        return parsedValue;
    }, [searchParams]);

    const handleReset = () => {
        router.push(ADVANCED_SEARCH_URL);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        submit();
    };

    const submit = () => {
        const query = queryString.stringify(
            { q: searchKey, ...data },
            {
                arrayFormat: "comma",
                skipEmptyString: true,
                skipNull: true,
            }
        );
        router.push(`?${query}`);
    };
    const includesDefault =
        data.includes?.map((id) => ({
            id,
            state: "include" as "include" | "exclude",
        })) || [];
    const excludesDefault =
        data.excludes?.map((id) => ({
            id,
            state: "exclude" as "include" | "exclude",
        })) || [];

    return (
        <>
            <div className="flex gap-x-2">
                <form
                    onSubmit={handleSubmit}
                    action={"#"}
                    className="flex-1 relative"
                >
                    <Search className="absolute top-2/4 -translate-y-2/4 left-2" />
                    <Input
                        className="h-10 rounded pl-10 pr-2"
                        onChange={(e) => setSearchKey(e.currentTarget.value)}
                    />
                </form>
                <div className="hidden md:block">
                    <Button
                        className="gap-x-4 rounded py-0 "
                        variant={searchFilters?.show ? "primary" : "secondary"}
                        onClick={() => searchFilters?.toggle()}
                    >
                        {searchFilters?.show ? (
                            <>
                                <ChevronUp /> Hide Filters
                            </>
                        ) : (
                            <>
                                <ChevronDown />
                                Show Filters
                            </>
                        )}
                    </Button>
                </div>
            </div>
            <form
                onSubmit={handleSubmit}
                className={cn(
                    "fixed duration-500 top-0 h-screen md:h-auto custom-scrollbar overflow-auto bg-background px-4 py-4  transition-all w-full left-0 z-[20] md:py-0 md:px-0 md:overflow-hidden md:static",
                    searchFilters?.show
                        ? "translate-x-0 md:mt-6"
                        : "-translate-x-full md:translate-x-0"
                )}
            >
                <div className="flex justify-between items-center mb-2 md:hidden">
                    <span className="font-semibold text-2xl">Filters</span>
                    <Button
                        type="button"
                        onClick={() => searchFilters?.closeFilters()}
                        className="rounded-full"
                        size={"icon"}
                        variant={"ghost"}
                    >
                        <X />
                    </Button>
                </div>
                <div
                    className={cn(
                        "space-y-4 md:space-y-0 overflow-hidden md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-y-6  md:gap-x-6 transition duration-500",
                        searchFilters?.show ? "md:max-h-[500px]" : "md:max-h-0 "
                    )}
                >
                    <div>
                        <FilterOptionTitle title={"Sort by"} />
                        <SingleFilter
                            key={defaultValue.order}
                            data={sortByData}
                            defaultValue={defaultValue.order || ""}
                            onChange={(value) =>
                                setData((prev) => ({
                                    ...prev,
                                    order: value,
                                }))
                            }
                        />
                    </div>
                    <div>
                        <FilterOptionTitle title={"Filter Tags"} />
                        <FilterTag
                            defaultValue={[
                                ...includesDefault,
                                ...excludesDefault,
                            ]}
                            ref={filterTagsRef}
                            onSelect={(data) =>
                                setData((prev) => ({
                                    ...prev,
                                    includes: data.includes,
                                    excludes: data.excludes,
                                }))
                            }
                        />
                    </div>
                    <div>
                        <FilterOptionTitle title={"Content Rating"} />
                        <MultipleFilter
                            key={defaultValue.rating?.join(",")}
                            data={contentRating}
                            defaultValue={defaultValue.rating || []}
                            onChange={(data) =>
                                setData((prev) => ({
                                    ...prev,
                                    rating: data,
                                }))
                            }
                        />
                    </div>
                    <div>
                        <FilterOptionTitle title={"Magazine Demographic"} />
                        <MultipleFilter
                            key={defaultValue.demos?.join(",")}
                            data={demographics}
                            defaultValue={defaultValue.demos || []}
                            onChange={(data) =>
                                setData((prev) => ({
                                    ...prev,
                                    demos: data as string[],
                                }))
                            }
                        />
                    </div>
                    <div>
                        <FilterOptionTitle title={"Publication Status"} />
                        <MultipleFilter
                            key={defaultValue.status?.join(",")}
                            data={publicStatus}
                            defaultValue={defaultValue.status || []}
                            onChange={(data) =>
                                setData((prev) => ({
                                    ...prev,
                                    status: data as string[],
                                }))
                            }
                        />
                    </div>
                    <div>
                        <FilterOptionTitle title={"Author"} />

                        <AuthorOrArtistFilter
                            type="author"
                            key={defaultValue.authors?.join(",")}
                            defaultValue={defaultValue.authors}
                            onChange={(data) =>
                                setData((prev) => ({ ...prev, authors: data }))
                            }
                        />
                    </div>
                    <div>
                        <FilterOptionTitle title={"Artist"} />
                        <AuthorOrArtistFilter
                            defaultValue={defaultValue.artists}
                            type="artist"
                            key={defaultValue.artists?.join(",")}
                            onChange={(data) =>
                                setData((prev) => ({ ...prev, artists: data }))
                            }
                        />
                    </div>
                    <div>
                        <FilterOptionTitle title={"Publication year"} />
                        <NumberInput
                            key={defaultValue.year}
                            defaultValue={data.year}
                            onChange={(data) => {
                                setData((prev) => ({
                                    ...prev,
                                    year: data,
                                }));
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row mt-6 gap-4 justify-end items-center">
                    <Button
                        type="button"
                        onClick={handleReset}
                        className="rounded w-full md:w-auto order-2 md:order-1"
                        variant={"destructive"}
                    >
                        Reset Filters
                    </Button>
                    <Button
                        type="submit"
                        className="rounded gap-4 w-full md:w-auto order-1 md:order-2"
                        variant={"primary"}
                    >
                        <Search size={20} />
                        Search
                    </Button>
                </div>
            </form>
        </>
    );
};

const FilterOptionTitle = ({ title }: { title: string }) => {
    return (
        <div className="text-sm md:text-base mb-2 text-midTone">{title}</div>
    );
};
export default SearchFilter;
