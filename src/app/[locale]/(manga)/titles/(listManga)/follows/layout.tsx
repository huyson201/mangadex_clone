import RequiredAuthNotification from "@/components/RequiredAuthNotification/RequiredAuthNotification";
import React from "react";

type Props = {
    children?: React.ReactNode;
};

const layout = ({ children }: Props) => {
    return <RequiredAuthNotification>{children}</RequiredAuthNotification>;
};

export default layout;
