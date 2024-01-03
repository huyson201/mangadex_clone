import BackNavigation from "@/components/BackNavigation/BackNavigation";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import React from "react";

type Props = { children: React.ReactNode };

const layout = (props: Props) => {
    return (
        <Wrapper>
            <BackNavigation title="Recently Added" />
            {props.children}
        </Wrapper>
    );
};

export default layout;
