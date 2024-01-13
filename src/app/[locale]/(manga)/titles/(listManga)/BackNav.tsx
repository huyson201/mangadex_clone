"use client";
import BackNavigation from "@/components/BackNavigation/BackNavigation";
import { FOLLOW_URL, LATEST_LIST_URL, RECENTLY_LIST_URL } from "@/constants";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

type Props = {};
const data = [
    { url: RECENTLY_LIST_URL, title: "recently" },
    { url: LATEST_LIST_URL, title: "latest" },
    { url: FOLLOW_URL, title: "library" },
];
const BackNav = (props: Props) => {
    const pathname = usePathname();
    const t = useTranslations("listMangaTitles");
    const title = data.find((item) => pathname.startsWith(item.url))?.title;
    return <BackNavigation title={t(title) ?? ""} />;
};

export default BackNav;
