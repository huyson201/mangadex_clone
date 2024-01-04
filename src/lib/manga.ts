import { READ_CHAPTER_URL, TAG_BASE_URL } from "@/constants";
import flags from "@/data/flag.json";
import { MangaAggregateResponse } from "@/services/mangadex";
import { Chapter, Manga, Tag } from "../types";
import { slugify } from "./utils";

export const getMangaTitle = (manga: Manga, locale = "en") => {
    return (
        manga.attributes.title[locale] ||
        Object.values(manga.attributes.title)[0]
    );
};

export const getDetailMangaLink = (manga: Manga) => {
    return `/title/${manga.id}/${slugify(getMangaTitle(manga))}`;
};

export const getDetailChapterLink = (chapter: Chapter) => {
    const hasExternalUrl = !!chapter.attributes.externalUrl;
    const hasPages = chapter.attributes.pages > 0;
    let link = "#";
    if (hasPages) {
        link = `${READ_CHAPTER_URL}/${chapter.id}`;
    }

    if (!hasPages && hasExternalUrl) {
        link = chapter.attributes.externalUrl || "#";
    }

    return link;
};
export const getCoverArtFromManga = (manga: Manga) => {
    return manga.relationships.find(
        (relation) => relation.type === "cover_art"
    );
};
export const getChapterTitle = (chapter: Chapter) => {
    const volume = `${
        chapter.attributes.volume ? `Vol. ${chapter.attributes.volume} ` : ""
    }`;
    const chapterNumber = `${
        chapter.attributes.chapter
            ? `Ch. ${chapter.attributes.chapter}`
            : "Oneshot"
    }`;
    const chapterTitle = `${
        chapter.attributes.title ? ` - ${chapter.attributes.title}` : ""
    }`;
    return `${volume}${chapterNumber}${chapterTitle}`;
};

export const getTagName = (tag: Tag, locale = "en") => {
    return tag.attributes.name[locale] || Object.values(tag.attributes.name)[0];
};

export const getDataByLocale = (object: any, locale = "en") => {
    return object[locale] || Object.values(object)[0];
};

export const getTagsWithGroupContent = (tags: Tag[]) => {
    return tags.filter((tag) => tag.attributes.group === "content");
};

export const getLangFlagUrl = <T = string | string[]>(
    code: T
): T extends string[] ? string[] : string | undefined => {
    if (Array.isArray(code)) {
        return flags
            .filter((value) => code.includes(value.code))
            .map((value) => value.flag) as T extends string[]
            ? string[]
            : string | undefined;
    }
    return flags.find((value) => value.code === code)
        ?.flag as T extends string[] ? string[] : string | undefined;
};

const readOrBuyLinkKey = ["raw", "engtl", "bw", "amz", "ebj", "cdj"] as const;
const trackKey = ["mu", "ap", "al", "kt", "mal", "nu"] as const;
const trackBaseUrls = {
    mu: "https://www.mangaupdates.com/series.html?id=",
    ap: "https://www.anime-planet.com/manga/",
    al: "https://anilist.co/manga/",
    kt: "https://kitsu.io/api/edge/manga/",
    mal: "https://myanimelist.net/manga/",
    nu: "https://www.novelupdates.com/series/",
    bw: "https://bookwalker.jp/`{slug}`",
};
const linkNames = {
    raw: "Office Raw",
    engtl: "Office English",
    bw: "Book☆Walker",
    amz: "Amazon",
    ebj: "eBookJapan",
    cdj: "CDJapan",
    mu: "MangaUpdates",
    ap: "Anime-Planet",
    al: "AniList",
    kt: "Kitsu",
    mal: "MyAnimeList",
    nu: "NovelUpdates",
};
export const getStatisticsLink = (links: Record<string, string>) => {
    const readOrBuy = readOrBuyLinkKey
        .map((key) => ({
            key,
            link: key === "bw" ? `${trackBaseUrls}${links[key]}` : links[key],
            name: linkNames[key],
        }))
        .filter((value) => !!value.link);
    const track = trackKey
        .map((key) => ({
            key,
            link: `${trackBaseUrls}${links[key]}`,
            name: linkNames[key],
        }))
        .filter((value) => !!value.link);
    return { readOrBuy, track };
};

export const createTagLink = (tag: Tag) => {
    return `${TAG_BASE_URL}/${tag.id}/${slugify(getTagName(tag))}`;
};

export const getPrevAndNextChapter = (
    currentChapterId: string,
    aggregate?: MangaAggregateResponse
) => {
    let prevChapter: string | undefined;
    let nextChapter: string | undefined;

    if (aggregate) {
        const volumes = Object.values(aggregate.volumes);
        const chapters = volumes.reduce(
            (
                prev: {
                    chapter: string;
                    id: string;
                    other: string[];
                    count: number;
                }[],
                volume
            ) => {
                prev = [...prev, ...Object.values(volume.chapters)];
                return prev;
            },
            []
        );

        const currentChapterIndex = chapters.findIndex(
            (item) => item.id === currentChapterId
        );
        prevChapter = chapters[currentChapterIndex - 1]?.id;
        nextChapter = chapters[currentChapterIndex + 1]?.id;
    }
    return {
        prevChapter,
        nextChapter,
    };
};
