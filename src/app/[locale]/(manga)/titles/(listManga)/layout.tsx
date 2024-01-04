import Wrapper from "@/layouts/Wrapper/Wrapper";
import React from "react";
import BackNav from "./BackNav";

type Props = { children: React.ReactNode };

const layout = (props: Props) => {
    return (
        <Wrapper>
            <BackNav />
            {props.children}
        </Wrapper>
    );
};

export default layout;
