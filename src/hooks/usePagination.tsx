import React, { useMemo } from "react";

const usePagination = (currentPage: number, totalPage: number) => {
    const paginationResult = useMemo(() => {
        const current = currentPage;
        const last = totalPage;
        const delta = 2;
        let left = current - delta;
        let right = current + delta + 1;
        let range = [];
        let rangeWithDots = [];
        let l: number | undefined;

        for (let i = 1; i <= last; i++) {
            if (i == 1 || i == last || (i >= left && i < right)) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push("...");
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    }, [currentPage, totalPage]);

    return paginationResult;
};

export default usePagination;
