import createIntlMiddleware from "next-intl/middleware";
import { auth as middleware } from "./auth";
import { SIGN_IN_URL } from "./constants";
import { DEFAULT_LANG, LOCALES, LOCALE_PREFIX } from "./i18n.config";
const privateRoutes = ["/profile"];
export default middleware((request) => {
    const privatePathnameRegex = RegExp(
        `^(/(${LOCALES.join("|")}))?(${privateRoutes
            .flatMap((p) => (p === "/" ? ["", "/"] : p))
            .join("|")})/?$`,
        "i"
    );

    const isAuth = !!request.auth;
    const isPrivateRoute = privatePathnameRegex.test(request.nextUrl.pathname);

    if (isPrivateRoute && !isAuth) {
        const url = request.nextUrl.clone();
        url.searchParams.set("callbackUrl", request.nextUrl.pathname);
        url.pathname = `${SIGN_IN_URL}`;
        return Response.redirect(url);
    }
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
