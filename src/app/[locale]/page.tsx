import HomeHero from "@/components/HomeHero/HomeHero";
import { buttonVariants } from "@/components/ui/button";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

import LatestUpdateList from "@/components/LatestUpdateList/LatestUpdateList";
import HorizontalList from "@/components/HorizontalList/HorizontalList";
import { getTranslations } from "next-intl/server";
import {
    getPopularManga,
    getRecentlyAddedMangaList,
    getSeasonalMangaList,
} from "@/services/mangadex";
import { LATEST_LIST_URL, RECENTLY_LIST_URL } from "@/constants";

export default async function Home() {
    const [t, popularMangaResult, recentlyAddedList, seasonalResult] =
        await Promise.all([
            getTranslations("Home"),
            getPopularManga(["cover_art", "author", "artist"]),
            getRecentlyAddedMangaList(14, 0, ["cover_art"]),
            getSeasonalMangaList(14, 0, ["cover_art"]),
        ]);

    return (
        <main>
            <HomeHero mangaList={popularMangaResult.data} />
            <section className="pt-6">
                <Wrapper>
                    <h2 className="text-xl sm:text-2xl font-semibold flex items-center justify-between">
                        <span>{t("titles.latestList")}</span>
                        <Link
                            href={LATEST_LIST_URL}
                            className={cn(
                                buttonVariants({
                                    variant: "ghost",
                                    size: "icon",
                                }),
                                "rounded-full text-xl"
                            )}
                        >
                            <FaArrowRight />
                        </Link>
                    </h2>
                    <LatestUpdateList />
                </Wrapper>
            </section>
            <section className="pt-6">
                <Wrapper>
                    <h2 className="text-xl sm:text-2xl font-semibold flex items-center justify-between">
                        <span>{t("titles.seasonalList")}</span>
                    </h2>
                </Wrapper>
                <div className="mt-4">
                    <HorizontalList
                        mangaList={seasonalResult.data}
                        imageClassName="h-[179px] sm:h-[267px]"
                    />
                </div>
            </section>

            <section className="pt-6 pb-6">
                <Wrapper>
                    <h2 className="text-xl sm:text-2xl font-semibold flex items-center justify-between">
                        <span>{t("titles.recentlyList")}</span>
                        <Link
                            href={RECENTLY_LIST_URL}
                            className={cn(
                                buttonVariants({
                                    variant: "ghost",
                                    size: "icon",
                                }),
                                "rounded-full text-xl"
                            )}
                        >
                            <FaArrowRight />
                        </Link>
                    </h2>
                </Wrapper>
                <div className="mt-4">
                    <HorizontalList
                        mangaList={recentlyAddedList.data}
                        slideClassName="sm:w-32 "
                        imageClassName="h-[179px]"
                    />
                </div>
            </section>
        </main>
    );
}
