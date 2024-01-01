import BackNavigation from "@/components/BackNavigation/BackNavigation";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import React from "react";
import dynamic from "next/dynamic";
const HistoryContent = dynamic(() => import("./HistoryContent"), {
    ssr: false,
});

type Props = {};

const page = (props: Props) => {
    return (
        <Wrapper>
            <BackNavigation title="Reading History" />
            <div className="text-center bg-accent  py-4 px-6 rounded my-6 text-sm">
                Reading history is currently only tracked on your device, and
                will be lost if you clear site data.
            </div>
            <div className="mt-4">
                <HistoryContent />
            </div>
        </Wrapper>
    );
};

export default page;
