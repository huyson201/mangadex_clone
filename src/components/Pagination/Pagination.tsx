"use client";
import usePagination from "@/hooks/usePagination";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link, { LinkProps } from "next/link";
import queryString from "query-string";

type Props = {
    className?: string;
    totalPage: number;
} & (
    | {
          asLink: true;
          defaultCurrent?: never;
          onChange?: never;
      }
    | {
          asLink?: never;
          defaultCurrent: number;
          onChange: (page: number) => void;
      }
);

const Pagination = ({
    className,
    totalPage,
    defaultCurrent,
    asLink,
    onChange,
}: Props) => {
    const searchParams = useSearchParams();
    const [currentPageState, setCurrentPageState] = useState(
        defaultCurrent || 1
    );
    const currentPage = +(searchParams.get("page") || 1);
    const pagination = usePagination(
        asLink ? currentPage : currentPageState,
        totalPage
    );
    const query = queryString.parse(searchParams.toString());

    const Comp = asLink ? Link : "span";

    const showPrev = asLink ? currentPage > 1 : currentPageState > 1;
    const showNext = asLink
        ? currentPage < totalPage
        : currentPageState < totalPage;
    const handleOnchange = (page: number) => {
        setCurrentPageState(page);
        onChange?.(page);
    };

    return (
        <div
            className={cn(
                " flex-wrap gap-y-1 w-full items-center justify-center gap-2",
                totalPage === 1 ? "hidden" : "flex",
                className
            )}
        >
            {showPrev && (
                <Comp
                    {...(asLink
                        ? {
                              href: {
                                  query: {
                                      ...query,
                                      page: `${currentPage - 1}`,
                                  },
                              },
                          }
                        : ({
                              onClick: () =>
                                  handleOnchange(currentPageState - 1),
                          } as any))}
                    className="h-10 w-10 rounded-full transition cursor-pointer active:bg-button-accent hover:bg-button-accent/30 [&.active]:bg-primary [&.active]:text-primary-foreground   flex items-center justify-center text-foreground font-medium"
                >
                    <ArrowLeft />
                </Comp>
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
                    <Comp
                        {...(asLink
                            ? {
                                  href: {
                                      query: {
                                          ...query,
                                          page: value,
                                      },
                                  },
                              }
                            : ({
                                  onClick: () => handleOnchange(value),
                              } as any))}
                        key={`${value}-${idx}`}
                        className={cn(
                            "px-4 transition cursor-pointer active:bg-button-accent hover:bg-button-accent/30 rounded [&.active]:bg-primary [&.active]:text-primary-foreground  h-10 flex items-center justify-center text-foreground font-medium",
                            {
                                active: asLink
                                    ? currentPage === value
                                    : currentPageState === value,
                            }
                        )}
                    >
                        {value}
                    </Comp>
                );
            })}
            {showNext && (
                <Comp
                    {...(asLink
                        ? {
                              href: {
                                  query: {
                                      ...query,
                                      page: `${currentPage + 1}`,
                                  },
                              },
                          }
                        : ({
                              onClick: () =>
                                  handleOnchange(currentPageState - 1),
                          } as any))}
                    className="w-10 rounded-full transition cursor-pointer active:bg-button-accent hover:bg-button-accent/30  [&.active]:bg-primary [&.active]:text-primary-foreground  h-10 flex items-center justify-center text-foreground font-medium"
                >
                    <ArrowRight />
                </Comp>
            )}
        </div>
    );
};

export default Pagination;
