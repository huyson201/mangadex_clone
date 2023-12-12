import React from "react";
import { Droplet, Settings, User, X } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useStackMenu } from "@/contexts/StackMenuContext";
import { THEME_SELECTION_MENU_ID } from "./ThemeSelectionMenu";
import { Language_SELECTION_MENU_ID } from "./LanguageSelectionMenu";
import { useTranslations } from "next-intl";
import MenuOption from "./MenuOption";
type Props = {};

export const DEFAULT_MENU_ID = "DEFAULT";
function DefaultMenu({}: Props) {
    const stackMenu = useStackMenu();
    const t = useTranslations("accountMenu.defaultMenu");
    return (
        <div>
            <div>
                <Button
                    variant={"outline"}
                    className="text-xl hover:bg-drawer-accent rounded-full"
                    size={"icon"}
                    onClick={() => stackMenu?.close()}
                >
                    <X />
                </Button>
            </div>
            <div>
                <Link
                    href={"#"}
                    className={cn(
                        "flex-col text-foreground gap-y-3 py-6 flex items-center justify-center hover:bg-drawer-accent"
                    )}
                >
                    <User size={50} className="text-2xl" />
                    <span className="text-xl font-bold">{t("guest")}</span>
                </Link>
            </div>
            <div className="my-4 border-t border-b border-[var(--drawer-separator)] py-4 ">
                <div className="flex gap-2">
                    <MenuOption
                        className="gap-2 w-2/4  hover:bg-drawer-accent"
                        onClick={() => stackMenu?.push(THEME_SELECTION_MENU_ID)}
                    >
                        <Settings />
                        {t("settings")}
                    </MenuOption>
                    <MenuOption
                        className="gap-2 w-2/4 hover:bg-drawer-accent"
                        onClick={() => stackMenu?.push(THEME_SELECTION_MENU_ID)}
                    >
                        <Droplet />
                        {t("themes")}
                    </MenuOption>
                </div>
                <div>
                    <MenuOption
                        onClick={() =>
                            stackMenu?.push(Language_SELECTION_MENU_ID)
                        }
                        className="hover:bg-drawer-accent"
                    >
                        {t("languages")}
                    </MenuOption>
                    <MenuOption className="hover:bg-drawer-accent">
                        {t("filter")}
                    </MenuOption>
                </div>
            </div>
            <div>
                <Button
                    variant={"primary"}
                    className="w-full text-base font-medium rounded"
                >
                    {t("signIn")}
                </Button>
                <Button
                    variant={"default"}
                    className="mt-2 hover:bg-drawer-accent w-full text-base font-medium rounded"
                >
                    {t("register")}
                </Button>
            </div>
        </div>
    );
}

export default DefaultMenu;
