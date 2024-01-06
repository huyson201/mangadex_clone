"use client";
import { addMangaToLib } from "@/actions/addMangaToLib-action";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Follow } from "@/lib";
import { cn, getCoverArtFromManga, getMangaTitle } from "@/lib/utils";
import { getImageUrl } from "@/services/mangadex";
import { Manga, ReadingStatus, readingStatusData } from "@/types";
import { Bookmark, ChevronDown, X } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef, useState, useTransition } from "react";

type Props = {
    manga: Manga;
    follow?: Follow;
    isLoggedIn: boolean;
};

const AddLib = ({ manga, follow, isLoggedIn }: Props) => {
    const [openList, setOpenList] = useState(false);
    const [statusValue, setStatusValue] = useState<ReadingStatus>(
        follow ? (follow.status as ReadingStatus) : "none"
    );
    const coverArt = getCoverArtFromManga(manga);
    const [pending, startTransition] = useTransition();
    const pathname = usePathname();
    const closeRef = useRef<HTMLButtonElement>(null);

    if (!isLoggedIn) {
        return (
            <div>
                <Button
                    onClick={() => startTransition(signIn)}
                    className="hidden min-w-[164px] sm:flex capitalize gap-x-2 rounded px-8"
                    variant={"primary"}
                >
                    {pending ? "..." : "Add To Library"}
                </Button>
                <Button
                    onClick={() => startTransition(signIn)}
                    variant={"primary"}
                    className="sm:hidden px-2 rounded-sm"
                >
                    {pending ? "..." : <Bookmark />}
                </Button>
            </div>
        );
    }
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div>
                        <Button
                            className="hidden sm:flex capitalize gap-x-2 rounded px-8"
                            variant={"primary"}
                        >
                            {follow ? (
                                <>
                                    <BellCheck />
                                    {follow.status}
                                </>
                            ) : (
                                "Add To Library"
                            )}
                        </Button>
                        <Button
                            variant={"primary"}
                            className="sm:hidden px-2 rounded-sm"
                        >
                            {follow ? <BellCheck /> : <Bookmark />}
                        </Button>
                    </div>
                </DialogTrigger>
                <DialogContent className="p-0 sm:px-[var(--side-margin)] h-full sm:h-auto max-w-none sm:max-w-[760px] bg-transparent ring-0 border-none">
                    <div className=" bg-background p-4 rounded-md">
                        <DialogHeader>
                            <div className="flex justify-between items-center">
                                <span className="text-xl">Add to Library</span>
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

                            <div>
                                <div className="grid grid-rows-[auto_1fr] grid-cols-[25%_75%] sm:grid-cols-[20%_80%] gap-2 mt-4">
                                    <div className="row-span-1 sm:row-span-2">
                                        <Image
                                            className="rounded w-full"
                                            src={getImageUrl(
                                                "256",
                                                manga.id,
                                                coverArt?.attributes.fileName
                                            )}
                                            alt={getMangaTitle(manga)}
                                            width={300}
                                            height={700}
                                        />
                                    </div>
                                    <div className="text-left text-foreground font-bold text-lg">
                                        {getMangaTitle(manga)}
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <div className="text-left capitalize font-bold text-foreground">
                                            Reading status
                                        </div>
                                        <div className="flex mt-2">
                                            <Popover
                                                open={openList}
                                                onOpenChange={() =>
                                                    setOpenList((prev) => !prev)
                                                }
                                            >
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="default"
                                                        role="combobox"
                                                        aria-expanded={openList}
                                                        className={cn(
                                                            " h-full border-none w-full sm:w-2/3 rounded-sm py-1.5 gap-1  justify-between border  active:border-primary",
                                                            openList &&
                                                                "bg-accent-hover"
                                                        )}
                                                    >
                                                        <div className="text-left">
                                                            <div className="text-xs font-normal opacity-80">
                                                                Reading Status
                                                            </div>
                                                            <div className="text-sm font-normal capitalize">
                                                                {statusValue}
                                                            </div>
                                                        </div>
                                                        <span
                                                            className={cn(
                                                                "transition-all",
                                                                openList &&
                                                                    "rotate-180"
                                                            )}
                                                        >
                                                            <ChevronDown
                                                                size={20}
                                                            />
                                                        </span>
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    className={cn(
                                                        " rounded-none  p-0 max-h-[320px] overflow-y-auto custom-scrollbar bg-accent w-[var(--radix-popover-trigger-width)]"
                                                    )}
                                                >
                                                    {readingStatusData.map(
                                                        (value, index) => {
                                                            return (
                                                                <div
                                                                    onClick={() => {
                                                                        setOpenList(
                                                                            false
                                                                        );
                                                                        setStatusValue(
                                                                            value
                                                                        );
                                                                    }}
                                                                    className="text-sm cursor-pointer px-4 py-2 capitalize transition-colors hover:bg-accent-10"
                                                                    key={value}
                                                                >
                                                                    {value}
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogHeader>
                        <div className="flex  flex-col-reverse sm:flex-row gap-4 mt-6 sm:mt-2  sm:w-4/5 ml-auto">
                            <DialogClose asChild ref={closeRef}>
                                <Button
                                    type="button"
                                    className=" w-full sm:w-2/5 rounded-sm"
                                    variant={"secondary"}
                                >
                                    Cancel
                                </Button>
                            </DialogClose>

                            <Button
                                disabled={
                                    (!follow && statusValue === "none") ||
                                    pending
                                }
                                className="w-full sm:w-2/5 rounded-sm"
                                variant={"primary"}
                                onClick={() =>
                                    startTransition(async () => {
                                        await addMangaToLib(
                                            manga.id,
                                            statusValue
                                        );
                                        closeRef.current?.click();
                                    })
                                }
                            >
                                {pending ? "..." : follow ? "Update" : "Add"}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export const BellCheck = () => {
    return (
        <svg
            data-v-4c681a64=""
            data-v-a31e942f=""
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="icon"
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h9m6.63-4A17.888 17.888 0 0 1 18 8m-4.27 13a2 2 0 0 1-3.46 0M17 18l2 2 4-4"
            ></path>
        </svg>
    );
};

export default AddLib;
