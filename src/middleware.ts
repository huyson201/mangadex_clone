import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { DEFAULT_LANG, LOCALES, LOCALE_PREFIX } from "./i18n.config";

export default async function middleware(request: NextRequest) {
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
}

export const config = {
  // Matcher entries are linked with a logical "or", therefore
  // if one of them matches, the middleware will be invoked.
  matcher: [
    "/", // Make sure the root of your base path is matched
    "/((?!api|_next|_vercel|.*\\..*).*)",
    // Match all pathnames within `/users`, optionally with a locale prefix
  ],
};
