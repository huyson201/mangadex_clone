"use client";
import React from "react";
import SelectionMenu from "./SelectionMenu";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "../Navigation/Navigation";
import { Check } from "lucide-react";
import { languages } from "@/data/languages";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { menuOptionVariants } from "./MenuOption";

type Props = {};
export const Language_SELECTION_MENU_ID = "LANGUAGE_SELECTION";
const LanguageSelectionMenu = (props: Props) => {
    const t = useTranslations("accountMenu.languageSelections");
    const params = useParams();
    const locale = params.locale || "en";
    return (
        <SelectionMenu title={t("title")}>
            {languages.map((value, index) => {
                return (
                    <Link
                        key={`${value.lang}-${value.locale}`}
                        href={"/"}
                        locale={value.locale as any}
                        className={cn(menuOptionVariants(), "gap-x-2 py-1.5")}
                    >
                        <Image
                            src={value.flag}
                            className="w-6"
                            alt={value.locale}
                        />
                        {t(value.lang)}
                        {locale === value.locale && (
                            <div className="text-primary">
                                <Check />
                            </div>
                        )}
                    </Link>
                );
            })}
        </SelectionMenu>
    );
};

export default LanguageSelectionMenu;
