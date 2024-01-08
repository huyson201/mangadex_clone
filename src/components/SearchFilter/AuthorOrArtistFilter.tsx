import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { findAuthorsOrArtist } from "@/services/mangadex";
import { ChevronsUpDown, Search, X } from "lucide-react";
import { forwardRef, useMemo, useState } from "react";
import useSWR from "swr";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { DefaultItem } from "./FilterCombobox";

type Props = {
    type: "author" | "artist";
    onChange?: (data: string[]) => void;
    defaultValue?: string[];
};

const AuthorOrArtistFilter = forwardRef<{ reset: () => void }, Props>(
    ({ type, onChange, defaultValue = [] }, ref) => {
        const [searchKey, setSearchKey] = useState("");
        const [open, setOpen] = useState(false);
        const [selected, setSelected] = useState<string[]>(() => {
            return defaultValue ?? [];
        });
        const debounceKey = useDebounce(searchKey, 500);

        const { data: result, isLoading: authorLoading } = useSWR(
            searchKey !== "" ? [type, searchKey] : null,
            () => findAuthorsOrArtist(debounceKey)
        );

        const { data: defaultDataResult, isLoading: defaultLoading } = useSWR(
            defaultValue.length > 0 ? [`default/${type}`, defaultValue] : null,
            () => findAuthorsOrArtist("", defaultValue)
        );

        const items = result?.data.map((dataObj) => {
            const isActive = selected.indexOf(dataObj.id) > -1;
            return (
                <DefaultItem
                    key={dataObj.id}
                    active={isActive}
                    onClick={() => handleSelect(dataObj.id)}
                >
                    {dataObj.attributes.name}
                </DefaultItem>
            );
        });

        const handleSelect = (key: string) => {
            const newSelected = [...selected];
            const index = newSelected.indexOf(key);
            console.log(newSelected);
            console.log(key);
            if (index === -1) {
                newSelected.push(key);
            } else {
                newSelected.splice(index, 1);
            }

            setSelected(newSelected);
            const data =
                result?.data
                    .filter((item) => newSelected.indexOf(item.id) > -1)
                    .map((item) => item.id) || [];
            const defaultDataSelect =
                defaultDataResult?.data
                    .filter((item) => newSelected.indexOf(item.id) > -1)
                    .map((item) => item.id) || [];

            onChange?.([...defaultDataSelect, ...data]);
        };

        const defaultSelectedData = useMemo(() => {
            return (
                defaultDataResult?.data.filter((item) =>
                    selected.includes(item.id)
                ) || []
            );
        }, [defaultDataResult, selected]);

        const selectedData = useMemo(() => {
            return (
                result?.data.filter((item) => selected.includes(item.id)) || []
            );
        }, [result, selected]);

        const title = useMemo(() => {
            let title = "Any";
            if (selectedData.length > 0 || defaultSelectedData.length > 0) {
                title = [...defaultSelectedData, ...selectedData]
                    .map((value) => value.attributes.name)
                    .join(", ");
            }
            return title;
        }, [selectedData, defaultSelectedData]);
        return (
            <Popover open={open} onOpenChange={() => setOpen((prev) => !prev)}>
                <div>
                    <PopoverTrigger asChild>
                        <Button
                            variant="default"
                            role="combobox"
                            aria-expanded={open}
                            className={cn(
                                " w-full py-1.5 gap-1 h-auto justify-between border border-transparent  active:border-primary",
                                open && "bg-accent-hover"
                            )}
                        >
                            <div className="flex-1 text-left whitespace-break-spaces break-all line-clamp-1">
                                {title}
                            </div>
                            <ChevronsUpDown size={20} />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className={cn(
                            "space-y-2 max-h-[256px] custom-scrollbar p-1.5 w-[var(--radix-popover-trigger-width)] overflow-auto bg-accent"
                        )}
                    >
                        <div>
                            <div className="flex-1 relative mb-2">
                                <Search
                                    size={18}
                                    className="absolute top-2/4 -translate-y-2/4 left-2"
                                />
                                <Input
                                    onChange={(e) =>
                                        setSearchKey(e.currentTarget.value)
                                    }
                                    className="h-8 text-sm bg-accent-10 rounded pl-8 pr-2 placeholder-[#9ca3af]"
                                    placeholder="Search"
                                />
                            </div>
                            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
                                {defaultSelectedData.map((item) => {
                                    return (
                                        <SelectedTag
                                            key={item.id}
                                            title={item.attributes.name}
                                            onClick={() =>
                                                handleSelect(item.id)
                                            }
                                        />
                                    );
                                })}
                            </div>
                        </div>
                        {items}
                    </PopoverContent>
                </div>
            </Popover>
        );
    }
);

AuthorOrArtistFilter.displayName = "AuthorOrArtistFilter";

export default AuthorOrArtistFilter;
export const SelectedTag = ({
    title,
    onClick,
}: {
    onClick?: () => void;
    title: string;
}) => {
    return (
        <span
            onClick={onClick}
            className="px-1.5 cursor-pointer rounded-lg inline-flex items-center gap-1.5 text-xs bg-accent-10 text-foreground"
        >
            <X size={14} />
            {title}
        </span>
    );
};
