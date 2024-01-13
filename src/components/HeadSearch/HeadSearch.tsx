"use client";
import { ADVANCED_SEARCH_URL } from "@/constants";
import { useHeadSearch } from "@/contexts/HeadSearchContext";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { advancedSearch, getStatisticsList } from "@/services/mangadex";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import useSwr from "swr";
import Backdrop from "../Backdrop/Backdrop";
import SearchResultSkeleton from "../skeletons/SearchResultSkeleton";
import HeadSearchForm from "./HeadSearchForm";
import SearchResultItem from "./SearchResultItem";
type Props = {};

function HeadSearch({}: Props) {
    const headSearchState = useHeadSearch();
    const [searchKey, setSearchKey] = useState("");
    const t = useTranslations("search");
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        headSearchState?.setIsActive?.(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, searchParams]);

    const debounceSearchKey = useDebounce(searchKey, 500);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchKey(event.currentTarget.value);
    };

    const { data, isLoading } = useSwr(
        debounceSearchKey !== "" ? `/search?title=${debounceSearchKey}` : null,
        () =>
            advancedSearch(debounceSearchKey, {
                includes: ["cover_art"],
            })
    );

    const { data: statisticsResult, isLoading: getStatisticsLoading } = useSwr(
        data && data.data.length > 1
            ? `/statistics?title=${debounceSearchKey}`
            : null,
        () =>
            getStatisticsList(
                "manga",
                data!.data.map((manga) => manga.id)
            )
    );
    return (
        <div
            className={cn(
                "w-8 md:w-[300px] md:transition-all",
                headSearchState.isActive &&
                    "bg-background left-0 w-full h-full flex items-center justify-center md:justify-end absolute md:relative md:bg-transparent md:block md:h-auto md:w-[80%] "
            )}
        >
            <HeadSearchForm
                onChange={handleChange}
                onClickClear={() => setSearchKey("")}
            />
            <div
                className={cn(
                    "bg-background  transition-all md:translate-y-1 z-[var(--head-search-index)] w-0 hidden rounded-br-lg rounded-bl-lg md:rounded-tl-lg md:rounded-tr-lg absolute top-full right-0",
                    headSearchState.isActive && "block w-full"
                )}
            >
                <div
                    className={cn(
                        "custom-scrollbar max-h-[90vh] overflow-auto scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-thumb-accent-2 scrollbar-thin px-6 md:px-4 py-4"
                    )}
                >
                    {(!isLoading || !getStatisticsLoading) &&
                        !data &&
                        debounceSearchKey === "" && (
                            <div>{t("resultDefault")}</div>
                        )}
                    {!isLoading && data?.total === 0 && (
                        <div>{t("noResult")}</div>
                    )}
                    {isLoading ||
                        (getStatisticsLoading && (
                            <div className="space-y-4">
                                <SearchResultSkeleton />
                                <SearchResultSkeleton />
                            </div>
                        ))}
                    {!isLoading &&
                        !getStatisticsLoading &&
                        data &&
                        data.data.length > 0 && (
                            <div>
                                <div className="text-lg font-bold flex items-center justify-between">
                                    Manga
                                    <Link
                                        href={`${ADVANCED_SEARCH_URL}?q=${debounceSearchKey}`}
                                    >
                                        <ArrowRight />
                                    </Link>
                                </div>
                                <div className="mt-4 flex flex-col gap-y-2">
                                    {data.data.map((manga) => {
                                        return (
                                            <SearchResultItem
                                                key={manga.id}
                                                manga={manga}
                                                statistic={
                                                    statisticsResult
                                                        ?.statistics[manga.id]
                                                }
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                </div>
            </div>

            <Backdrop
                className="top-[var(--navbar-height)] md:top-0"
                show={headSearchState.isActive}
                onClick={() => headSearchState.setIsActive?.(false)}
            />
        </div>
    );
}

export default HeadSearch;
