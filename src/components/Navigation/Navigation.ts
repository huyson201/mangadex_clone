import { LOCALE_PREFIX } from "./../../i18n.config";
import { LOCALES } from "@/i18n.config";
import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from "next-intl/navigation";

export const locales = [...LOCALES] as const;
export const localePrefix = LOCALE_PREFIX; // Default
// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
export const pathnames = {
  "/": "/",
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
