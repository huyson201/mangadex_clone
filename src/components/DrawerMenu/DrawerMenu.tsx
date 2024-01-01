"use client";
import React from "react";
import Logo from "@/components/Logo/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useDrawerMenu } from "@/contexts/DrawerMenuContext";
import { usePathname } from "next/navigation";
import Backdrop from "../Backdrop/Backdrop";
import { useTranslations } from "next-intl";
import { randomManga } from "@/actions/random-manga-action";
import { BookOpen, Bookmark, Home, Users, X } from "lucide-react";
import { ADVANCED_SEARCH_URL, READING_HISTORY_URL } from "@/constants";

type Props = {};

function DrawerMenu({}: Props) {
    const { isActive, setIsActive } = useDrawerMenu();
    const t = useTranslations("drawerMenu");
    return (
        <>
            <div
                className={cn(
                    "[&.active]:translate-x-0 left-0 -translate-x-full transition-transform  peer/drawer fixed z-[var(--drawer-index)] top-0 h-screen w-[var(--drawer-menu-width)] bg-drawer",
                    { active: isActive }
                )}
            >
                <div className="flex items-center justify-between px-3 py-2">
                    <Link href={"/"} className="inline-block">
                        <Logo />
                    </Link>

                    <Button
                        type="button"
                        variant={"outline"}
                        className={cn("text-3xl rounded-full ")}
                        size={"icon"}
                        onClick={() => setIsActive?.(false)}
                    >
                        <X />
                    </Button>
                </div>
                <div className="px-4 pt-2">
                    <DrawerItem
                        title={t("home")}
                        exact
                        href="/"
                        icon={<Home />}
                    />
                </div>
                <div className="px-4 pt-2">
                    <DrawerItem
                        title={t("follows")}
                        exact
                        href="/follows"
                        icon={<Bookmark />}
                    />
                    <DrawerItem
                        title={t("library")}
                        subItem
                        href="/titles/recent"
                    />
                    <DrawerItem
                        title={t("history")}
                        subItem
                        href={READING_HISTORY_URL}
                    />
                </div>
                <div className="px-4 pt-2">
                    <DrawerItem title={t("title")} icon={<BookOpen />} />
                    <DrawerItem
                        title={t("advancedSearch")}
                        subItem
                        exact
                        href={ADVANCED_SEARCH_URL}
                    />
                    <DrawerItem
                        title={t("recently")}
                        subItem
                        href="/titles/recent"
                    />
                    <DrawerItem
                        title={t("latest")}
                        subItem
                        href="/titles/latest"
                    />
                    <form action={randomManga}>
                        <button className="px-4 active:bg-drawer-accent-2 hover:bg-drawer-accent transition-colors duration-300  capitalize text-sm  py-1 rounded gap-2 w-full flex items-center text-foreground">
                            Random
                        </button>
                    </form>
                </div>
                <div className="px-4 pt-2">
                    <DrawerItem title={t("community")} icon={<Users />} />
                    <DrawerItem
                        title={t("forums")}
                        subItem
                        exact
                        href={"https://forums.mangadex.org/"}
                    />
                    <DrawerItem title={t("groups")} subItem href="/groups" />
                    <DrawerItem title={t("users")} subItem href="/users" />
                </div>
            </div>
            <Backdrop
                show={isActive}
                className="lg:hidden"
                onClick={() => setIsActive?.(false)}
            />
        </>
    );
}

export default DrawerMenu;

interface DrawerItemProps {
    href?: string;
    icon?: JSX.Element;
    title: string;
    exact?: boolean;
    subItem?: boolean;
}
const DrawerItem = ({ title, href, icon, subItem, exact }: DrawerItemProps) => {
    const pathname = usePathname();
    const isActive = exact
        ? pathname === href
        : pathname.startsWith(href || "");

    return (
        <Link
            href={href ?? "#"}
            className={cn(
                " block text-foreground group",
                { active: isActive },
                !href && "pointer-events-none"
            )}
        >
            <div
                className={cn(
                    "px-2 py-1 rounded gap-2 w-full flex items-center",
                    href &&
                        "group-active:bg-drawer-accent-2 group-hover:bg-drawer-accent transition-colors duration-300 group-[&.active]:bg-primary"
                )}
            >
                {icon && icon}
                <span
                    className={cn(
                        "capitalize inline-block text-sm ",
                        subItem ? "px-2" : "font-bold  "
                    )}
                >
                    {title}
                </span>
            </div>
        </Link>
    );
};
