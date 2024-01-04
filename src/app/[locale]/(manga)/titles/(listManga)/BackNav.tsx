"use client";
import BackNavigation from "@/components/BackNavigation/BackNavigation";
import { FOLLOW_URL, LATEST_LIST_URL, RECENTLY_LIST_URL } from "@/constants";
import { usePathname } from "next/navigation";

type Props = {};
const data = [
    { url: RECENTLY_LIST_URL, title: "Recently Added" },
    { url: LATEST_LIST_URL, title: "Latest Updates" },
    { url: FOLLOW_URL, title: "Library" },
];
const BackNav = (props: Props) => {
    const pathname = usePathname();
    const title = data.find((item) => pathname.startsWith(item.url))?.title;
    return <BackNavigation title={title ?? ""} />;
};

export default BackNav;
