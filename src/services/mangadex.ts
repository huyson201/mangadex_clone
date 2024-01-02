import queryString from "query-string";
import {
    AtHomeResponse,
    Author,
    Chapter,
    ContentRating,
    Cover,
    Manga,
    MangaDexResponseSuccess,
    PaginationResponse,
    StatisticsResponse,
    Tag,
} from "../../types";
import { getCurrentSeasonTimeString, getTimeAgo } from "@/lib/utils";

export const base_url = "https://api.mangadex.org/";
const chapterIncludesOption = ["manga", "scanlation_group", "user"] as const;
type ChapterIncludesOpts = (typeof chapterIncludesOption)[number];
type MangaAggregateResponse = {
    result: string;
    volumes: {
        [key: string | number]: {
            volume: string;
            count: number;
            chapters: {
                [key: string | number]: {
                    chapter: string;
                    id: string;
                    other: string[];
                    count: number;
                };
            };
        };
    };
};

type IncludeOption =
    | "artist"
    | "cover_art"
    | "author"
    | "tag"
    | "creator"
    | "manga";
interface GetMangaOption {
    order: string;
    authors: string[];
    artists: string[];
    year: number;
    includedTags: string[];
    excludedTags: string[];
    status: string[];
    publicationDemographic: string[];
    includes: IncludeOption[];
    offset: number;
    limit: number;
    title: string;
    authorOrArtist: string;
    includedTagsMode: string;
    excludedTagsMode: string;
    ids: string[];
    createdAtSince: string;
    updatedAtSince: string;
    hasAvailableChapters: boolean | 0 | 1;
    group: string;
    availableTranslatedLanguage: string[];
    originalLanguage: string[];
    excludedOriginalLanguage: string[];
}

type GetChaptersOptions = {
    limit: number;
    offset: number;
    ids: string[];
    title: string;
    groups: string[];
    manga: string;
    volume: string[];
    chapter: string | string[];
    translatedLanguage: string[];
    originalLanguage: string[];
    excludedOriginalLanguage: string[];
    includeEmptyPages: 0 | 1;
    includeFuturePublishAt: 0 | 1;
    includeExternalUrl: 0 | 1;
    createdAtSince: string;
    updatedAtSince: string;
    publishAtSince: string;
    includes: ("manga" | "user" | "scanlation_group")[];
    order:
        | "createdAt.desc"
        | "createdAt.asc"
        | "updatedAt.desc"
        | "updatedAt.asc"
        | "publishAt.desc"
        | "publishAt.asc"
        | "chapter.asc"
        | "chapter.desc"
        | "volume.desc"
        | "volume.asc"
        | "readableAt.desc"
        | "readableAt.asc";
};
export const getMangaList = async (options: Partial<GetMangaOption>) => {
    const order = options?.order || "";
    const [field, value] = order?.split(".");
    const url = queryString.stringifyUrl(
        {
            url: `${base_url}manga`,
            query: {
                ...(options as any),
                [`order[${field}]`]: value,
                order: undefined,
            },
        },
        { arrayFormat: "bracket", skipNull: true, skipEmptyString: true }
    );

    try {
        const result = await fetch(url, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
            cache: "no-cache",
        });

        let jsonData = await result.json();

        if (!result.ok) {
            console.log(jsonData);
            throw new Error("Something error");
        }

        return jsonData as PaginationResponse<Manga>;
    } catch (error) {
        throw error;
    }
};
export const getTags = async () => {
    const url = `${base_url}/manga/tag`;
    try {
        const result = await fetch(url, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
            next: {
                revalidate: 3600,
            },
        });

        let jsonData = await result.json();

        if (!result.ok) {
            console.log(jsonData);
            throw new Error("Something error");
        }

        return jsonData as PaginationResponse<Tag>;
    } catch (error) {
        throw error;
    }
};
export const getPopularManga = async (includes?: IncludeOption[]) => {
    const currentYear = new Date().getFullYear();
    const formattedDateTime: string = getTimeAgo(7);
    return getMangaList({
        year: currentYear,
        updatedAtSince: formattedDateTime,
        order: "followedCount.desc",
        includes: includes,
    });
};
export const getRecentlyAddedMangaList = async (
    limit = 10,
    offset = 0,
    includes?: IncludeOption[]
) => {
    const formattedDateTime: string = getTimeAgo(5);
    try {
        return getMangaList({
            limit: limit,
            offset: offset,
            createdAtSince: formattedDateTime,
            includes: includes,
        });
    } catch (error) {
        throw error;
    }
};
export const getRandomManga = async () => {
    const url = `${base_url}/manga/random`;
    try {
        const result = await fetch(url, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
            cache: "no-cache",
        });

        let jsonData = await result.json();

        if (!result.ok) {
            if (result.status === 404) return null;
            throw new Error("Something error");
        }

        return jsonData as MangaDexResponseSuccess<Manga>;
    } catch (error) {
        throw error;
    }
};
export const getSeasonalMangaList = async (
    limit = 10,
    offset = 0,
    includes?: IncludeOption[]
) => {
    const currentSeasonal = getCurrentSeasonTimeString();
    return getMangaList({
        limit: limit,
        offset: offset,
        hasAvailableChapters: 1,
        updatedAtSince: currentSeasonal,
        includes: includes,
    });
};
export const getMangaById = async (id: string, includes?: IncludeOption[]) => {
    const url = queryString.stringifyUrl(
        {
            url: `${base_url}manga/${id}`,
            query: {
                includes: includes,
            },
        },
        {
            arrayFormat: "bracket",
            skipNull: true,
            skipEmptyString: true,
        }
    );

    try {
        const result = await fetch(url, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
            // cache: "no-cache",
        });

        let jsonData = await result.json();

        if (!result.ok) {
            if (result.status === 404) return null;
            throw new Error("Something error");
        }

        const resultData = jsonData as MangaDexResponseSuccess<Manga>;

        return {
            result: resultData,
        };
    } catch (error) {
        throw error;
    }
};
export const advancedSearch = async (
    key?: string,
    options?: Partial<GetMangaOption>
) => {
    return getMangaList({ ...options, title: key });
};
export const getLatestUpdateList = async (
    offset = 0,
    limit = 32,
    includes?: ("manga" | "user" | "scanlation_group")[]
) => {
    const includesQuery = includes
        ? includes.map((value) => `includes[]=${value}`).join("&")
        : null;
    const url = ` https://api.mangadex.org/chapter?order[updatedAt]=desc&limit=${limit}&offset=${offset}&includeEmptyPages=0${
        includesQuery ? `&${includesQuery}` : ""
    }`;

    try {
        const result = await fetch(url, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
            cache: "no-cache",
        });

        let jsonData = await result.json();

        if (!result.ok) {
            console.log(jsonData);
            throw new Error("Something error");
        }

        return jsonData as PaginationResponse<Chapter>;
    } catch (error) {
        throw error;
    }
};
export const getHomeLatestUpdate = async () => {
    try {
        const result = await getMangaList({
            limit: 12,
            offset: 0,
            hasAvailableChapters: 1,
            includes: ["artist", "author", "cover_art", "creator"],
        });
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const getStatisticsList = async (
    type: "chapter" | "manga" | "group",
    ids: string[]
) => {
    const url = queryString.stringifyUrl(
        {
            url: `${base_url}statistics/${type}`,
            query: {
                [type]: ids,
            },
        },
        {
            arrayFormat: "bracket",
        }
    );
    const result = await fetch(url, {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
        cache: "no-cache",
    });

    let jsonData = await result.json();

    if (!result.ok) {
        console.log(jsonData);
        throw new Error("Something error");
    }

    return jsonData as StatisticsResponse;
};
export const findAuthorsOrArtist = async (
    name: string,
    ids?: string[],
    offset = 0,
    limit = 10
) => {
    const url = queryString.stringifyUrl(
        {
            url: `${base_url}author`,
            query: {
                name,
                offset,
                limit,
                ids,
            },
        },
        { arrayFormat: "bracket", skipEmptyString: true, skipNull: true }
    );
    try {
        const result = await fetch(url, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
            cache: "no-cache",
        });

        let jsonData = await result.json();

        if (!result.ok) {
            if (result.status === 404) return null;
            throw new Error("Something error");
        }

        return jsonData as PaginationResponse<Author>;
    } catch (error) {
        throw error;
    }
};

export const getCoverArt = async (coverId: string) => {
    const url = `${base_url}/cover/${coverId}`;
    try {
        const result = await fetch(url, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        });

        let jsonData = await result.json();
        return jsonData as MangaDexResponseSuccess<Cover>;
    } catch (error) {
        throw error;
    }
};

export const getCovers = async (coverIds: string[]) => {
    const queryString = coverIds.map((id) => `ids[]=${id}`).join("&");
    const url = `${base_url}/cover?${queryString}`;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        });

        const jsonData = await response.json();
        if (!response.ok) throw new Error("Something error!");

        return jsonData.data as Cover[];
    } catch (error) {
        throw error;
    }
};

export const getImageUrl = (
    width: "512" | "256" | "full",
    mangaId: string,
    filename: string
) => {
    const fileOpt = width === "full" ? filename : `${filename}.${width}.jpg`;
    return `https://uploads.mangadex.org/covers/${mangaId}/${fileOpt}`;
};

export const getChapter = async (
    chapterId: string,
    includes?: ("manga" | "scanlation_group" | "user")[]
) => {
    const includesQuery = includes
        ? includes.map((value) => `includes[]=${value}`).join("&")
        : null;
    const url = `${base_url}/chapter/${chapterId}${
        includesQuery ? `?${includesQuery}` : ""
    }`;
    try {
        const result = await fetch(url, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
            cache: "no-cache",
        });

        let jsonData = await result.json();

        if (!result.ok) {
            console.log(jsonData);
            throw new Error("Something error");
        }

        const resultData = jsonData as MangaDexResponseSuccess<Chapter>;

        return {
            result: resultData,
        };
    } catch (error) {
        throw error;
    }
};

export const getStatistics = async (
    type: "chapter" | "manga" | "group",
    id: string
) => {
    const url = `${base_url}/statistics/${type}/${id}`;

    const result = await fetch(url, {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
        next: {
            revalidate: 3600,
        },
    });

    let jsonData = await result.json();

    if (!result.ok) {
        console.log(jsonData);
        throw new Error("Something error");
    }

    const resultData = jsonData as StatisticsResponse;

    return {
        result: resultData,
    };
};

interface MangaFeedOption {
    limit: number;
    offset: number;
    translatedLanguage: string[];
    originalLanguage: string[];
    excludedOriginalLanguage: string[];
    contentRating: ContentRating[];
    excludedGroups: string[];
    excludedUploaders: string[];
    includeFutureUpdates: 0 | 1;
    createdAtSince: string;
    updatedAtSince: string;
    publishAtSince: string;
    includes: ChapterIncludesOpts[];
    includeEmptyPages: 0 | 1;
    includeFuturePublishAt: 0 | 1;
    includeExternalUrl: 0 | 1;
    order:
        | "createdAt.desc"
        | "createdAt.asc"
        | "updatedAt.desc"
        | "updatedAt.asc"
        | "volume.desc"
        | "volume.asc"
        | "chapter.desc"
        | "chapter.asc";
}

export const getMangaFeed = async (
    mangaId: string,
    options: Partial<MangaFeedOption>
) => {
    const order = options?.order || "";
    const [field, value] = order?.split(".");
    const url = queryString.stringifyUrl(
        {
            url: `${base_url}manga/${mangaId}/feed`,
            query: { ...options, [`order[${field}]`]: value, order: undefined },
        },
        {
            arrayFormat: "bracket",
            skipEmptyString: true,
            skipNull: true,
        }
    );

    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
            next: {
                revalidate: 3600,
            },
        });

        let jsonData = await res.json();
        return jsonData as PaginationResponse<Chapter>;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAtHome = async (chapterId: string, forcePort443?: boolean) => {
    const url = queryString.stringifyUrl({
        url: `${base_url}at-home/server/${chapterId}`,
        query: { forcePort443 },
    });
    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
            next: {
                revalidate: 3600,
            },
        });
        let jsonData = await res.json();
        if (!res.ok) {
            console.log(jsonData);
            throw new Error("Something error!");
        }

        return jsonData as AtHomeResponse;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getMangaAggregate = async (
    mangaId: string,
    options?: {
        translatedLanguage?: string[];
        groups?: string[];
    }
) => {
    const url = queryString.stringifyUrl(
        {
            url: `${base_url}manga/${mangaId}/aggregate`,
            query: options,
        },
        { arrayFormat: "bracket", skipNull: true, skipEmptyString: true }
    );

    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
            next: {
                revalidate: 3600,
            },
        });

        let jsonData = await res.json();
        if (!res.ok) {
            console.log(jsonData);
            throw new Error("Something error!");
        }

        return jsonData as MangaAggregateResponse;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getChapters = async (opts?: Partial<GetChaptersOptions>) => {
    const order = opts?.order || "";
    const [field, value] = order?.split(".");
    const url = queryString.stringifyUrl(
        {
            url: `${base_url}chapter`,
            query: {
                ...opts,
                order: undefined,
                [`order[${field}]`]: value,
            },
        },
        { arrayFormat: "bracket", skipEmptyString: true, skipNull: true }
    );

    try {
        const result = await fetch(url, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
            cache: "no-cache",
        });

        let jsonData = await result.json();

        if (!result.ok) {
            console.log(jsonData);
            throw new Error("Something error");
        }

        return jsonData as PaginationResponse<Chapter>;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
