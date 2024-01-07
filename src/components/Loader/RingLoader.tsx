import { cn } from "@/lib/utils";

type Props = {
    className?: string;
    color?: "default" | "primary";
};

const colors = {
    default: "border-t-foreground",
    primary: "border-t-primary",
};

const RingLoader = ({ className, color = "default" }: Props) => {
    const colorBorder = colors[color];
    return (
        <div className={cn("inline-block relative w-12 h-12", className)}>
            <div
                className={cn(
                    "box-border  w-full h-full m-2 border-transparent absolute border-4  animate-loader-spin animate-delay-[-350ms] rounded-full",
                    colorBorder
                )}
            ></div>
            <div
                className={cn(
                    "box-border  w-full h-full m-2 border-transparent absolute border-4  animate-loader-spin animate-delay-[-250ms] rounded-full",
                    colorBorder
                )}
            ></div>
            <div
                className={cn(
                    "box-border  w-full h-full m-2 border-transparent absolute border-4  animate-loader-spin animate-delay-[-150ms] rounded-full",
                    colorBorder
                )}
            ></div>
        </div>
    );
};

export default RingLoader;
