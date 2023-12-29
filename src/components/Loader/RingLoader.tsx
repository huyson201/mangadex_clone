import { cn } from "@/lib/utils";
import React from "react";

type Props = {
    className?: string;
};

const RingLoader = ({ className }: Props) => {
    return (
        <div className={cn("inline-block relative w-12 h-12", className)}>
            <div className=" box-border  w-full h-full m-2 border-transparent absolute border-4 border-t-foreground animate-loader-spin animate-delay-[-350ms] rounded-full"></div>
            <div className="box-border  w-full h-full m-2 border-transparent absolute border-4 border-t-foreground animate-loader-spin animate-delay-[-250ms] rounded-full"></div>
            <div className="box-border   w-full h-full m-2 border-transparent absolute border-4 border-t-foreground animate-loader-spin animate-delay-[-150ms] rounded-full"></div>
        </div>
    );
};

export default RingLoader;
