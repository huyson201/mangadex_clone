"use client";
import React from "react";
import Logo from "@/components/Logo/Logo";
import { Button } from "@/components/ui/button";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FiHome } from "react-icons/fi";
import { GoBook } from "react-icons/go";
import { useDrawerMenu } from "@/contexts/DrawerMenuContext";
import { usePathname } from "next/navigation";
import Backdrop from "../Backdrop/Backdrop";
import { useTranslations } from "next-intl";

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
                        <IoClose />
                    </Button>
                </div>
                <div className="px-4 pt-2">
                    <DrawerItem
                        title={t("home")}
                        exact
                        href="/"
                        icon={<FiHome className={"text-2xl"} />}
                    />
                </div>
                <div className="px-4 pt-2">
                    <DrawerItem
                        title={t("title")}
                        icon={<GoBook className={"text-2xl"} />}
                    />
                    <DrawerItem
                        title={t("recently")}
                        subItem
                        href="/title/recent"
                    />
                    <DrawerItem title={t("latest")} subItem href="/latest" />
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
