import React from "react";
import ChapterContent from "@/components/chapter/ChapterContent";
import { getAtHome, getChapter } from "@/services/mangadex";

type Props = {
    params: {
        id: string;
    };
};

const page = async ({ params: { id } }: Props) => {
    const [atHome, chapter] = await Promise.all([
        getAtHome(id),
        getChapter(id, ["manga", "scanlation_group", "user"]),
    ]);
    return (
        <>
            <ChapterContent data={atHome} chapter={chapter.result.data} />
        </>
    );
};

export default page;
