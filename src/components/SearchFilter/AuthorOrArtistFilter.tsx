import { useDebounce } from "@/hooks/useDebounce";
import { findAuthorsOrArtist } from "@/services/mangadex";
import React, { forwardRef, useState } from "react";
import useSWR from "swr";
import SearchSelection from "../ui/SearchSelection";
import Combobox from "../Combobox/Combobox";

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
            searchKey !== "" ? `/${type}/${debounceKey}` : null,
            () => findAuthorsOrArtist(debounceKey)
        );

        const { data: defaultDataResult, isLoading: defaultLoading } = useSWR(
            defaultValue.length > 0
                ? `default/${type}/${defaultValue.join()}`
                : null,
            () => findAuthorsOrArtist("", defaultValue)
        );

        const data = result
            ? result.data.map((value) => {
                  return {
                      key: value.attributes.name,
                      value: value.id,
                  };
              })
            : [];

        const defaultData = defaultDataResult
            ? defaultDataResult.data.map((value) => {
                  return {
                      key: value.attributes.name,
                      value: value.id,
                  };
              })
            : [];
        const mergeArr = [...defaultData, ...data].reduce(
            (prev: { key: string; value: string }[], value) => {
                if (!prev.some((item) => item.value === value.value)) {
                    prev.push(value);
                }
                return prev;
            },
            []
        );

        return (
            <Combobox
                multiple
                defaultValue={defaultValue}
                contentWrapperClassName="space-y-2 max-h-[256px] custom-scrollbar w-[var(--radix-popover-trigger-width)]"
                onChange={(data) => {
                    onChange?.(data || []);
                }}
            >
                <Combobox.Label>
                    {(selectedValue?: string[]) => {
                        const label =
                            mergeArr
                                .filter((item) =>
                                    selectedValue?.includes(item.value)
                                )
                                .map((item) => item.key)
                                .join(", ") || "Any";
                        return (
                            <div className="flex-1 text-left whitespace-pre-wrap line-clamp-1">
                                {label}
                            </div>
                        );
                    }}
                </Combobox.Label>
                <Combobox.Input onChange={(value) => setSearchKey(value)} />
                {mergeArr.map((item) => {
                    return (
                        <Combobox.Option key={item.key} value={item.value}>
                            {item.key}
                        </Combobox.Option>
                    );
                })}
            </Combobox>
        );
    }
);

AuthorOrArtistFilter.displayName = "AuthorOrArtistFilter";

export default AuthorOrArtistFilter;
