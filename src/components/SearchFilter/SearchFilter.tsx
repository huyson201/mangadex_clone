"use client";
import React, { useRef, useState } from "react";
import SearchSelection from "../ui/SearchSelection";
import MultipleSelection from "../ui/MultipleSelection";
import FilterTag from "../FilterTag/FilterTag";
import SingleSelection from "../ui/SingleSelection";
import { sortByData, contentRating, demographics, publicStatus } from "@/data";
import { useDebounce } from "@/hooks/useDebounce";
import useSWR from "swr";
import { findAuthorsOrArtist } from "@/services/mangadex";
import NumberInput from "../ui/NumberInput";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
    show?: boolean;
    onClickClose?: () => void;
};

export interface FilterData {
    order: string;
    include: string[];
    exclude: string[];
    rating: string[];
    author: string[];
    artist: string[];
    demos: string[];
    status: string[];
    year?: number;
}
const SearchFilter = ({ show, onClickClose }: Props) => {
    const [searchAuthorKey, setSearchAuthorKey] = useState("");
    const [searchArtistKey, setSearchArtistKey] = useState("");
    const [data, setData] = useState<FilterData>({
        order: "",
        artist: [],
        author: [],
        demos: [],
        exclude: [],
        include: [],
        status: [],
        rating: [],
    });

    const authorSearchRef = useRef<{ reset: () => void }>(null);
    const artistSearchRef = useRef<{ reset: () => void }>(null);
    const ratingSelectRef = useRef<{ reset: () => void }>(null);
    const statusSelectRef = useRef<{ reset: () => void }>(null);
    const demosSelectRef = useRef<{ reset: () => void }>(null);
    const sortSelectRef = useRef<{ reset: () => void }>(null);

    const debounceAuthorKey = useDebounce(searchAuthorKey, 500);
    const debounceArtistKey = useDebounce(searchArtistKey, 500);

    const { data: authorResult, isLoading: authorLoading } = useSWR(
        debounceAuthorKey !== "" ? `/author/${debounceAuthorKey}` : null,
        () => findAuthorsOrArtist(debounceAuthorKey)
    );
    const { data: artistResult, isLoading: artistLoading } = useSWR(
        debounceArtistKey !== "" ? `/author/${debounceArtistKey}` : null,
        () => findAuthorsOrArtist(debounceArtistKey)
    );

    const authorData = authorResult
        ? authorResult.data.map((author) => {
              return {
                  key: author.attributes.name,
                  value: author.id,
              };
          })
        : [];
    const artistData = artistResult
        ? artistResult.data.map((artist) => {
              return {
                  key: artist.attributes.name,
                  value: artist.id,
              };
          })
        : [];
    const handleReset = () => {
        authorSearchRef.current?.reset();
        artistSearchRef.current?.reset();
        ratingSelectRef.current?.reset();
        statusSelectRef.current?.reset();
        demosSelectRef.current?.reset();
        sortSelectRef.current?.reset();
    };
    console.log(data);
    return (
        <div
            className={cn(
                "fixed duration-500 top-0 h-screen md:h-auto custom-scrollbar overflow-auto bg-background px-4 py-4  transition-all w-full left-0 z-[20] md:py-0 md:px-0 md:overflow-hidden md:static",
                show
                    ? "translate-x-0 md:mt-6"
                    : "-translate-x-full md:translate-x-0"
            )}
        >
            <div className="flex justify-between items-center mb-2 md:hidden">
                <span className="font-semibold text-2xl">Filters</span>
                <Button
                    onClick={onClickClose}
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
                    show ? "md:max-h-[500px]" : "md:max-h-0 "
                )}
            >
                <div>
                    <div className="text-sm md:text-base mb-2 text-midTone">
                        Sort by
                    </div>
                    <SingleSelection
                        data={sortByData}
                        ref={sortSelectRef}
                        onSelect={(value) =>
                            setData((prev) => ({
                                ...prev,
                                order: value as string,
                            }))
                        }
                    />
                </div>
                <div>
                    <div className="text-sm md:text-base mb-2 text-midTone">
                        Filter Tags
                    </div>
                    <FilterTag />
                </div>
                <div>
                    <div className="text-sm md:text-base mb-2 text-midTone">
                        Content Rating
                    </div>
                    <MultipleSelection
                        ref={ratingSelectRef}
                        data={contentRating}
                        onSelect={(data) =>
                            setData((prev) => ({
                                ...prev,
                                rating: data as string[],
                            }))
                        }
                    />
                </div>
                <div>
                    <div className="text-sm md:text-base mb-2 text-midTone">
                        Magazine Demographic
                    </div>
                    <MultipleSelection
                        ref={demosSelectRef}
                        data={demographics}
                        onSelect={(data) =>
                            setData((prev) => ({
                                ...prev,
                                demos: data as string[],
                            }))
                        }
                    />
                </div>
                <div>
                    <div className="text-sm md:text-base mb-2 text-midTone">
                        Publication Status
                    </div>
                    <MultipleSelection
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
                    <div className="text-sm md:text-base mb-2 text-midTone">
                        Author
                    </div>
                    <SearchSelection
                        ref={authorSearchRef}
                        defaultSearchValue={searchAuthorKey}
                        data={authorData}
                        onSelect={(data) =>
                            setData((prev) => ({
                                ...prev,
                                author: data as string[],
                            }))
                        }
                        onSearchChange={(value) => setSearchAuthorKey(value)}
                    />
                </div>
                <div>
                    <div className="text-sm md:text-base mb-2 text-midTone">
                        Artist
                    </div>
                    <SearchSelection
                        ref={artistSearchRef}
                        onSelect={(data) =>
                            setData((prev) => ({
                                ...prev,
                                artist: data as string[],
                            }))
                        }
                        data={artistData}
                        defaultSearchValue={searchArtistKey}
                        onSearchChange={(value) => setSearchArtistKey(value)}
                    />
                </div>
                <div>
                    <div className="text-sm md:text-base mb-2 text-midTone">
                        Publication year
                    </div>
                    <NumberInput
                        onChange={(data) =>
                            setData((prev) => ({
                                ...prev,
                                year: data,
                            }))
                        }
                    />
                </div>
            </div>
            <div className="flex mt-6 justify-end items-center">
                <Button
                    onClick={handleReset}
                    className="rounded"
                    variant={"destructive"}
                >
                    Reset Filters
                </Button>
            </div>
        </div>
    );
};

export default SearchFilter;
