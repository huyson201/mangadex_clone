"use client";
import flags from "@/data/flag.json";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import Combobox from "../Combobox/Combobox";

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
    const translatedLanguages = flags.filter((el) =>
        availableTranslatedLanguages.includes(el.code)
    );
    const languagesWithSearch = translatedLanguages.filter((language) =>
        language.name
            .toLocaleLowerCase()
            .includes(searchLanguage.toLocaleLowerCase().trim())
    );

    return (
        <Combobox
            defaultValue={defaultTranslatedLanguage}
            onChange={onChange}
            contentWrapperClassName="-translate-x-6"
            onClose={() => setSearchLanguage("")}
        >
            <Combobox.Label>
                {(data: string | undefined) => {
                    if (!data) return null;
                    const comboboxLabelValue = translatedLanguages.find(
                        (el) => el.code === data
                    );

                    return (
                        <div
                            className={cn(
                                "cursor-pointer group flex items-center gap-2 hover:text-foreground transition-colors"
                            )}
                        >
                            <Image
                                className="w-6"
                                width={24}
                                height={24}
                                src={comboboxLabelValue!.flag}
                                alt={comboboxLabelValue!.name}
                            />
                            <div className="whitespace-pre-wrap break-all line-clamp-1">
                                {comboboxLabelValue!.name}
                            </div>
                        </div>
                    );
                }}
            </Combobox.Label>
            <Combobox.Input
                key={"searchInput"}
                defaultValue={searchLanguage}
                onChange={(value) => setSearchLanguage(value)}
            />
            {languagesWithSearch.map((lang) => {
                return (
                    <Combobox.Option asChild key={lang.code} value={lang.code}>
                        {(selected) => {
                            return (
                                <div
                                    className={cn(
                                        "cursor-pointer group flex items-center gap-2 hover:text-foreground transition-colors",
                                        selected
                                            ? "text-primary"
                                            : "text-midTone"
                                    )}
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
                                        src={lang.flag}
                                        alt={lang.name}
                                        className="w-6"
                                    />
                                    <div className="break-all line-clamp-1">
                                        {lang.name}
                                    </div>
                                </div>
                            );
                        }}
                    </Combobox.Option>
                );
            })}
        </Combobox>
    );
};

export default SelectChapterLang;
