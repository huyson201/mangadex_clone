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

export default async function Home() {
    const [t, popularMangaResult, recentlyAddedList, seasonalResult] =
        await Promise.all([
            getTranslations("Home"),
            getPopularManga(),
            getRecentlyAddedMangaList(14, 0, ["cover_art"]),
            getSeasonalMangaList(14, 0, ["cover_art"]),
        ]);

    return (
        <main>
            <HomeHero mangaList={popularMangaResult.result!.data} />
            <section className="pt-6">
                <Wrapper>
                    <h2 className="text-xl sm:text-2xl font-semibold flex items-center justify-between">
                        <span>{t("titles.latestList")}</span>
                        <Link
                            href={"/titles/latest"}
                            className={cn(
                                buttonVariants({
                                    variant: "outline",
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
                        <Link
                            href={"/titles"}
                            className={cn(
                                buttonVariants({
                                    variant: "outline",
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
                        mangaList={seasonalResult.result.data}
                        imageClassName="h-[179px] sm:h-[267px]"
                    />
                </div>
            </section>

            <section className="pt-6 pb-6">
                <Wrapper>
                    <h2 className="text-xl sm:text-2xl font-semibold flex items-center justify-between">
                        <span>{t("titles.recentlyList")}</span>
                        <Link
                            href={"/titles/recent"}
                            className={cn(
                                buttonVariants({
                                    variant: "outline",
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
                        mangaList={recentlyAddedList.result.data}
                        slideClassName="sm:w-32 "
                        imageClassName="h-[179px]"
                    />
                </div>
            </section>
        </main>
    );
}
