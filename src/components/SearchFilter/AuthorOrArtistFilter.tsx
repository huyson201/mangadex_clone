import { useDebounce } from "@/hooks/useDebounce";
import { findAuthorsOrArtist } from "@/services/mangadex";
import React, { forwardRef, useState } from "react";
import useSWR from "swr";
import SearchSelection from "../ui/SearchSelection";

type Props = {
    type: "author" | "artist";
    onChange?: (data: string[]) => void;
    defaultValue?: string[];
};

const AuthorOrArtistFilter = forwardRef<{ reset: () => void }, Props>(
    ({ type, onChange, defaultValue = [] }, ref) => {
        const [searchKey, setSearchKey] = useState("");
        const debounceKey = useDebounce(searchKey, 500);
        const { data: result, isLoading: authorLoading } = useSWR(
            `/${type}/${debounceKey}`,
            () => findAuthorsOrArtist(debounceKey)
        );
        const data = result
            ? result.data.map((value) => {
                  return {
                      key: value.attributes.name,
                      value: value.id,
                  };
              })
            : [];

        const handleSelectedData = (data: string[]) => {
            onChange?.(data);
        };
        const defaultKey = data
            .filter((el) => defaultValue.includes(el.value))
            .map((el) => el.key);
        return (
            <SearchSelection
                ref={ref}
                defaultSelected={defaultKey}
                defaultSearchValue={searchKey}
                data={debounceKey !== "" ? data : []}
                onSelect={handleSelectedData}
                onSearchChange={(value) => setSearchKey(value)}
            />
        );
    }
);

AuthorOrArtistFilter.displayName = "AuthorOrArtistFilter";

export default AuthorOrArtistFilter;
