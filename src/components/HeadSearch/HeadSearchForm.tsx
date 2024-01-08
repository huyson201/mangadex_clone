"use client";
import { HOME_URL, MANGA_DETAIL_BASE_URL } from "@/constants";
import { useHeadSearch } from "@/contexts/HeadSearchContext";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { ChangeEvent, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
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

    const pathname = usePathname();
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {
                event.preventDefault();
                headSearchState.setIsActive?.(true);
            }
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);

        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                className={cn(
                    "peer/input  rounded-lg px-4 py-1 w-full peer",
                    !headSearchState.isActive &&
                        (pathname === HOME_URL ||
                            pathname.startsWith(`${MANGA_DETAIL_BASE_URL}/`)) &&
                        " group-[:not(.scrolling)]/navbar:opacity-[0.65] group-[:not(.scrolling)]/navbar:filter group-[:not(.scrolling)]/navbar:brightness-[1.1]"
                )}
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
                    "pointer-events-none hidden  peer-[:not(:placeholder-shown)]/input:hidden items-center gap-x-1.5 absolute top-2/4 -translate-y-2/4 right-10",
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
                    "peer-placeholder-shown/input:hidden inline-block rounded-lg w-auto h-auto px-1 py-0.5 absolute hover:bg-primary  top-2/4 -translate-y-2/4   md:translate-x-0 md:right-2 ",
                    headSearchState.isActive
                        ? "right-11"
                        : "right-2/4 translate-x-2/4 md:flex hidden"
                )}
                variant={"primary"}
            >
                <X size={18} />
            </Button>
            <Button
                type="button"
                variant={"ghost"}
                className={cn(
                    "text-xl ",
                    headSearchState.isActive ? "md:hidden flex" : "hidden"
                )}
                size={"xs"}
                onClick={() => headSearchState.setIsActive?.(false)}
            >
                <X />
            </Button>
        </form>
    );
};

export default HeadSearchForm;
