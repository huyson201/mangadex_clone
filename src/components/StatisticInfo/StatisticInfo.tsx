import React from "react";
import { ClassValue } from "clsx";
import { Bookmark, Eye, MessageSquare, Star } from "lucide-react";
import { Statistic } from "../../types";
import { cn, formatNumber } from "@/lib/utils";

type Props = {
    className?: ClassValue;
    statistics?: Statistic;
};

const StatisticInfo = ({ className, statistics }: Props) => {
    return (
        <div
            className={cn(
                "flex mt-auto sm:mt-3  gap-2 items-center sm:text-base text-sm",
                className
            )}
        >
            <span className="flex items-center gap-1 text-primary ">
                <Star size={16} />
                {statistics?.rating?.bayesian?.toFixed(2) ||
                    statistics?.rating?.average?.toFixed(2)}
            </span>
            <span className="flex items-center gap-1 text-foreground  ">
                <Bookmark size={16} />
                {formatNumber(statistics?.follows || 0) || ""}
            </span>
            <span className="flex items-center gap-1 text-foreground  ">
                <MessageSquare size={16} />
                {formatNumber(statistics?.comments?.repliesCount || 0) || 0}
            </span>
            <span className="flex items-center gap-1 text-foreground  opacity-40">
                <Eye size={20} />
                N/A
            </span>
        </div>
    );
};

export default StatisticInfo;
