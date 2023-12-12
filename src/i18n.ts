import { getRequestConfig } from "next-intl/server";
import { TIME_ZONE } from "./i18n.config";

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
  timeZone: TIME_ZONE,
  now: new Date(),
}));
