"use client";

import { useState } from "react";

export const useLocalStorage = function <T>(key: string) {
    const [data, setState] = useState<T | undefined>(() => {
        if (typeof window !== "undefined") {
            const stringData = localStorage.getItem(key);
            if (!stringData) return;
            const parsedData = JSON.parse(stringData) as T;
            return parsedData;
        }

        return;
    });

    const setData = (data: T) => {
        localStorage.setItem(key, JSON.stringify(data));
        setState(data);
    };

    return { data, setData };
};
