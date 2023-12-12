"use client"
import React, { useState } from 'react'
import HeadSearchForm from './HeadSearchForm'
import { cn } from '@/lib/utils'
import { useHeadSearch } from '@/contexts/HeadSearchContext'
import Backdrop from '../Backdrop/Backdrop'
import { useTranslations } from 'next-intl'


type Props = {}

function HeadSearch({ }: Props) {
    const headSearchState = useHeadSearch()
    const t = useTranslations("search")

    return (
        <div className={cn('w-8 md:w-[300px] md:transition-all', headSearchState.isActive && "bg-background left-0 w-full h-full flex items-center justify-center md:justify-end absolute md:relative md:bg-transparent md:block md:h-auto md:w-[80%] ")}>
            <HeadSearchForm />
            <div className={cn('bg-background max-h-0 md:translate-y-1 z-[var(--head-search-index)] px-6 md:px-4 py-4 rounded-br-lg rounded-bl-lg md:rounded-tl-lg md:rounded-tr-lg absolute top-full right-0 w-0 hidden transition-all', headSearchState.isActive && "block w-full max-h-[90vh]")}>
                <div>{t('resultDefault')}</div>
            </div>
            <Backdrop className='top-[var(--navbar-height)] md:top-0' show={headSearchState.isActive} onClick={() => headSearchState.setIsActive?.(false)} />
        </div>
    )
}

export default HeadSearch