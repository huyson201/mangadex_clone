import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const tagVariants = cva(
    "uppercase text-[0.625rem] text-foreground font-semibold  rounded-md",
    {
        variants: {
            status: {
                none: "",
                default: "bg-accent",
                warning: "bg-status-yellow",
                success: "bg-status-green",
            },
        },
        defaultVariants: {
            status: "default",
        },
    }
);
interface Props
    extends React.HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof tagVariants> {
    className?: string;
}

const Tag = ({ className, status, ...props }: Props) => {
    return (
        <span {...props} className={cn(tagVariants({ status }), className)} />
    );
};

export default Tag;
