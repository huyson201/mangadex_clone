import PageWrapper from "@/layouts/PageWrapper";
import React from "react";

type Props = {
    children: React.ReactNode;
};

const layout = ({ children }: Props) => {
    return <PageWrapper>{children}</PageWrapper>;
};

export default layout;
