import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const statusDotVariants = cva("inline-block rounded-full w-2 h-2 ", {
    variants: {
        variant: {
            ongoing: "bg-status-green",
            completed: "bg-status-blue",
            hiatus: "bg-status-yellow",
            cancelled: "bg-status-red",
        },
    },
    defaultVariants: {
        variant: "ongoing",
    },
});
interface Props extends VariantProps<typeof statusDotVariants> {
    title: string;
    className?: string;
}

const MangaStatus = ({ variant, title, className }: Props) => {
    return (
        <span
            className={cn(
                "rounded inline-flex  bg-accent-10 px-1.5 sm:py-1  items-center gap-1.5",
                className
            )}
        >
            <span className={cn(statusDotVariants({ variant }))}></span>
            <span className="text-xs capitalize">{title}</span>
        </span>
    );
};

export default MangaStatus;
