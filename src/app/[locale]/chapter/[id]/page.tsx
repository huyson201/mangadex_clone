import { getAtHome, getChapter } from "@/services/mangadex";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

type Props = {
    params: {
        id: string;
    };
};
const ChapterContent = dynamic(
    () => import("@/components/chapter/ChapterContent"),
    { ssr: false }
);
const page = async ({ params: { id } }: Props) => {
    const chapter = await getChapter(id, ["manga", "scanlation_group", "user"]);

    if (chapter.result.data.attributes.pages === 0) {
        notFound();
    }

    const atHome = await getAtHome(id);
    return (
        <>
            <ChapterContent data={atHome} chapter={chapter.result.data} />
        </>
    );
};

export default page;
