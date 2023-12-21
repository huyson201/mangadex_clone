import createIntlMiddleware from "next-intl/middleware";
import { DEFAULT_LANG, LOCALES, LOCALE_PREFIX } from "./i18n.config";
import { auth as middleware } from "./auth";

export default middleware((request) => {
    // Step 1: define default locale
    const defaultLocale = DEFAULT_LANG;
    // Step 2: Create and call the next-intl middleware (example)
    const handleI18nRouting = createIntlMiddleware({
        locales: LOCALES,
        defaultLocale,
        localePrefix: LOCALE_PREFIX,
    });

    const response = handleI18nRouting(request);

    // Step 3: Alter the response (example)
    response.headers.set("x-default-locale", defaultLocale);

    return response;
});

export const config = {
    // Matcher entries are linked with a logical "or", therefore
    // if one of them matches, the middleware will be invoked.
    matcher: ["/((?!api|_next|.*\\..*).*)"],
};
