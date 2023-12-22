import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth";
import { Auth, BackendToken } from "./type";
import { IUser } from "./src/models/user";

declare module "next-auth" {
    interface Session {
        user: Omit<IUser, "password"> & { _id: string };
    }
}

declare module "next-auth/jwt" {
    interface JWT extends Omit<IUser & { _id: string }, "password"> {}
}

interface Tag {
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
interface Relationship {
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
interface Manga {
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

interface Cover {
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

interface Chapter {
    id: string;

    type: string;

    attributes: {
        volume: string | null;

        chapter: number;

        title: string | null;

        translatedLanguage: id;

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
interface MangaDexResponseSuccess<T> {
    result: string;
    response: string;
    data: T;
}
interface Statistics {
    [key: string]: Statistic;
}

interface Statistic {
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

interface StatisticsResponse {
    result: string;
    statistics: Statistics;
}
interface PaginationResponse<T> {
    result: "ok" | "error";
    response: string;
    data: T[];
    limit: number;
    offset: number;
    total: number;
}

interface Author {
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
