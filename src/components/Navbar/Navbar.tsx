"use client";
import { MANGA_DETAIL_BASE_URL, READ_CHAPTER_URL } from "@/constants";
import { useChapterMenu } from "@/contexts/ChapterMenuContext";
import { useDrawerMenu } from "@/contexts/DrawerMenuContext";
import StackMenuProvider from "@/contexts/StackMenuContext";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import { cn, createRegexMathRoutesWithLocales } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import AccountMenu from "../AccountMenu/AccountMenu";
import HeadSearch from "../HeadSearch/HeadSearch";
import Logo from "../Logo/Logo";
import { Button } from "../ui/button";
type Props = {};
const Navbar = (props: Props) => {
    const drawerMenu = useDrawerMenu();
    const navbarBgRef = useRef<HTMLDivElement>(null);
    const navbarWrapper = useRef<HTMLDivElement>(null);
    const { headerType } = useChapterMenu();
    const pathname = usePathname();
    const matchReadChapterRoute = createRegexMathRoutesWithLocales([
        READ_CHAPTER_URL,
    ]).test(pathname);
    useEffect(() => {
        if (matchReadChapterRoute && headerType === "hidden") {
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
    }, [headerType, matchReadChapterRoute]);
    return (
        <div
            ref={navbarWrapper}
            className={cn(
                "h-[var(--navbar-height)]  group/navbar w-full fixed  top-0 left-0 z-[var(--navbar-index)]",
                matchReadChapterRoute && headerType === "hidden"
                    ? "relative"
                    : "fixed"
            )}
        >
            <div
                ref={navbarBgRef}
                className={cn(
                    "absolute  transition-opacity opacity-0 top-0 left-0 right-0 bottom-0 bg-background  ",
                    (!matchReadChapterRoute || headerType === "shown") &&
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
