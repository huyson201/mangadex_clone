import Image from "next/image";
import React from "react";
import logo from "@/assets/favicon.svg";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import Link from "next/link";
import LogoText from "@/assets/logo-text.svg";
import { cn } from "@/lib/utils";

type Props = {
    children: React.ReactNode;
};

const layout = ({ children }: Props) => {
    return (
        <div className="relative bg-[#111] pb-8 min-h-screen w-full">
            <div className="w-[500px] hidden md:block left-0 h-[500px] bg-[url(../../assets/mdex-login-key.png)] bg-cover absolute bottom-0"></div>
            <Wrapper className="pt-16 sm:px-8">
                <Link
                    href={"/"}
                    className="group flex gap-4 items-center justify-center"
                >
                    <Image src={logo} alt="logo" />
                    <span
                        className="relative inline-block font-semibold text-3xl
                    group-hover:after:absolute group-hover:after:bottom-0 group-hover:after:left-0 
                    group-hover:after:w-full group-hover:after:h-0.5 group-hover:after:bg-[#ff6740]"
                    >
                        <div className="relative z-[2]">
                            <Image
                                className={cn("logo w-[140px] filter invert")}
                                src={LogoText}
                                alt="logo-text"
                            />
                        </div>
                    </span>
                </Link>
                <div className="md:max-w-[500px] mx-auto relative md:border-t-4 border-[#ff6740] bg-[#212328] mt-14 rounded px-5 pt-2.5 md:px-10 md:pt-5 pb-[30px]">
                    {children}
                </div>
            </Wrapper>
        </div>
    );
};

export default layout;
