"use client";
import React from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
type Props = {
    title?: string;
    children?: React.ReactNode;
    contentClass?: string;
    open?: boolean;
    onOpenChange?: () => void;
};

const ComboBox = ({
    open,
    title,
    children,
    contentClass,
    onOpenChange,
}: Props) => {
    return (
        <div className="relative">
            <Popover open={open} onOpenChange={onOpenChange}>
                <div>
                    <PopoverTrigger asChild>
                        <Button
                            variant="default"
                            role="combobox"
                            aria-expanded={open}
                            className={cn(
                                " w-full py-1.5 gap-1 h-auto justify-between border border-transparent  active:border-primary",
                                open && "bg-accent-hover"
                            )}
                        >
                            <div className="whitespace-break-spaces break-all line-clamp-1">
                                {title}
                            </div>
                            <ChevronsUpDown size={20} />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className={cn(" p-1.5   bg-accent", contentClass)}
                    >
                        {children}
                    </PopoverContent>
                </div>
            </Popover>
        </div>
    );
};

export default ComboBox;
