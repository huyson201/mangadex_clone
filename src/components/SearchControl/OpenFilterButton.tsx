"use client";
import React from "react";
import { Button } from "../ui/button";
import { Filter } from "lucide-react";
import { useSearchFilter } from "@/contexts/SearchFilterContext";

type Props = {};

const OpenFilterButton = (props: Props) => {
    const searchFilter = useSearchFilter();
    return (
        <div className="md:hidden block ">
            <Button
                onClick={() => searchFilter?.openFilters()}
                className="gap-x-4 text-base  rounded py-0 px-2 xs:px-4"
                variant={"secondary"}
            >
                <Filter />
                <span className="xs:inline hidden">Open filters</span>
            </Button>
        </div>
    );
};

export default OpenFilterButton;
