"use client"

import DrawerMenuProvider from '@/contexts/DrawerMenuContext'
import HeadSearchProvider from '@/contexts/HeadSearchContext'
import { TIME_ZONE } from '@/i18n.config'
import { AbstractIntlMessages, NextIntlClientProvider, useMessages } from 'next-intl'
import React from 'react'

type Props = {
    children?: any,
    locale: string,
    messages?: AbstractIntlMessages
}

const Provider = ({ locale, messages, children }: Props) => {
    return (
        <>

            <NextIntlClientProvider
                locale={locale}
                messages={messages}
                timeZone={TIME_ZONE}
            >
                <HeadSearchProvider>
                    <DrawerMenuProvider>
                        {children}
                    </DrawerMenuProvider>
                </HeadSearchProvider>
            </NextIntlClientProvider>
        </>
    )
}

export default Provider

