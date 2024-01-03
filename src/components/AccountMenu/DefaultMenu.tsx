"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import MenuOption from "./MenuOption";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { signOutAction } from "@/actions/signout-action";
import { SING_UP_URL } from "@/constants";
import { useStackMenu } from "@/contexts/StackMenuContext";
import { THEME_SELECTION_MENU_ID } from "./ThemeSelectionMenu";
import { Language_SELECTION_MENU_ID } from "./LanguageSelectionMenu";
import { useTranslations } from "next-intl";
import { signIn, useSession } from "next-auth/react";
import { Bookmark, Droplet, LogOut, Settings, User, X } from "lucide-react";

type Props = {};

export const DEFAULT_MENU_ID = "DEFAULT";
function DefaultMenu({}: Props) {
    const stackMenu = useStackMenu();
    const t = useTranslations("accountMenu.defaultMenu");
    const { data, status } = useSession();
    return (
        <div>
            <div>
                <Button
                    variant={"ghost"}
                    className="text-xl hover:bg-accent rounded-full"
                    size={"icon"}
                    onClick={() => stackMenu?.close()}
                >
                    <X />
                </Button>
            </div>
            <div className="my-4">
                <Link
                    href={"#"}
                    className={cn(
                        "rounded flex-col text-foreground gap-y-3 py-4 flex items-center justify-center hover:bg-accent"
                    )}
                >
                    {status === "authenticated" && data.user.verified && (
                        <>
                            <Image
                                className="rounded-full"
                                src={data.user.image}
                                width={64}
                                height={64}
                                alt="avatar"
                            />
                            <span className="text-xl font-bold">
                                {data.user.username}
                            </span>
                        </>
                    )}
                    {(status === "unauthenticated" || !data?.user.verified) && (
                        <>
                            <User size={50} className="text-2xl" />
                            <span className="text-xl font-bold">
                                {t("guest")}
                            </span>
                        </>
                    )}
                </Link>
            </div>

            {status === "authenticated" && data.user.verified && (
                <div className=" border-t border-b border-[var(--drawer-separator)] py-4 ">
                    <div>
                        <MenuOption
                            onClick={() =>
                                stackMenu?.push(Language_SELECTION_MENU_ID)
                            }
                            className="hover:bg-accent gap-2"
                        >
                            <User />
                            My Profile
                        </MenuOption>
                        <MenuOption
                            onClick={() =>
                                stackMenu?.push(Language_SELECTION_MENU_ID)
                            }
                            className="hover:bg-accent gap-2"
                        >
                            <Bookmark />
                            My Follows
                        </MenuOption>
                    </div>
                </div>
            )}

            <div
                className={cn(
                    " [&.logged]:space-y-2 [&:not(.logged)]:border-t [&:not(.logged)]:border-b [&:not(.logged)]:border-[var(--drawer-separator)] py-4 ",
                    { logged: status === "authenticated" && data.user.verified }
                )}
            >
                <div className="flex gap-2">
                    <MenuOption
                        className="gap-2 w-2/4  hover:bg-accent"
                        onClick={() => stackMenu?.push(THEME_SELECTION_MENU_ID)}
                    >
                        <Settings />
                        {t("settings")}
                    </MenuOption>
                    <MenuOption
                        className="gap-2 w-2/4 hover:bg-accent"
                        onClick={() => stackMenu?.push(THEME_SELECTION_MENU_ID)}
                    >
                        <Droplet />
                        {t("themes")}
                    </MenuOption>
                </div>
                <MenuOption
                    onClick={() => stackMenu?.push(Language_SELECTION_MENU_ID)}
                    className="hover:bg-accent"
                >
                    {t("languages")}
                </MenuOption>
                <MenuOption className="hover:bg-accent">
                    {t("filter")}
                </MenuOption>
                {status === "authenticated" && data.user.verified && (
                    <form action={signOutAction}>
                        <MenuOption className="gap-2  hover:bg-accent">
                            <LogOut />
                            Sign Out
                        </MenuOption>
                    </form>
                )}
            </div>

            {(status === "unauthenticated" || !data?.user.verified) && (
                <div className="mt-4">
                    <Button
                        variant={"primary"}
                        className={cn("w-full text-base font-medium rounded")}
                        onClick={() => signIn()}
                    >
                        {t("signIn")}
                    </Button>
                    <Button
                        variant={"ghost"}
                        className={cn(
                            "w-full mt-2 text-base font-medium rounded"
                        )}
                        asChild
                    >
                        <Link href={SING_UP_URL}>{t("register")}</Link>
                    </Button>
                </div>
            )}
        </div>
    );
}

export default DefaultMenu;
