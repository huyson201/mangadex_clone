import React from "react";
import { Button } from "../ui/button";
import SelectionMenu from "./SelectionMenu";
import { useTranslations } from "next-intl";
import MenuOption from "./MenuOption";

type Props = {
    children?: any;
};
export const THEME_SELECTION_MENU_ID = "THEME_SELECTION";
function ThemeSelectionMenu({ children }: Props) {
    const t = useTranslations("accountMenu.themeSelections");
    return (
        <SelectionMenu title={t("title")}>
            <MenuOption>{t("light")}</MenuOption>
            <MenuOption>{t("dark")}</MenuOption>
            <MenuOption>{t("system")}</MenuOption>
        </SelectionMenu>
    );
}

export default ThemeSelectionMenu;
