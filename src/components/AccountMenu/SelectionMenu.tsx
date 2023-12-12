"use client";
import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useStackMenu } from "@/contexts/StackMenuContext";

type Props = {
    children?: any;
    title: string;
};
export const THEME_SELECTION_MENU_ID = "THEME_SELECTION";
function SelectionMenu({ children, title }: Props) {
    const stackMenu = useStackMenu();
    return (
        <div>
            <div className="flex items-center gap-2">
                <Button
                    variant={"outline"}
                    className="text-xl hover:bg-drawer-accent rounded-full"
                    size={"icon"}
                    onClick={() => stackMenu?.back()}
                >
                    <ArrowLeft />
                </Button>

                <span className="text-foreground text-base font-medium">
                    {title}
                </span>
            </div>
            <div className="mt-2  space-y-1">{children}</div>
        </div>
    );
}

export default SelectionMenu;
