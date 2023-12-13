import { Button } from "@/components/ui/button";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import {
    BookOpen,
    Bookmark,
    Eye,
    MessageSquare,
    MoreHorizontal,
    Star,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DetailDesc from "@/components/DetailDesc/DetailDesc";
import ChapterList from "@/components/ChapterList/ChapterList";
type Props = {};

const page = (props: Props) => {
    return (
        <Wrapper className="mt-2">
            <div className=" md:px-4 flex gap-6">
                <div className="top-0 left-0 w-full -z-[1] [clip:rect(0,auto,auto,0)] [clip-path:inset(0_0)] h-[calc(var(--banner-height)_+_0.5rem)]  absolute">
                    <div
                        className="fixed  top-0 left-0 w-full h-[calc(var(--banner-height)_+_0.5rem)] "
                        style={{
                            background:
                                "no-repeat  center 25% / cover  url(https://mangadex.org/covers/b96e5e23-0017-4e89-a582-ddaa261bd21d/fa606719-a616-47f3-8ce8-bb31b8642242.jpg.256.jpg)",
                        }}
                    ></div>
                    <div className="backdrop-blur-sm absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-md-background/80 to-md-background from-0% to-100% sm:bg-gradient-to-tr sm:from-black/60 sm:from-[44%] sm:to-transparent"></div>
                </div>
                <div
                    className="blur-xl hidden sm:block absolute min-h-[670px] w-full top-0 left-0  -z-[2]"
                    style={{
                        background: `radial-gradient(circle at top, hsla(var(--md-background) / 0.8), hsla(var(--md-background)) 75%), no-repeat top 30% center / 100% url(https://mangadex.org/covers/b96e5e23-0017-4e89-a582-ddaa261bd21d/fa606719-a616-47f3-8ce8-bb31b8642242.jpg.256.jpg)`,
                    }}
                ></div>

                <div className="w-[100px] sm:w-[200px]">
                    <Image
                        className="w-full rounded"
                        width={512}
                        height={725}
                        src={
                            "https://mangadex.org/covers/b96e5e23-0017-4e89-a582-ddaa261bd21d/fa606719-a616-47f3-8ce8-bb31b8642242.jpg.512.jpg"
                        }
                        alt="img"
                    />
                </div>
                <div className="flex sm:h-full sm:min-h-[360px] flex-col w-[calc(100%_-_100px_-_1.5rem)] sm:w-[calc(100%_-_200px_-_1.5rem)]">
                    <h1 className="text-2xl sm:text-[2.5rem]/10  md:text-5xl/ font-bold line-clamp-2">
                        Deadman Wonderland
                    </h1>
                    <div className="text-foreground text-base sm:text-xl line-clamp-2 mt-1">
                        デッドマン・ワンダーランド
                    </div>
                    <div className="text-foreground sm:mt-auto text-xs sm:text-base font-normal">
                        Kataoka Jinsei, Kondou Kazuma
                    </div>
                    <div className="hidden sm:block mt-5">
                        <div className="flex items-center gap-2 ">
                            <Button
                                className="rounded px-8"
                                variant={"primary"}
                            >
                                Add To Library
                            </Button>
                            <Button
                                variant={"secondary"}
                                className="px-2 rounded"
                            >
                                <BookOpen />
                            </Button>
                        </div>
                        <div className="tags flex gap-1.5 mt-3 overflow-hidden max-h-[18px] flex-wrap">
                            <span className="uppercase  text-[11px] text-foreground font-bold px-1.5 rounded-md bg-status-yellow">
                                Suggestive
                            </span>

                            <span className="uppercase  text-[11px] text-foreground font-bold px-1.5 rounded-md bg-customs-accent">
                                Action
                            </span>
                            <span className="uppercase  text-[11px] text-foreground font-bold px-1.5 rounded-md bg-customs-accent">
                                Comedy
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-status-blue mt-2">
                            <span className="w-2 h-2 rounded-full bg-status-blue"></span>
                            <span className="uppercase sm:font-semibold text-foreground text-xs">
                                PUBLICATION: 2006, COMPLETED
                            </span>
                        </div>
                    </div>
                    <div className="flex mt-auto sm:mt-3  gap-2 items-baseline sm:text-base text-sm">
                        <span className="flex items-center gap-1 text-primary ">
                            <Star size={16} />
                            8.5
                        </span>
                        <span className="flex items-center gap-1 text-foreground  ">
                            <MessageSquare size={16} />
                            25
                        </span>
                        <span className="flex items-center gap-1 text-foreground  ">
                            <Eye size={16} />
                            N/A
                        </span>
                    </div>
                </div>
            </div>
            <div className="sm:hidden">
                <div className=" tags flex gap-1.5 mt-3 flex-wrap max-h-[39px] overflow-hidden">
                    <span className="uppercase  text-[11px] text-foreground font-semibold px-1.5 rounded-md bg-status-yellow">
                        Suggestive
                    </span>

                    <span className="uppercase  text-[11px] text-foreground font-semibold px-1.5 rounded-md bg-customs-accent">
                        Action
                    </span>
                    <span className="uppercase  text-[11px] text-foreground font-semibold px-1.5 rounded-md bg-customs-accent">
                        Comedy
                    </span>
                </div>

                <div className="flex items-center gap-2 text-status-blue mt-2">
                    <span className="w-2 h-2 rounded-full bg-status-blue"></span>
                    <span className="uppercase text-foreground text-xs">
                        PUBLICATION: 2006, COMPLETED
                    </span>
                </div>

                <div className="mt-4 flex items-center gap-2 ">
                    <Button variant={"primary"} className="px-2 rounded-sm">
                        <Bookmark />
                    </Button>
                    <Button
                        variant={"secondary"}
                        className="outline-none  border-none px-2 rounded-sm"
                    >
                        <MoreHorizontal />
                    </Button>
                    {/* <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button
                                        variant={"secondary"}
                                        className="outline-none  border-none px-2 rounded-sm"
                                    >
                                        <MoreHorizontal />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-accent-2 min-w-[140px] rounded-lg">
                                    <DropdownMenuItem>Share</DropdownMenuItem>
                                    <DropdownMenuItem>Upload</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div> */}
                    <Button
                        className="grow capitalize gap-4 rounded-sm"
                        variant={"secondary"}
                    >
                        <BookOpen /> Read
                    </Button>
                </div>
            </div>
            <DetailDesc />
            <ChapterList />
        </Wrapper>
    );
};

export default page;
