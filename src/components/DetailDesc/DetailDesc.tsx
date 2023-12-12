"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { ChevronsDown, ChevronsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import DetailInfo from "./DetailInfo";

const DetailDesc = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const descRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!descRef.current) return;
        if (!isCollapsed) {
            descRef.current.style.height =
                descRef.current.scrollHeight + 4 + "px";
            return;
        }
        descRef.current.style.height = "";
    }, [isCollapsed]);

    return (
        <div className="relative">
            <div
                ref={descRef}
                className={cn(
                    `mt-4 sm:mt-6 pb-4 overflow-y-hidden h-[80px]  lg:h-auto
                 lg:after:hidden [&.collapsed]:after:content-[''] after:w-full after:absolute after:content-none after:h-6 after:bg-gradient-to-t after:from-background after:to-transparent after:left-0 after:bottom-0
                 relative lg:[&.collapsed]:border-none [&.collapsed]:border-b border-primary transition-[height] duration-500 `,
                    { collapsed: isCollapsed }
                )}
            >
                <div className="text-sm ">
                    Ganta Igarashi has been convicted of a crime that he
                    hasn&apos;t committed, and sent to a new, privately owned
                    and operated prison, where the inmates are the main
                    attraction in a modern day twist to the gladiatorial
                    coliseums of ancient times. Throw in a healthy dose of weird
                    little girl, some new-found super powers, and a little
                    conspiracy theory, and you have Deadman Wonderland.
                    <hr className="block w-full h-0 border-t border-foreground mt-4 opacity-10" />
                </div>
                <DetailInfo className="lg:hidden" />
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
