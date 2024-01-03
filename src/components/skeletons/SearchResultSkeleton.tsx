import React from "react";

type Props = {};

const SearchResultSkeleton = (props: Props) => {
    return (
        <div className="animate-pulse ">
            <div className="rounded w-20 h-3 bg-accent "></div>
            <div className="rounded-md mt-2 w-full h-10 bg-accent"></div>
            <div className="rounded-md mt-2 w-full h-10 bg-accent"></div>
        </div>
    );
};

export default SearchResultSkeleton;
