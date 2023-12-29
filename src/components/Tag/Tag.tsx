import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
export const tagVariants = cva(
    "uppercase text-[0.625rem] inline-block text-foreground font-semibold  rounded-md",
    {
        variants: {
            variant: {
                none: "",
                default: "bg-accent",
                warning: "bg-status-yellow",
                success: "bg-status-green",
                danger: "bg-status-red",
                purple: "bg-status-purple",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);
interface Props
    extends React.HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof tagVariants> {
    className?: string;
}

const Tag = ({ className, variant, ...props }: Props) => {
    return (
        <span {...props} className={cn(tagVariants({ variant }), className)} />
    );
};

export default Tag;
