"use client";
import React from "react";
interface SearchFilterState {
    show?: boolean;
    closeFilters: () => void;
    openFilters: () => void;
    toggle: () => void;
}
const SearchFilterContext = React.createContext<SearchFilterState | null>(null);
export const useSearchFilter = () => React.useContext(SearchFilterContext);
export const SearchFilterProvider = ({
    children,
}: {
    children?: React.ReactNode;
}) => {
    const [showFilters, setShowFilters] = React.useState(false);
    const closeFilters = () => setShowFilters(false);
    const openFilters = () => setShowFilters(true);
    const toggle = () => setShowFilters((prev) => !prev);
    return (
        <SearchFilterContext.Provider
            value={{ show: showFilters, closeFilters, openFilters, toggle }}
        >
            {children}
        </SearchFilterContext.Provider>
    );
};
