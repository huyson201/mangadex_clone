"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Mousewheel } from 'swiper/modules';
import 'swiper/css/pagination';
import HorizontalListItem from './HorizontalListItem';
import { cn } from '@/lib/utils';

type Props = {
    slideClassName?: string
}

const HorizontalList = ({ slideClassName }: Props) => {
    return (
        <Swiper
            className='sm:pb-8 px-[var(--side-margin)]'
            slidesPerView={'auto'}
            pagination={{
                dynamicBullets: true,
                clickable: true
            }}
            modules={[Pagination]}
            loop
        >
            {
                Array.from({ length: 10 }).map((_, index) => (
                    <SwiperSlide key={`${index}`} className={cn('w-32 sm:w-full  max-w-[192px] mr-5', slideClassName)}>
                        <HorizontalListItem />
                    </SwiperSlide>
                ))
            }


        </Swiper>
    )
}

export default HorizontalList