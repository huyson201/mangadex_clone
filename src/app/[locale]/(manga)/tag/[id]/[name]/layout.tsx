import BackNavigation from "@/components/BackNavigation/BackNavigation";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import React from "react";

type Props = {
    children: React.ReactNode;
    params: {
        name: string;
        id: string;
    };
};

const layout = ({ children, params }: Props) => {
    return (
        <Wrapper>
            <BackNavigation title={params.name.replace("-", "")} />
            <div className="mt-10">{children}</div>
        </Wrapper>
    );
};

export default layout;
