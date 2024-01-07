import React from "react";
import RingLoader from "@/components/Loader/RingLoader";

type Props = {};

const loading = (props: Props) => {
    return (
        <div className="mt-4 py-20 flex items-center justify-center ">
            <RingLoader />
        </div>
    );
};

export default loading;
