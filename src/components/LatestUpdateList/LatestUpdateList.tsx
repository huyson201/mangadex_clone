import {
    getHomeLatestUpdate,
    getLatestUpdateList,
    getStatisticsList,
} from "@/services/mangadex";
import LatestUpdateItem from "./LatestUpdateItem";
type Props = {};

async function LatestUpdateList({}: Props) {
    const latestUpdateManga = await getHomeLatestUpdate();

    const statisticsResult = await getStatisticsList(
        "chapter",
        latestUpdateManga.data.map((el) => el.attributes.latestUploadedChapter)
    );
    const mangaCount = latestUpdateManga.data.length;
    const col1Data = latestUpdateManga.data.slice(0, mangaCount / 2);
    const col2Data = latestUpdateManga.data.slice(mangaCount / 2);

    return (
        <div className="mt-2 md:mt-4 grid md:grid-cols-2 gap-x-4 ">
            <div className="md:bg-customs-accent md:px-4 py-4 space-y-4">
                {col1Data.map((manga, index) => (
                    <LatestUpdateItem
                        manga={manga}
                        key={`${manga.id}`}
                        statistic={
                            statisticsResult.statistics[
                                manga.attributes.latestUploadedChapter
                            ]
                        }
                    />
                ))}
            </div>
            <div className="hidden md:block md:bg-customs-accent md:px-4 py-4 space-y-4">
                {col2Data.map((manga, index) => (
                    <LatestUpdateItem
                        statistic={
                            statisticsResult.statistics[
                                manga.attributes.latestUploadedChapter
                            ]
                        }
                        manga={manga}
                        key={`${manga.id}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default LatestUpdateList;
