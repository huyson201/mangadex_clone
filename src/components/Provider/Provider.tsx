"use client";

import DrawerMenuProvider from "@/contexts/DrawerMenuContext";
import HeadSearchProvider from "@/contexts/HeadSearchContext";
import { TIME_ZONE } from "@/i18n.config";
import {
    AbstractIntlMessages,
    NextIntlClientProvider,
    useMessages,
} from "next-intl";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth/types";
import { ChapterMenuProvider } from "@/contexts/ChapterMenuContext";
import { ThemeProvider } from "next-themes";
type Props = {
    children?: any;
    locale: string;
    messages?: AbstractIntlMessages;
    session?: Session | null;
};

const Provider = ({ session, locale, messages, children }: Props) => {
    return (
        <>
            <SessionProvider session={session}>
                <NextIntlClientProvider
                    locale={locale}
                    messages={messages}
                    timeZone={TIME_ZONE}
                >
                    <ChapterMenuProvider>
                        <HeadSearchProvider>
                            <DrawerMenuProvider>
                                <ThemeProvider
                                    attribute="class"
                                    themes={["light", "dark", "dracula"]}
                                    enableSystem
                                >
                                    {children}
                                </ThemeProvider>
                            </DrawerMenuProvider>
                        </HeadSearchProvider>
                    </ChapterMenuProvider>
                </NextIntlClientProvider>
            </SessionProvider>
        </>
    );
};

export default Provider;
