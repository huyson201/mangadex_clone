"use client"
import Wrapper from '@/layouts/Wrapper/Wrapper';
import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType, } from 'swiper'
import { Autoplay } from 'swiper/modules'
import HeroSlide from './HeroSlide';
import { Button } from '../ui/button';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

type Props = {}

const HomeHero = (props: Props) => {
    const t = useTranslations('Home');
    const swiperRef = useRef<SwiperType>()
    const [slideIndex, setSlideIndex] = useState(0)
    return (
        <div className='relative'>
            <Wrapper className='text-foreground text-xl sm:text-2xl font-medium absolute z-[2]  w-full left-0 top-[calc(var(--navbar-height))]'>
                <h2>{t('titles.popular')}</h2>
            </Wrapper>
            <Swiper
                loop
                modules={[Autoplay]}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false
                }}
                onSlideChange={(swiper) => setSlideIndex(swiper.realIndex)}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper
                }}>
                <SwiperSlide >
                    <HeroSlide />
                </SwiperSlide>
                <SwiperSlide >
                    <HeroSlide />
                </SwiperSlide>
            </Swiper>
            <div className='w-full  md:w-auto absolute z-[1] bottom-0 md:mb-6 md:right-6 md:translate-y-1/4 flex items-center gap-4'>
                <span className={cn('hidden md:inline-block uppercase font-bold text-sm', { "text-primary": slideIndex === 0 })}>NO.{`${slideIndex + 1}` || "NaN"}</span>
                <div className='space-x-3 flex items-center justify-between md:block w-full px-[var(--side-margin)] md:px-0'>
                    <Button variant={"outline"} className='rounded-full text-xl md:w-10 md:h-10 ' size={"xs"} onClick={() => swiperRef.current?.slidePrev()}>
                        <FaAngleLeft />
                    </Button>
                    <span className='text-xs text-foreground md:hidden'>{slideIndex + 1} <span className='slash'>/</span> {swiperRef.current?.slides.length}</span>
                    <Button variant={"outline"} className='rounded-full text-xl md:w-10 md:h-10 ' size={"xs"} onClick={() => swiperRef.current?.slideNext()}>
                        <FaAngleRight />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HomeHero