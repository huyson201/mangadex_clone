"use client";
import ChapterItem from "@/components/ChapterList/ChapterItem";
import RingLoader from "@/components/Loader/RingLoader";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { getChapters, getStatisticsList } from "@/services/mangadex";
import { BookOpen, X } from "lucide-react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

type Props = {
    mangaId: string;
};

const ReadButton = ({ mangaId }: Props) => {
    const { data, isMutating, trigger } = useSWRMutation(
        `/manga/${mangaId}/first-chapters`,
        () =>
            getChapters({
                manga: mangaId,
                chapter: ["1"],
                includes: ["user", "scanlation_group"],
            })
    );
    const { data: statisticRes, isLoading: statisticLoading } = useSWR(
        data ? `/manga/${mangaId}/first-chapters/statistic` : null,
        () =>
            getStatisticsList(
                "chapter",
                data!.data.map((value) => value.id)
            )
    );

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    onClick={() => trigger()}
                    variant={"secondary"}
                    className="px-2 flex  sm:inline-flex sm:rounded grow sm:grow-0 capitalize gap-4 rounded-sm"
                >
                    {isMutating || statisticLoading ? (
                        "..."
                    ) : (
                        <>
                            <BookOpen />
                            <span className="sm:hidden">Read</span>
                        </>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-screen overflow-y-auto custom-scrollbar p-0 sm:px-[var(--side-margin)] h-full sm:h-auto max-w-none sm:max-w-[760px] bg-transparent ring-0 border-none">
                <div className=" bg-background p-4 rounded-md">
                    <div className="flex justify-between items-center">
                        <span className="text-xl">Select Group</span>
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="ghost"
                                className="rounded-full w-8 h-8 p-0"
                            >
                                <X size={20} />
                            </Button>
                        </DialogClose>
                    </div>
                    <div className="mt-4">
                        {(isMutating || statisticLoading) && (
                            <div className="h-full flex justify-center py-6">
                                <RingLoader />
                            </div>
                        )}
                        {!isMutating &&
                            !statisticLoading &&
                            data &&
                            statisticRes &&
                            data.data.map((chapter) => (
                                <ChapterItem
                                    key={chapter.id}
                                    chapter={chapter}
                                />
                            ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ReadButton;
