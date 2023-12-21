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
const Navbar = (props: Props) => {
    const drawerMenu = useDrawerMenu();
    const navbarBgRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleScroll = () => {
            if (!navbarBgRef.current) return;
            const displayPoint = 64;
            const opacity = Math.min(window.scrollY / displayPoint, 1).toFixed(
                1
            );
            navbarBgRef.current.style.opacity = opacity;
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <div className="h-[var(--navbar-height)] w-full fixed top-0 left-0 z-[var(--navbar-index)]">
            <div
                ref={navbarBgRef}
                className="absolute transition-opacity opacity-0 top-0 left-0 right-0 bottom-0 bg-background border-b border-primary"
            ></div>
            <Wrapper className={cn("flex items-center h-full relative z-[2]")}>
                <Button
                    variant={"outline"}
                    size={"icon"}
                    className="rounded-full text-2xl"
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
