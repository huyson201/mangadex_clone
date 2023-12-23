"use client";
import React, { FormEvent, useCallback, useRef, useState } from "react";
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

type Props = {};

export interface FilterData {
    order: string;
    includes: string[];
    excludes: string[];
    rating: string[];
    demos: string[];
    status: string[];
    authors: string[];
    artists: string[];
    year: number;
}
const SearchFilter = ({}: Props) => {
    const searchParams = useSearchParams();
    const [data, setData] = useState<Partial<FilterData>>(() => {
        const parsed = queryString.parse(searchParams.toString(), {
            arrayFormat: "comma",
        }) as Partial<FilterData>;

        console.log(parsed);

        return {
            order: parsed.order,
            excludes: parsed.excludes,
            includes: parsed.includes,
            status: parsed.status,
            rating: parsed.rating,
            artists: parsed.artists,
            authors: parsed.authors,
            demos: parsed.demos,
            year: parsed.year,
        };
    });
    const [searchKey, setSearchKey] = useState("");

    const searchFilters = useSearchFilter();
    const router = useRouter();

    const authorSearchRef = useRef<{ reset: () => void }>(null);
    const artistSearchRef = useRef<{ reset: () => void }>(null);
    const ratingSelectRef = useRef<{ reset: () => void }>(null);
    const statusSelectRef = useRef<{ reset: () => void }>(null);
    const demosSelectRef = useRef<{ reset: () => void }>(null);
    const sortSelectRef = useRef<{ reset: () => void }>(null);
    const filterTagsRef = useRef<{ reset: () => void }>(null);

    const handleReset = () => {
        authorSearchRef.current?.reset();
        artistSearchRef.current?.reset();
        ratingSelectRef.current?.reset();
        statusSelectRef.current?.reset();
        demosSelectRef.current?.reset();
        sortSelectRef.current?.reset();
        filterTagsRef.current?.reset();
        router.push(ADVANCED_SEARCH_URL);
    };

    const handleAuthorsChange = useCallback((data: string[]) => {
        setData((prev) => ({ ...prev, authors: data }));
    }, []);
    const handleArtistsChange = useCallback((data: string[]) => {
        setData((prev) => ({ ...prev, artists: data }));
    }, []);

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
            <div
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
                        variant={"outline"}
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
                        <SingleSelection
                            data={sortByData}
                            ref={sortSelectRef}
                            defaultValue={data.order}
                            onSelect={(value) =>
                                setData((prev) => ({
                                    ...prev,
                                    order: value as string,
                                }))
                            }
                        />
                    </div>
                    <div>
                        <FilterOptionTitle title={"Filter Tags"} />
                        <FilterTag
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

                        <MultipleSelection
                            ref={ratingSelectRef}
                            data={contentRating}
                            defaultValue={data.rating}
                            onSelect={(data) =>
                                setData((prev) => ({
                                    ...prev,
                                    rating: data as string[],
                                }))
                            }
                        />
                    </div>
                    <div>
                        <FilterOptionTitle title={"Magazine Demographic"} />
                        <MultipleSelection
                            ref={demosSelectRef}
                            data={demographics}
                            defaultValue={data.demos}
                            onSelect={(data) =>
                                setData((prev) => ({
                                    ...prev,
                                    demos: data as string[],
                                }))
                            }
                        />
                    </div>
                    <div>
                        <FilterOptionTitle title={"Publication Status"} />
                        <MultipleSelection
                            defaultValue={data.status}
                            ref={statusSelectRef}
                            data={publicStatus}
                            onSelect={(data) =>
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
                            key={"author"}
                            ref={authorSearchRef}
                            onChange={handleAuthorsChange}
                        />
                    </div>
                    <div>
                        <FilterOptionTitle title={"Artist"} />
                        <AuthorOrArtistFilter
                            ref={artistSearchRef}
                            type="artist"
                            key={"artist"}
                            onChange={handleArtistsChange}
                        />
                    </div>
                    <div>
                        <FilterOptionTitle title={"Publication year"} />
                        <NumberInput
                            defaultValue={data.year}
                            onChange={(data) =>
                                setData((prev) => ({
                                    ...prev,
                                    year: data,
                                }))
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row mt-6 gap-4 justify-end items-center">
                    <Button
                        onClick={handleReset}
                        className="rounded w-full md:w-auto order-2 md:order-1"
                        variant={"destructive"}
                    >
                        Reset Filters
                    </Button>
                    <Button
                        onClick={submit}
                        type="submit"
                        className="rounded gap-4 w-full md:w-auto order-1 md:order-2"
                        variant={"primary"}
                    >
                        <Search size={20} />
                        Search
                    </Button>
                </div>
            </div>
        </>
    );
};

const FilterOptionTitle = ({ title }: { title: string }) => {
    return (
        <div className="text-sm md:text-base mb-2 text-midTone">{title}</div>
    );
};
export default SearchFilter;
