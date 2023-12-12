import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export const menuOptionVariants = cva(
    `flex items-center px-3 text-base font-medium  w-full justify-start rounded`,
    {
        variants: {
            variant: {
                default: "text-foreground hover:bg-drawer-accent-2",
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
        React.ButtonHTMLAttributes<HTMLButtonElement> {}

function MenuOption({ className, variant, size, ...props }: Props) {
    return (
        <Button
            className={cn(menuOptionVariants({ variant, size }), className)}
            {...props}
        />
    );
}

export default MenuOption;
