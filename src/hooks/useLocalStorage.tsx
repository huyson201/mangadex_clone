"use client";

import { useState } from "react";

export const useLocalStorage = function <T = undefined>(
    key: string,
    init?: T | (() => T)
) {
    const [data, setState] = useState(() => {
        let data =
            typeof init === "function" ? (init as () => T)() : (init as T);

        if (typeof window === "undefined") {
            return data;
        }

        try {
            const stringData = localStorage.getItem(key);

            if (stringData) {
                return JSON.parse(stringData) as T;
            }

            if (data) {
                localStorage.setItem(key, JSON.stringify(data));
            }

            return data;
        } catch (error) {
            console.warn(`Error reading localStorage key “${key}”:`, error);
            if (data) {
                localStorage.setItem(key, JSON.stringify(data));
            }
            return data;
        }
    });

    const setData = (action: T | ((prev: T) => T)) => {
        const value =
            typeof action === "function"
                ? (action as (prev: T) => T)(data)
                : action;
        localStorage.setItem(key, JSON.stringify(value));
        setState(value);
    };

    return { data, setData };
};
