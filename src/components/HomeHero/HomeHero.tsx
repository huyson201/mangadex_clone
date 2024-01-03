import React, { Suspense } from "react";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import HomeHeroContentWrapper from "./HomeHeroContentWrapper";
type Props = {};

const HomeHero = ({}: Props) => {
    const t = useTranslations("Home");

    return (
        <div className="relative">
            <Wrapper className="text-foreground text-xl sm:text-2xl font-medium absolute z-[2]  w-full left-0 top-[calc(var(--navbar-height))]">
                <h2>{t("titles.popular")}</h2>
            </Wrapper>
            <Suspense
                fallback={
                    <div className="w-full shadow-md  h-[324px] md:h-[400px] lg:h-[440px] bg-accent filter brightness-150"></div>
                }
            >
                <HomeHeroContentWrapper />
            </Suspense>
        </div>
    );
};

export default HomeHero;
