import { getRecentlyAddedMangaList } from "@/services/mangadex";
import React from "react";
import HorizontalList from "../HorizontalList/HorizontalList";

type Props = {};

const HomeRecentlyList = async (props: Props) => {
    const recentlyAddedList = await getRecentlyAddedMangaList(14, 0, [
        "cover_art",
    ]);
    return (
        <div className="mt-4">
            <HorizontalList
                mangaList={recentlyAddedList.data}
                slideClassName="sm:w-32 "
                imageClassName="h-[179px]"
            />
        </div>
    );
};

export default HomeRecentlyList;
