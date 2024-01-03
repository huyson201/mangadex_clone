import React from "react";
import HorizontalList from "../HorizontalList/HorizontalList";
import { getSeasonalMangaList } from "@/services/mangadex";

type Props = {};

const HomeSeasonalList = async (props: Props) => {
    const seasonalResult = await getSeasonalMangaList(14, 0, ["cover_art"]);
    return (
        <div className="mt-4">
            <HorizontalList
                mangaList={seasonalResult.data}
                imageClassName="h-[179px] sm:h-[267px]"
            />
        </div>
    );
};

export default HomeSeasonalList;
