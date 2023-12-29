"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { cva, VariantProps } from "class-variance-authority";

const tagCollapseVariants = cva(
    "flex items-center gap-x-2 gap-y-2 flex-wrap transition-all",
    {
        variants: {
            variant: {
                normal: "",
                hidden: "max-h-[16px] overflow-hidden",
                collapse:
                    "max-h-[16px] [&.show-more]:cursor-pointer [&.show-more]:after:content-['MORE'] relative overflow-hidden  after:text-primary after:text-xs  pr-12 after:font-semibold after:absolute after:top-2/4 after:-translate-y-2/4 after:right-0",
            },
        },
        defaultVariants: {
            variant: "normal",
        },
    }
);
interface Props extends VariantProps<typeof tagCollapseVariants> {
    children?: React.ReactNode;
    className?: string;
}

const TagCollapse = ({ children, className, variant }: Props) => {
    const [collapsed, setCollapsed] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current || variant !== "collapse") return;
        if (ref.current.scrollHeight <= 20) return;
        ref.current.classList.add("show-more");
    }, []);
    return (
        <div
            ref={ref}
            onClick={() => setCollapsed(true)}
            className={cn(
                tagCollapseVariants({ variant }),
                variant === "collapse" &&
                    collapsed &&
                    "cursor-default max-h-screen after:content-none",
                className
            )}
        >
            {children}
        </div>
    );
};

export default TagCollapse;
