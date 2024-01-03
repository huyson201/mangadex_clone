import RingLoader from "@/components/Loader/RingLoader";
import React from "react";

type Props = {};

const loading = (props: Props) => {
    return (
        <div className="h-screen w-full flex items-center justify-center">
            <RingLoader className="w-14 h-14" />
        </div>
    );
};

export default loading;
