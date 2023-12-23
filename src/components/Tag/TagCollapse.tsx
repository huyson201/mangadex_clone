"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Props = {
    children?: React.ReactNode;
    className?: string;
};

const TagCollapse = ({ children, className }: Props) => {
    const [collapsed, setCollapsed] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        if (ref.current.scrollHeight <= 17) return;
        ref.current.classList.add("show-more");
    }, []);
    return (
        <div
            ref={ref}
            onClick={() => setCollapsed(true)}
            className={cn(
                `relative  flex items-center gap-x-2 gap-y-2 flex-wrap mt-2  overflow-hidden
             transition-all after:text-primary after:text-xs pr-12 after:font-semibold after:absolute after:top-2/4 after:-translate-y-2/4 after:right-0`,
                collapsed
                    ? "max-h-screen after:content-none"
                    : "max-h-[16px] [&.show-more]:cursor-pointer [&.show-more]:after:content-['MORE']"
            )}
        >
            {children}
        </div>
    );
};

export default TagCollapse;
