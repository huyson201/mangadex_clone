import { getRequestConfig } from "next-intl/server";
import { LOCALES, TIME_ZONE } from "./i18n.config";
import { notFound } from "next/navigation";
export default getRequestConfig(async ({ locale }) => {
    if (!LOCALES.includes(locale as any)) notFound();
    return {
        messages: (await import(`./messages/${locale}.json`)).default,
        timeZone: TIME_ZONE,
        now: new Date(),
    };
});
