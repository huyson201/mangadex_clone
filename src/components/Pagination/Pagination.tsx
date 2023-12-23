"use client";
import usePagination from "@/hooks/usePagination";
import React from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import queryString from "query-string";

type Props = {
    className?: string;
    totalPage: number;
};

const Pagination = ({ className, totalPage }: Props) => {
    const searchParams = useSearchParams();
    const currentPage = +(searchParams.get("page") || 1);
    const pagination = usePagination(currentPage, totalPage);
    const query = queryString.parse(searchParams.toString());

    return (
        <div
            className={cn(
                "flex flex-wrap gap-y-1 w-full items-center justify-center gap-2",
                className
            )}
        >
            {currentPage > 1 && (
                <Link
                    href={{ query: { ...query, page: `${currentPage - 1}` } }}
                    className="h-10 w-10 rounded-full transition cursor-pointer active:bg-button-hover hover:bg-button-hover/30 [&.active]:bg-primary   flex items-center justify-center text-foreground font-medium"
                >
                    <ArrowLeft />
                </Link>
            )}

            {pagination.map((value, idx) => {
                if (typeof value === "string") {
                    return (
                        <div
                            key={`${value}-${idx}`}
                            className={cn(
                                "px-4    h-10 flex items-center justify-center text-foreground font-medium"
                            )}
                        >
                            {value}
                        </div>
                    );
                }
                return (
                    <Link
                        href={{
                            query: {
                                ...query,
                                page: value,
                            },
                        }}
                        key={`${value}-${idx}`}
                        className={cn(
                            "px-4 transition cursor-pointer active:bg-button-hover hover:bg-button-hover/30 rounded [&.active]:bg-primary  h-10 flex items-center justify-center text-foreground font-medium",
                            { active: currentPage === value }
                        )}
                    >
                        {value}
                    </Link>
                );
            })}
            {currentPage < totalPage && (
                <Link
                    href={{
                        query: { ...query, page: `${currentPage + 1}` },
                    }}
                    className="w-10 rounded-full transition cursor-pointer active:bg-button-hover hover:bg-button-hover/30  [&.active]:bg-primary  h-10 flex items-center justify-center text-foreground font-medium"
                >
                    <ArrowRight />
                </Link>
            )}
        </div>
    );
};

export default Pagination;
