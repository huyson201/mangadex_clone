export interface Tag {
    id: string;
    type: string;
    attributes: {
        name: { [key: string]: string; en: string };
        description: {
            [key: string]: string;
        };
        group: "content" | "format" | "genre" | "theme";
        version: number;
    };
    relationships: Relationship[];
}
export interface Relationship {
    id: string;
    type: string;
    related?:
        | "monochrome"
        | "main_story"
        | "adapted_from"
        | "based_on"
        | "prequel"
        | "side_story"
        | "doujinshi"
        | "same_franchise"
        | "shared_universe"
        | "sequel"
        | "spin_off"
        | "alternate_story"
        | "alternate_version"
        | "preserialization"
        | "colored"
        | "serialization";
    attributes?: any | null;
}
export interface Manga {
    id: string;
    type: string;
    attributes: {
        title: {
            [key: string]: string;
        };
        altTitles: {
            [key: string]: string;
        }[];
        description: { [key: string]: string };
        isLocked: boolean;
        links: { [key: string]: string };
        originalLanguage: string;
        lastVolume: string;
        lastChapter: string;
        publicationDemographic: "shounen" | "shoujo" | "josei" | "seinen";
        status: "completed" | "ongoing" | "cancelled" | "hiatus";
        year: number;
        contentRating: "safe" | "suggestive" | "erotica" | "pornographic";
        tags: Tag[];
        state: "draft" | "submitted" | "published" | "rejected";
        chapterNumbersResetOnNewVolume: boolean;
        createdAt: string;
        updatedAt: string;
        version: number;
        availableTranslatedLanguages: string[];
        latestUploadedChapter: string;
    };
    relationships: Relationship[];
}

export interface Cover {
    id: string;
    type: string;
    attributes: {
        description: string;

        volume: number;

        fileName: string;

        locale: string;

        createdAt: string;

        updatedAt: string;

        version: number;
    };
    relationships: Relationship[];
}

export interface Chapter {
    id: string;

    type: string;

    attributes: {
        volume: string | null;

        chapter: number;

        title: string | null;

        translatedLanguage: string;

        externalUrl: string | null;

        publishAt: string;

        readableAt: string;

        createdAt: string;

        updatedAt: string;

        pages: number;

        version: number;
    };
    relationships: Relationship[];
}
export interface MangaDexResponseSuccess<T> {
    result: string;
    response: string;
    data: T;
}
export interface Statistics {
    [key: string]: Statistic;
}

export interface Statistic {
    comments: {
        threadId: number;
        repliesCount: number;
    } | null;
    rating: {
        average: number;
        bayesian: number;
        distribution: {
            [key: number]: number;
        };
    } | null;
    follows: number | null;
}

export interface StatisticsResponse {
    result: string;
    statistics: Statistics;
}
export interface PaginationResponse<T> {
    result: "ok" | "error";
    response: string;
    data: T[];
    limit: number;
    offset: number;
    total: number;
}

export interface Author {
    id: string;
    type: string;
    attributes: {
        name: string;
        imageUrl: string | null;
        biography: any;
        twitter: string | null;
        pixiv: string | null;
        melonBook: string | null;
        fanBox: string | null;
        booth: string | null;
        nicoVideo: string | null;
        skeb: string | null;
        fantia: string | null;
        tumblr: string | null;
        youtube: string | null;
        weibo: string | null;
        naver: string | null;
        website: string | null;
        createdAt: string;
        updatedAt: string;
    };
    relationships: Relationship[];
}

const contentRating = [
    "safe",
    "suggestive",
    "erotica",
    "pornographic",
] as const;

export type ContentRating = (typeof contentRating)[number];

export interface AtHomeResponse {
    result: "ok" | "error";
    baseUrl: string;
    chapter: {
        hash: string;
        data: string[];
        dataSaver: string[];
    };
}
export const readingStatusData = [
    "none",
    "reading",
    "on hold",
    "dropped",
    "plan to read",
    "completed",
    "re-reading",
] as const;
export type ReadingStatus = (typeof readingStatusData)[number];
