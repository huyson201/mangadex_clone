"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { CiSearch } from "react-icons/ci";
import { Button } from "../ui/button";
import { IoClose } from "react-icons/io5";
import { useHeadSearch } from "@/contexts/HeadSearchContext";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Search, X } from "lucide-react";
type Props = {
    onFocus?: () => void;
    onBlur?: () => void;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onClickClear?: () => void;
};

const HeadSearchForm = ({ onFocus, onBlur, onChange, onClickClear }: Props) => {
    const headSearchState = useHeadSearch();
    const t = useTranslations("search");
    const inputRef = useRef<HTMLInputElement>(null);
    const focusHandle = () => {
        onFocus?.();
        headSearchState.setIsActive?.(true);
    };

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {
                event.preventDefault();
                console.log("ctrl k");
                headSearchState.setIsActive?.(true);
            }
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, []);

    const handleClickClear = () => {
        if (!inputRef.current) return;
        inputRef.current.value = "";
        onClickClear?.();
    };

    return (
        <form
            className={cn(
                "relative  z-[var(--head-search-index)] flex items-center gap-2",
                headSearchState.isActive
                    ? "w-[calc(100%_-_var(--side-margin)_*_2)] md:w-full"
                    : "w-full"
            )}
        >
            <Input
                onFocus={focusHandle}
                onChange={onChange}
                ref={inputRef}
                className="peer/input rounded-lg px-4 py-1 w-full peer"
                backgroundFilter={!headSearchState.isActive ? "blur" : null}
                type="text"
                placeholder={t("placeholder")}
            />
            <div
                className={cn(
                    "inline-block absolute pointer-events-none  top-2/4 -translate-y-2/4   md:translate-x-0 md:right-2 ",
                    headSearchState.isActive
                        ? "right-11"
                        : "right-2/4 translate-x-2/4"
                )}
            >
                <Search size={18} />
            </div>
            <div
                className={cn(
                    "hidden  peer-[:not(:placeholder-shown)]/input:hidden items-center gap-x-1.5 absolute top-2/4 -translate-y-2/4 right-10",
                    { "md:flex": !headSearchState.isActive }
                )}
            >
                <span className="bg-accent-2 rounded text-sm px-1">Ctrl</span>
                <span className="bg-accent-2 rounded text-sm px-1">K</span>
            </div>
            <Button
                type="button"
                onClick={handleClickClear}
                className={cn(
                    "  peer-placeholder-shown/input:hidden inline-block rounded-lg w-auto h-auto px-1 py-0.5 absolute hover:bg-primary  top-2/4 -translate-y-2/4   md:translate-x-0 md:right-2 ",
                    headSearchState.isActive
                        ? "right-11"
                        : "right-2/4 translate-x-2/4"
                )}
                variant={"primary"}
            >
                <X size={18} />
            </Button>
            <Button
                type="button"
                variant={"outline"}
                className={cn(
                    "text-xl ",
                    headSearchState.isActive ? "md:hidden flex" : "hidden"
                )}
                size={"xs"}
                onClick={() => headSearchState.setIsActive?.(false)}
            >
                <IoClose />
            </Button>
        </form>
    );
};

export default HeadSearchForm;
