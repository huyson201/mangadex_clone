"use client";
import React, {
    ChangeEvent,
    useState,
    forwardRef,
    useImperativeHandle,
} from "react";
import ComboBox from "./combobox";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { Input } from "./input";

type Props = {
    title?: string;
    data: SingleSelectionData[];
    onSearchChange?: (value: string) => void;
    onSelect?: (value: any[]) => void;
    defaultSearchValue?: string;
    defaultSelected?: string[];
};

interface SingleSelectionData {
    key: string;
    value: any;
}

const SearchSelection = forwardRef<{ reset: () => void }, Props>(
    (
        {
            data,
            onSearchChange,
            onSelect,
            defaultSearchValue = "",
            defaultSelected = [],
        },
        ref
    ) => {
        const [currentKey, setCurrentKey] = useState<string[]>(defaultSelected);
        const [open, setOpen] = React.useState(false);

        const title = currentKey.length > 0 ? currentKey.join(", ") : "Any";

        useImperativeHandle(
            ref,
            () => {
                return {
                    reset() {
                        setCurrentKey([]);
                        onSelect?.([]);
                    },
                };
            },
            []
        );

        // remove duplicate data
        data = data.reduce((prev: SingleSelectionData[], value) => {
            const isExist = prev.some((el) => compareKey(el.key, value.key));
            if (!isExist) prev.push(value);
            return prev;
        }, []);

        const handleOpenChange = () => {
            setOpen((prev) => !prev);
        };

        const handleSelectData = (key: string) => {
            const cloneValue = [...currentKey];
            const idex = cloneValue.findIndex((value) => value === key);
            if (idex !== -1) {
                cloneValue.splice(idex, 1);
            } else {
                cloneValue.push(key);
            }
            setCurrentKey([...cloneValue]);
            onSelect?.(
                data.reduce((prev: string[], el) => {
                    if (cloneValue.includes(el.key)) {
                        prev.push(el.value);
                    }
                    return prev;
                }, [])
            );
        };
        const handleOnchange = (event: ChangeEvent<HTMLInputElement>) => {
            onSearchChange?.(event.target.value);
        };

        const handleClickRemove = (key: string) => {
            const index = currentKey.findIndex((value) =>
                compareKey(key, value)
            );
            if (index !== -1) {
                const cloneData = [...currentKey];
                cloneData.splice(index, 1);
                setCurrentKey([...cloneData]);
                onSelect?.(
                    data.reduce((prev: string[], el) => {
                        if (cloneData.includes(el.key)) {
                            prev.push(el.value);
                        }
                        return prev;
                    }, [])
                );
            }
        };

        return (
            <ComboBox
                open={open}
                title={title}
                onOpenChange={handleOpenChange}
                contentClass="max-h-[256px] overflow-auto custom-scrollbar w-[var(--radix-popover-trigger-width)]"
            >
                <div className="">
                    <div className="flex-1 relative mb-2">
                        <Search
                            size={18}
                            className="absolute top-2/4 -translate-y-2/4 left-2"
                        />
                        <Input
                            defaultValue={defaultSearchValue}
                            onChange={handleOnchange}
                            className="h-8 text-sm bg-accent-10 rounded pl-8 pr-2 placeholder-[#9ca3af]"
                            placeholder="Search"
                        />
                    </div>
                    {currentKey.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pb-1.5 border-b border-accent-10">
                            {currentKey.map((key) => {
                                return (
                                    <span
                                        onClick={() => handleClickRemove(key)}
                                        key={key}
                                        className={cn(
                                            "flex items-center gap-1 capitalize text-xs text-foreground bg-accent-10 px-1.5 cursor-pointer   rounded-md"
                                        )}
                                    >
                                        <X size={12} />
                                        {key}
                                    </span>
                                );
                            })}
                        </div>
                    )}
                    <div className="pl-2 space-y-2">
                        {data.map((el) => {
                            const isActive = currentKey.some((key) =>
                                compareKey(key, el.key)
                            );
                            return (
                                <SearchSelectionItem
                                    onSelect={(key, value) =>
                                        handleSelectData(key)
                                    }
                                    key={el.key}
                                    keyValue={el.key}
                                    value={el.value}
                                    active={isActive}
                                />
                            );
                        })}
                    </div>
                </div>
            </ComboBox>
        );
    }
);
SearchSelection.displayName = "SearchSelection";

// ({
//     data,
//     onSearchChange,
//     onSelect,
//     defaultSearchValue = "",
// }: Props) => {
//     const [currentKey, setCurrentKey] = useState<string[]>([]);
//     const [open, setOpen] = React.useState(false);

//     const title = currentKey.length > 0 ? currentKey.join(", ") : "Any";

//     // remove duplicate data
//     data = data.reduce((prev: SingleSelectionData[], value) => {
//         const isExist = prev.some((el) => compareKey(el.key, value.key));
//         if (!isExist) prev.push(value);
//         return prev;
//     }, []);

//     const handleOpenChange = () => {
//         setOpen((prev) => !prev);
//     };

//     const handleSelectData = (key: string) => {
//         const cloneValue = [...currentKey];
//         const idex = cloneValue.findIndex((value) => value === key);
//         if (idex !== -1) {
//             cloneValue.splice(idex, 1);
//         } else {
//             cloneValue.push(key);
//         }
//         setCurrentKey([...cloneValue]);
//         onSelect?.(
//             data.reduce((prev: string[], el) => {
//                 if (cloneValue.includes(el.key)) {
//                     prev.push(el.value);
//                 }
//                 return prev;
//             }, [])
//         );
//     };
//     const handleOnchange = (event: ChangeEvent<HTMLInputElement>) => {
//         onSearchChange?.(event.target.value);
//     };

//     const handleClickRemove = (key: string) => {
//         const index = currentKey.findIndex((value) => compareKey(key, value));
//         if (index !== -1) {
//             const cloneData = [...currentKey];
//             cloneData.splice(index, 1);
//             setCurrentKey([...cloneData]);
//             onSelect?.(
//                 data.reduce((prev: string[], el) => {
//                     if (cloneData.includes(el.key)) {
//                         prev.push(el.value);
//                     }
//                     return prev;
//                 }, [])
//             );
//         }
//     };

//     return (
//         <ComboBox
//             open={open}
//             title={title}
//             onOpenChange={handleOpenChange}
//             contentClass="max-h-[256px] overflow-auto custom-scrollbar w-[var(--radix-popover-trigger-width)]"
//         >
//             <div className="">
//                 <div className="flex-1 relative mb-2">
//                     <Search
//                         size={18}
//                         className="absolute top-2/4 -translate-y-2/4 left-2"
//                     />
//                     <Input
//                         defaultValue={defaultSearchValue}
//                         onChange={handleOnchange}
//                         className="h-8 text-sm bg-accent-10 rounded pl-8 pr-2 placeholder-[#9ca3af]"
//                         placeholder="Search"
//                     />
//                 </div>
//                 {currentKey.length > 0 && (
//                     <div className="flex flex-wrap gap-1.5 pb-1.5 border-b border-accent-10">
//                         {currentKey.map((key) => {
//                             return (
//                                 <span
//                                     onClick={() => handleClickRemove(key)}
//                                     key={key}
//                                     className={cn(
//                                         "flex items-center gap-1 capitalize text-xs text-foreground bg-accent-10 px-1.5 cursor-pointer   rounded-md"
//                                     )}
//                                 >
//                                     <X size={12} />
//                                     {key}
//                                 </span>
//                             );
//                         })}
//                     </div>
//                 )}
//                 <div className="pl-2 space-y-2">
//                     {data.map((el) => {
//                         const isActive = currentKey.some((key) =>
//                             compareKey(key, el.key)
//                         );
//                         return (
//                             <SearchSelectionItem
//                                 onSelect={(key, value) => handleSelectData(key)}
//                                 key={el.key}
//                                 keyValue={el.key}
//                                 value={el.value}
//                                 active={isActive}
//                             />
//                         );
//                     })}
//                 </div>
//             </div>
//         </ComboBox>
//     );
// };
const compareKey = (key1: string, key2: string) => {
    return key1.trim().toLowerCase() === key2.trim().toLowerCase();
};
const SearchSelectionItem = ({
    keyValue,
    value,
    active,
    onSelect,
}: {
    keyValue: string;
    value: any;
    active?: boolean;
    onSelect?: (key: string, value: any) => void;
}) => {
    const handleSelect = () => {
        onSelect?.(keyValue, value);
    };
    return (
        <div
            onClick={handleSelect}
            className={cn(
                "cursor-pointer group flex items-center gap-2 hover:text-foreground transition-colors",
                active ? "text-primary" : "text-midTone"
            )}
        >
            <span
                className={cn(
                    "transition-all w-2.5 h-2.5  rounded-full border",
                    active
                        ? "border-primary bg-primary"
                        : "group-hover:border-foreground border-midTone"
                )}
            ></span>
            {keyValue}
        </div>
    );
};

export default SearchSelection;
