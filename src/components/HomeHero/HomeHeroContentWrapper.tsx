import React from "react";
import HomeHeroContent from "./HomeHeroContent";
import { getPopularManga } from "@/services/mangadex";

type Props = {};

const HomeHeroContentWrapper = async (props: Props) => {
    const popularMangaResult = await getPopularManga([
        "cover_art",
        "author",
        "artist",
    ]);
    return <HomeHeroContent data={popularMangaResult.data} />;
};

export default HomeHeroContentWrapper;
