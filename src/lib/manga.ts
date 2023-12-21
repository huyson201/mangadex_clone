import { Chapter, Manga, Tag } from "../../types";
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
