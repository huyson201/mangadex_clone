import { getLatestUpdateList } from "@/services/mangadex";
import LatestUpdateItem from "./LatestUpdateItem";
type Props = {};

async function LatestUpdateList({}: Props) {
    const latestUpdateList = await getLatestUpdateList(0, 10, [
        "scanlation_group",
    ]);
    const mangaCount = latestUpdateList.data.length;
    const col1Data = latestUpdateList.data.slice(0, mangaCount / 2);
    const col2Data = latestUpdateList.data.slice(mangaCount / 2);

    return (
        <div className="mt-2 md:mt-4 grid md:grid-cols-2 gap-x-4 ">
            <div className="md:bg-customs-accent md:px-4 py-4 space-y-4">
                {col1Data.map((chapter, index) => (
                    <LatestUpdateItem key={`${chapter.id}`} chapter={chapter} />
                ))}
            </div>
            <div className="hidden md:block md:bg-customs-accent md:px-4 py-4 space-y-4">
                {col2Data.map((chapter, index) => (
                    <LatestUpdateItem key={`${chapter.id}`} chapter={chapter} />
                ))}
            </div>
        </div>
    );
}

export default LatestUpdateList;
