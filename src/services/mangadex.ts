import { stringify } from "querystring";
import {
    Chapter,
    Cover,
    Manga,
    MangaDexResponseSuccess,
    PaginationResponse,
    StatisticsResponse,
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
interface GetMangaOpts {
    includes: IncludeOption[];
}
export const getPopularManga = async (includes?: IncludeOption[]) => {
    includes ??= ["artist", "author", "cover_art"];
    const currentYear = new Date().getFullYear();
    const currentSeasonal = getCurrentSeasonTimeString();
    const url = `${base_url}/manga?year=${currentYear}&updatedAtSince=${currentSeasonal}&order[followedCount]=desc&${includes
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
            console.log(jsonData);
            throw new Error("Something error");
        }

        const resultData = jsonData as StatisticsResponse;

        return {
            result: resultData,
        };
    } catch (error) {
        throw error;
    }
};
export const getStatisticsList = async (
    type: "chapter" | "manga" | "group",
    ids: string[]
) => {
    const query = ids.map((id) => `${type}[]=${id}`).join("&");
    const url = `${base_url}/statistics/${type}?${query}`;
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

        return jsonData as StatisticsResponse;
    } catch (error) {
        throw error;
    }
};
export const getRecentlyAddedMangaList = async (
    limit = 10,
    offset = 0,
    includes?: IncludeOption[]
) => {
    const includesQuery = includes
        ? includes.map((value) => `includes[]=${value}`).join("&")
        : null;

    const formattedDateTime: string = getTimeAgo(5);

    const url = `${base_url}/manga?limit=${limit}&offset=${offset}&createdAtSince=${formattedDateTime}${
        includesQuery ? `&${includesQuery}` : ""
    }`;

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

export const getSeasonalMangaList = async (
    limit = 10,
    offset = 0,
    includes?: IncludeOption[]
) => {
    const includesQuery = includes
        ? includes.map((value) => `includes[]=${value}`).join("&")
        : null;

    const currentSeasonal = getCurrentSeasonTimeString();

    const url = `${base_url}/manga?limit=${limit}&offset=${offset}&hasAvailableChapters=1&updatedAtSince=${currentSeasonal}${
        includesQuery ? `&${includesQuery}` : ""
    }`;

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

export const getMangaById = async (id: string, includes?: IncludeOption[]) => {
    const includesQuery = includes
        ? includes.map((value) => `includes[]=${value}`).join("&")
        : null;

    const url = `${base_url}/manga/${id}${
        includesQuery ? `?${includesQuery}` : ""
    }`;

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

export const getLatestUpdateChapters = async (
    mangaId: string,
    lastChapterId: string,
    includes?: ("manga" | "scanlation_group" | "user")[]
) => {
    const includesQuery = includes
        ? includes.map((value) => `includes[]=${value}`).join("&")
        : null;

    try {
        const lastChapter = await getChapter(lastChapterId);

        const date = new Date(lastChapter.result.data.attributes.updatedAt);
        date.setUTCHours(0, 0, 0, 0);

        const url = `${base_url}/manga/${mangaId}/feed?limit=4&order[updatedAt]=desc${
            includesQuery ? `&${includesQuery}` : ""
        }&updatedAtSince=${date.toISOString().slice(0, 19)}`;

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

        const resultData = jsonData as PaginationResponse<Chapter>;
        return {
            result: resultData,
        };
    } catch (error) {
        throw error;
    }
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

export const searchMangaByTitle = async (
    title: string,
    includes?: IncludeOption[],
    offset = 0,
    limit = 10
) => {
    const includesQuery = includes
        ? includes.map((value) => `includes[]=${value}`).join("&")
        : null;

    const url = `${base_url}/manga?offset=${offset}&limit=${limit}&order[followedCount]=desc&title=${title}${
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

        return jsonData as PaginationResponse<Manga>;
    } catch (error) {
        throw error;
    }
};
