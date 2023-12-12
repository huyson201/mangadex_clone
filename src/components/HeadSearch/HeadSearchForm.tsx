"use client"
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { CiSearch } from "react-icons/ci";
import { Button } from '../ui/button';
import { IoClose } from "react-icons/io5";
import { useHeadSearch } from '@/contexts/HeadSearchContext';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
type Props = {
    onFocus?: () => void,
    onBlur?: () => void
}

const HeadSearchForm = ({ onFocus, onBlur }: Props) => {
    const headSearchState = useHeadSearch()
    const t = useTranslations("search")
    const focusHandle = () => {
        onFocus?.()
        headSearchState.setIsActive?.(true)
    }


    return (
        <form className={cn('relative  z-[var(--head-search-index)] flex items-center gap-2', headSearchState.isActive ? "w-[calc(100%_-_var(--side-margin)_*_2)] md:w-full" : "w-full")}>
            <Input onFocus={focusHandle} className='peer rounded-lg px-4 py-1 w-full ' backgroundFilter={!headSearchState.isActive ? "blur" : null} type='text' placeholder={t('placeholder')} />
            <div
                className={cn('inline-block absolute pointer-events-none top-2/4 -translate-y-2/4   md:translate-x-0 md:right-2 text-xl',
                    headSearchState.isActive ? "right-11" : 'right-2/4 translate-x-2/4')}>
                <CiSearch />
            </div>
            <Button
                type='button'
                variant={"outline"}
                className={cn('text-xl ', headSearchState.isActive ? "md:hidden flex" : "hidden")}
                size={"xs"}
                onClick={() => headSearchState.setIsActive?.(false)}>
                <IoClose />
            </Button>
        </form>

    )
}

export default HeadSearchForm