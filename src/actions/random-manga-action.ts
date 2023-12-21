"use server";

import { getDetailMangaLink } from "@/lib/manga";
import { getRandomManga } from "@/services/mangadex";
import { redirect } from "next/navigation";

export const randomManga = async () => {
    const manga = await getRandomManga();
    redirect(getDetailMangaLink(manga!.data));
};
