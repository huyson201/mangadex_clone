import React from "react";
import ChapterContent from "@/components/chapter/ChapterContent";
import { getAtHome } from "@/services/mangadex";

type Props = {
    params: {
        id: string;
    };
};

const page = async ({ params: { id } }: Props) => {
    const atHome = await getAtHome(id);
    return (
        <div className="pt-[calc(var(--navbar-height)_+_1rem)]">
            <ChapterContent data={atHome} />
        </div>
    );
};

export default page;
