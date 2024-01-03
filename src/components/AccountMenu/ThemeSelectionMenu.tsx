import React from "react";
import { Button } from "../ui/button";
import SelectionMenu from "./SelectionMenu";
import { useTranslations } from "next-intl";
import MenuOption from "./MenuOption";
import { useTheme } from "next-themes";
import { Check } from "lucide-react";

type Props = {
    children?: any;
};
export const THEME_SELECTION_MENU_ID = "THEME_SELECTION";

function ThemeSelectionMenu({ children }: Props) {
    const t = useTranslations("accountMenu.themeSelections");
    const { theme, themes, setTheme } = useTheme();
    return (
        <SelectionMenu title={t("title")}>
            {themes.map((themeValue) => {
                return (
                    <MenuOption
                        key={themeValue}
                        onClick={() => setTheme(themeValue)}
                        className="gap-x-2"
                    >
                        {t(themeValue)}
                        {theme === themeValue && (
                            <div className="text-primary">
                                <Check />
                            </div>
                        )}
                    </MenuOption>
                );
            })}
        </SelectionMenu>
    );
}

export default ThemeSelectionMenu;
