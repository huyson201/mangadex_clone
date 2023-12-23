import queryString from "query-string";
import {
    Author,
    Chapter,
    Cover,
    Manga,
    MangaDexResponseSuccess,
    PaginationResponse,
    StatisticsResponse,
    Tag,
} from "../../types";
import { getCurrentSeasonTimeString, getTimeAgo } from "@/lib/utils";

export const base_url = "https://api.mangadex.org/";

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
interface GetMangaOpts {
    includes: IncludeOption[];
}
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
    const currentSeasonal = getCurrentSeasonTimeString();

    return getMangaList({
        year: currentYear,
        updatedAtSince: currentSeasonal,
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
export const getLatestUpdate = async (
    limit = 10,
    offset = 0,
    includes?: IncludeOption[]
) => {
    includes ??= ["artist", "author", "cover_art", "creator"];

    const url = `${base_url}/manga?limit=${limit}&offset=${offset}&hasAvailableChapters=1&${includes
        .map((opt) => `includes[]=${opt}`)
        .join("&")}`;

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

        const resultData = jsonData as PaginationResponse<Manga>;

        return {
            result: resultData as PaginationResponse<Manga>,
        };
    } catch (error) {
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
    offset = 0,
    limit = 10
) => {
    const url = queryString.stringifyUrl({
        url: `${base_url}author`,
        query: {
            name,
            offset,
            limit,
        },
    });
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
        if (result.ok) {
            return {
                result: jsonData as MangaDexResponseSuccess<Cover>,
            };
        }
        return {
            error: jsonData,
        };
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
