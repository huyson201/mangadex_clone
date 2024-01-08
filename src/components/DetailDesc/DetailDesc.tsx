"use client";
import { cn, getDataByLocale } from "@/lib/utils";
import { Manga } from "@/types";
import { ChevronsDown, ChevronsUp } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import DetailInfo from "./DetailInfo";

interface DetailDescProps {
    manga: Manga;
}
const DetailDesc = ({ manga }: DetailDescProps) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const descRef = useRef<HTMLDivElement>(null);

    return (
        <div className="relative">
            <div
                ref={descRef}
                className={cn(
                    `mt-4 sm:mt-6 max-h-[200vh] overflow-y-hidden   lg:h-auto
                 lg:after:hidden [&.collapsed]:after:content-[''] after:w-full after:absolute after:content-none after:h-6 after:bg-gradient-to-t after:from-background after:to-transparent after:left-0 after:bottom-0
                 relative [&.collapsed]:max-h-[60px] pb-4  lg:[&.collapsed]:border-none [&.collapsed]:border-b  border-primary transition-all duration-500 `,
                    { collapsed: isCollapsed }
                )}
            >
                <div>
                    <div
                        className="text-sm break-all"
                        dangerouslySetInnerHTML={{
                            __html: getDataByLocale(
                                manga.attributes.description
                            ),
                        }}
                    ></div>
                    <hr className="block w-full h-0 border-t border-foreground mt-4 opacity-10" />
                </div>

                <DetailInfo manga={manga} className="lg:hidden" />
            </div>

            <Button
                variant={isCollapsed ? "primary" : "default"}
                className={cn(
                    "lg:hidden px-1.5 gap-x-2 py-0 h-auto rounded-b text-xs font-normal rounded-t-none absolute top-full left-2/4 -translate-x-2/4"
                )}
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                {!isCollapsed ? (
                    <ChevronsUp size={14} />
                ) : (
                    <ChevronsDown size={14} />
                )}
                See more
                <ChevronsDown size={14} />
            </Button>
        </div>
    );
};

export default DetailDesc;
