import Image from "next/image";
import React from "react";
import logo from "@/assets/favicon.svg";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import Link from "next/link";
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
                    <span className="group-hover:underline  decoration-[#ff6740] font-semibold text-[2rem]">
                        MangaDex
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
