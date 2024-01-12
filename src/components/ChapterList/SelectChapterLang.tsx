"use client";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import flags from "@/data/flag.json";
import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Props = {
    availableTranslatedLanguages: string[];
    onChange?: (value: string | null) => void;
    defaultTranslatedLanguage: string;
};

const SelectChapterLang = ({
    availableTranslatedLanguages,
    onChange,
    defaultTranslatedLanguage,
}: Props) => {
    const [searchLanguage, setSearchLanguage] = useState("");
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(defaultTranslatedLanguage);

    const translatedLanguages = flags.filter((el) =>
        availableTranslatedLanguages.includes(el.code)
    );
    const languagesWithSearch = translatedLanguages.filter((language) =>
        language.name
            .toLocaleLowerCase()
            .includes(searchLanguage.toLocaleLowerCase().trim())
    );
    const currentSelectValue = flags.find((value) => value.code === selected);

    return (
        <Popover open={open} onOpenChange={() => setOpen((prev) => !prev)}>
            <PopoverTrigger asChild>
                <Button
                    variant="default"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "sm:w-[140px] w-2/4 py-1.5 gap-1 h-auto justify-between border border-transparent  active:border-primary",
                        open && "bg-accent-hover"
                    )}
                >
                    <div className="text-left capitalize flex-1 whitespace-break-spaces break-all line-clamp-1">
                        {currentSelectValue && (
                            <div
                                className={cn(
                                    "cursor-pointer group flex items-center gap-2 hover:text-foreground transition-colors"
                                )}
                            >
                                <Image
                                    width={24}
                                    height={24}
                                    src={currentSelectValue.flag}
                                    alt={currentSelectValue.name}
                                    className="w-6"
                                />
                                <div className="break-all line-clamp-1">
                                    {currentSelectValue.name}
                                </div>
                            </div>
                        )}
                    </div>
                    <ChevronsUpDown className="w-5" size={20} />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className={cn(
                    "space-y-2 w-[calc(var(--radix-popover-content-available-width)_-_3rem)] sm:w-72 custom-scrollbar overflow-auto max-h-[400px] p-1.5 -translate-x-[var(--side-margin)] bg-accent"
                )}
            >
                {languagesWithSearch.map((item, index) => (
                    <SelectChapterLangItem
                        selected={item.code === selected}
                        key={item.code}
                        name={item.name}
                        flagSrc={item.flag}
                        onClick={() => {
                            setSelected(item.code);
                            onChange?.(item.code);
                            setOpen(false);
                        }}
                    />
                ))}
            </PopoverContent>
        </Popover>
    );
};

export default SelectChapterLang;

const SelectChapterLangItem = ({
    flagSrc,
    name,
    selected,
    onClick,
}: {
    flagSrc: string;
    name: string;
    selected?: boolean;
    onClick?: () => void;
}) => {
    return (
        <div
            className={cn(
                "cursor-pointer group flex items-center gap-2 hover:text-foreground transition-colors",
                selected ? "text-primary" : "text-midTone"
            )}
            onClick={onClick}
        >
            <span
                className={cn(
                    "transition-all w-2.5 h-2.5  rounded-full border",
                    selected
                        ? "border-primary bg-primary"
                        : "group-hover:border-foreground border-midTone"
                )}
            ></span>
            <Image
                width={24}
                height={24}
                src={flagSrc}
                alt={name}
                className="w-6"
            />
            <div className="break-all line-clamp-1">{name}</div>
        </div>
    );
};
