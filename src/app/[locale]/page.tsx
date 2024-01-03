import HomeHero from "@/components/HomeHero/HomeHero";
import { buttonVariants } from "@/components/ui/button";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

import LatestUpdateList from "@/components/LatestUpdateList/LatestUpdateList";
import HorizontalList from "@/components/HorizontalList/HorizontalList";
import { getTranslations } from "next-intl/server";
import { getPopularManga } from "@/services/mangadex";
import { LATEST_LIST_URL, RECENTLY_LIST_URL } from "@/constants";
import { Suspense } from "react";
import LatestUpdateListSkeleton from "@/components/skeletons/LatestUpdateListSkeleton";
import HomeRecentlyList from "@/components/HomeRecentlyList/HomeRecentlyList";
import RingLoader from "@/components/Loader/RingLoader";
import HomeSeasonalList from "@/components/HomeSeasonalList/HomeSeasonalList";

export default async function Home() {
    const [t] = await Promise.all([getTranslations("Home")]);

    return (
        <main>
            <HomeHero />
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
                    <Suspense fallback={<LatestUpdateListSkeleton />}>
                        <LatestUpdateList />
                    </Suspense>
                </Wrapper>
            </section>
            <section className="pt-6">
                <Wrapper>
                    <h2 className="text-xl sm:text-2xl font-semibold flex items-center justify-between">
                        <span>{t("titles.seasonalList")}</span>
                    </h2>
                </Wrapper>
                <Suspense
                    fallback={
                        <div className="h-[220px] w-full flex items-center justify-center">
                            <RingLoader />
                        </div>
                    }
                >
                    <HomeSeasonalList />
                </Suspense>
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

                <Suspense
                    fallback={
                        <div className="h-[220px] w-full flex items-center justify-center">
                            <RingLoader />
                        </div>
                    }
                >
                    <HomeRecentlyList />
                </Suspense>
            </section>
        </main>
    );
}
