import React from "react";

type Props = {};

const LatestUpdateListSkeleton = (props: Props) => {
    return (
        <div className="mt-2 md:mt-4 grid md:grid-cols-2 gap-x-4 animate-pulse">
            <div className="md:bg-accent md:px-4 py-4 space-y-4">
                {Array.from({ length: 6 }).map((_, index) => (
                    <LatestUpdateListSkeletonItem key={`${index}`} />
                ))}
            </div>
            <div className="hidden md:block md:bg-accent md:px-4 py-4 space-y-4">
                {Array.from({ length: 6 }).map((_, index) => (
                    <LatestUpdateListSkeletonItem key={`${index}`} />
                ))}
            </div>
        </div>
    );
};

export default LatestUpdateListSkeleton;

const LatestUpdateListSkeletonItem = () => {
    return (
        <div className="flex gap-x-2">
            <div className="w-14 h-20 bg-accent filter brightness-150 rounded shadow-md"></div>
            <div className="w-[calc(100%_-_56px)] space-y-2">
                <div className="h-4 w-full bg-accent filter brightness-150 rounded shadow-md"></div>
                <div className="h-4 w-1/3 bg-accent filter brightness-150 rounded shadow-md"></div>
                <div className="h-4 w-[60px] bg-accent filter brightness-150 rounded shadow-md"></div>
            </div>
        </div>
    );
};
