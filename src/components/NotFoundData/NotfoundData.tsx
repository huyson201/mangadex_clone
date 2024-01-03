import React from "react";

type Props = {
    title?: string;
};

const NotfoundData = ({ title }: Props) => {
    return (
        <div className="text-center bg-accent  py-4 px-6 rounded my-6">
            {title || "No Data Found"}
        </div>
    );
};

export default NotfoundData;
