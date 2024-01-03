"use client";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { Button } from "../ui/button";
import Link from "next/link";
import Logo from "../Logo/Logo";
import HeadSearch from "../HeadSearch/HeadSearch";
import { useDrawerMenu } from "@/contexts/DrawerMenuContext";
type Props = {};
import AccountMenu from "../AccountMenu/AccountMenu";
import StackMenuProvider from "@/contexts/StackMenuContext";
import { useChapterMenu } from "@/contexts/ChapterMenuContext";
import { usePathname } from "next/navigation";
import { MANGA_DETAIL_BASE_URL, READ_CHAPTER_URL } from "@/constants";
const Navbar = (props: Props) => {
    const drawerMenu = useDrawerMenu();
    const navbarBgRef = useRef<HTMLDivElement>(null);
    const navbarWrapper = useRef<HTMLDivElement>(null);
    const { headerType } = useChapterMenu();
    const pathname = usePathname();
    useEffect(() => {
        if (pathname.startsWith(READ_CHAPTER_URL) && headerType === "hidden") {
            if (!navbarBgRef.current) return;
            navbarBgRef.current.style.opacity = `1`;
            return;
        }

        const handleScroll = () => {
            if (!navbarBgRef.current) return;
            const displayPoint = 64;
            const opacity = Math.min(window.scrollY / displayPoint, 1).toFixed(
                1
            );

            if (+opacity < 0.5) {
                navbarWrapper.current?.classList.remove("scrolling");
            } else {
                navbarWrapper.current?.classList.add("scrolling");
            }
            navbarBgRef.current.style.opacity = opacity;
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [headerType, pathname]);
    return (
        <div
            ref={navbarWrapper}
            className={cn(
                "h-[var(--navbar-height)]  group/navbar w-full fixed  top-0 left-0 z-[var(--navbar-index)]",
                pathname.startsWith(READ_CHAPTER_URL) && headerType === "hidden"
                    ? "relative"
                    : "fixed"
            )}
        >
            <div
                ref={navbarBgRef}
                className={cn(
                    "absolute  transition-opacity opacity-0 top-0 left-0 right-0 bottom-0 bg-background  ",
                    (!pathname.startsWith(READ_CHAPTER_URL) ||
                        headerType === "shown") &&
                        "border-b border-primary"
                )}
            ></div>
            <Wrapper className={cn("flex items-center h-full relative z-[2]")}>
                <Button
                    variant={"ghost"}
                    size={"icon"}
                    className={cn(
                        "rounded-full text-2xl",
                        pathname.startsWith(`${MANGA_DETAIL_BASE_URL}/`) &&
                            "sm:group-[:not(.scrolling)]/navbar:text-white"
                    )}
                    onClick={() => drawerMenu.setIsActive?.(true)}
                >
                    <HiMiniBars3BottomLeft />
                </Button>
                <Link href={"/"} className="inline-block">
                    <Logo />
                </Link>
                <div className="flex-1 justify-end flex items-center gap-x-4">
                    <HeadSearch />
                    <StackMenuProvider>
                        <AccountMenu />
                    </StackMenuProvider>
                </div>
            </Wrapper>
        </div>
    );
};

export default Navbar;
