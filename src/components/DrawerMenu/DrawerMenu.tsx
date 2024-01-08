"use client";
import { randomManga } from "@/actions/random-manga-action";
import Logo from "@/components/Logo/Logo";
import { Button } from "@/components/ui/button";
import {
    ADVANCED_SEARCH_URL,
    FOLLOW_URL,
    LATEST_LIST_URL,
    READING_HISTORY_URL,
    RECENTLY_LIST_URL,
} from "@/constants";
import { useDrawerMenu } from "@/contexts/DrawerMenuContext";
import { cn } from "@/lib/utils";
import { BookOpen, Bookmark, Home, Users, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Backdrop from "../Backdrop/Backdrop";

type Props = {};

const menuData = [
    {
        name: "home",
        group: [
            {
                key: "home",
                exact: true,
                href: "/",
                icon: <Home />,
                subItem: false,
            },
        ],
    },
    {
        name: "follows",
        group: [
            {
                key: "follows",
                exact: true,
                icon: <Bookmark />,
                subItem: false,
            },
            {
                key: "library",
                href: FOLLOW_URL,
                subItem: true,
            },
            {
                key: "history",
                href: READING_HISTORY_URL,
                subItem: true,
            },
        ],
    },
    {
        name: "titles",
        group: [
            {
                key: "title",
                icon: <BookOpen />,
                subItem: false,
            },
            {
                key: "advancedSearch",
                href: ADVANCED_SEARCH_URL,
                exact: true,
                subItem: true,
            },
            {
                key: "recently",
                href: RECENTLY_LIST_URL,
                subItem: true,
            },
            {
                key: "latest",
                href: LATEST_LIST_URL,
                subItem: true,
            },
        ],
    },
    {
        name: "community",
        group: [
            {
                key: "community",
                icon: <Users />,
                exact: true,
                subItem: false,
            },
            {
                key: "forums",
                href: "https://forums.mangadex.org/",
                subItem: true,
                exact: true,
            },
        ],
    },
];

function DrawerMenu({}: Props) {
    const { isActive, setIsActive } = useDrawerMenu();
    const t = useTranslations("drawerMenu");
    const pathname = usePathname();
    useEffect(() => {
        if (matchMedia && matchMedia("(max-width:1024px)").matches) {
            setIsActive?.(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

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
                        variant={"ghost"}
                        className={cn("text-3xl rounded-full ")}
                        size={"icon"}
                        onClick={() => setIsActive?.(false)}
                    >
                        <X />
                    </Button>
                </div>
                {menuData.map((data, index) => {
                    return (
                        <div key={`${index}`} className="px-4 pt-2">
                            {data.group.map((value, index) => (
                                <DrawerItem
                                    key={`${value.key}-${index}`}
                                    title={t(value.key)}
                                    exact={value.exact}
                                    href={value.href}
                                    icon={value.icon}
                                    subItem={value.subItem}
                                />
                            ))}
                            {data.name === "titles" && (
                                <form action={randomManga}>
                                    <button className="px-4 active:bg-accent-2 hover:bg-drawer-accent transition-colors duration-300  capitalize text-sm  py-1 rounded gap-2 w-full flex items-center text-foreground">
                                        Random
                                    </button>
                                </form>
                            )}
                        </div>
                    );
                })}
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
                        "group-active:bg-accent-2 group-hover:bg-drawer-accent transition-colors duration-300 group-[&.active]:bg-primary group-[&.active]:text-primary-foreground"
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
