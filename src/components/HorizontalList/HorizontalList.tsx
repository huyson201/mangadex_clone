"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel } from "swiper/modules";
import "swiper/css/pagination";
import HorizontalListItem from "./HorizontalListItem";
import { cn } from "@/lib/utils";
import { Manga } from "../../types";

type Props = {
    slideClassName?: string;
    mangaList: Manga[];
    imageClassName?: string;
};

const HorizontalList = ({
    mangaList,
    slideClassName,
    imageClassName,
}: Props) => {
    return (
        <Swiper
            className="sm:pb-8 px-[var(--side-margin)]"
            slidesPerView={"auto"}
            pagination={{
                dynamicBullets: true,
                clickable: true,
            }}
            modules={[Pagination]}
            loop
        >
            {mangaList.map((manga, index) => (
                <SwiperSlide
                    key={manga.id}
                    className={cn(
                        "w-32  sm:w-full  max-w-[192px] mr-5",
                        slideClassName
                    )}
                >
                    <HorizontalListItem
                        manga={manga}
                        className={imageClassName}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default HorizontalList;
