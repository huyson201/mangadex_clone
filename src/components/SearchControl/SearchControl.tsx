"use client";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import SearchFilter from "../SearchFilter/SearchFilter";
import { useSearchFilter } from "@/contexts/SearchFilterContext";

type Props = {};

const SearchControl = (props: Props) => {
    const searchFilters = useSearchFilter();
    return (
        <>
            <div className="flex gap-x-2">
                <div className="flex-1 relative">
                    <Search className="absolute top-2/4 -translate-y-2/4 left-2" />
                    <Input className="h-10 rounded pl-10 pr-2" />
                </div>
                <div className="hidden md:block">
                    <Button
                        className="gap-x-4 rounded py-0 "
                        variant={searchFilters?.show ? "primary" : "secondary"}
                        onClick={() => searchFilters?.toggle()}
                    >
                        {searchFilters?.show ? <ChevronUp /> : <ChevronDown />}
                        Show Filters
                    </Button>
                </div>
            </div>
            <SearchFilter
                show={searchFilters?.show}
                onClickClose={() => searchFilters?.closeFilters()}
            />
        </>
    );
};

export default SearchControl;
