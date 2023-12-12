"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { FiUser } from "react-icons/fi";
import { cn } from "@/lib/utils";

import Backdrop from "../Backdrop/Backdrop";
import DefaultMenu, { DEFAULT_MENU_ID } from "./DefaultMenu";
import ThemeSelectionMenu, {
    THEME_SELECTION_MENU_ID,
} from "./ThemeSelectionMenu";
import { useStackMenu } from "@/contexts/StackMenuContext";
import LanguageSelectionMenu, {
    Language_SELECTION_MENU_ID,
} from "./LanguageSelectionMenu";

type Props = {};

const Menu: Record<string, React.ComponentType> = {
    [DEFAULT_MENU_ID]: DefaultMenu,
    [THEME_SELECTION_MENU_ID]: ThemeSelectionMenu,
    [Language_SELECTION_MENU_ID]: LanguageSelectionMenu,
};

function AccountMenu({}: Props) {
    const stackMenu = useStackMenu();

    const Comp = Menu[stackMenu?.currentActive || ""] || undefined;

    return (
        <>
            <div>
                <Button
                    variant={"default"}
                    size={"icon"}
                    className="rounded-full text-3xl"
                    onClick={() => stackMenu?.open()}
                >
                    <FiUser />
                </Button>
                <div
                    className={cn(
                        `fixed md:max-h-[500px] overflow-y-auto md:absolute top-0 md:top-full transition-transform md:h-auto right-0 md:right-[var(--side-margin)] z-[var(--drawer-index)] h-full min-w-[var(--drawer-profile-min-width)] p-6 w-full max-w-[var(--drawer-profile-width)] bg-drawer md:rounded-md`,
                        !stackMenu?.isActive
                            ? "translate-x-full md:translate-x-0 md:scale-105 md:opacity-0 md:invisible"
                            : "translate-x-0 md:scale-100 md:opacity-100 md:visible"
                    )}
                >
                    {Comp && <Comp />}
                </div>
            </div>
            <Backdrop
                show={stackMenu?.isActive}
                className="z-10"
                onClick={() => stackMenu?.close()}
            />
        </>
    );
}

export default AccountMenu;
