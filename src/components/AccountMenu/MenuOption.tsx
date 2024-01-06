import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { Button } from "../ui/button";

export const menuOptionVariants = cva(
    `flex items-center px-3 text-base font-medium  w-full justify-start rounded`,
    {
        variants: {
            variant: {
                default: "text-foreground hover:bg-accent-2/30",
            },
            size: {
                full: "w-full",
            },
        },
        defaultVariants: {
            variant: "default",
            size: null,
        },
    }
);

interface Props
    extends VariantProps<typeof menuOptionVariants>,
        React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
}

function MenuOption({ className, asChild, variant, size, ...props }: Props) {
    return (
        <Button
            asChild={asChild}
            variant={"ghost"}
            className={cn(menuOptionVariants({ variant, size }), className)}
            {...props}
        />
    );
}

export default MenuOption;
