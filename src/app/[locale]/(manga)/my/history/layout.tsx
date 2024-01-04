import BackNavigation from "@/components/BackNavigation/BackNavigation";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import React from "react";

type Props = { children: React.ReactNode };

const layout = (props: Props) => {
    return (
        <Wrapper>
            <BackNavigation title="Reading History" />
            <div className="text-center bg-accent  py-4 px-6 rounded my-6 text-sm">
                Reading history is currently only tracked on your device, and
                will be lost if you clear site data.
            </div>
            <div className="mt-4">{props.children}</div>
        </Wrapper>
    );
};

export default layout;
