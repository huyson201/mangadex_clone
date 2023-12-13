import React from "react";

type Props = {
    children: React.ReactNode;
};

const layout = ({ children }: Props) => {
    return (
        <div className="pt-[var(--navbar-height)] pb-6 relative">
            {children}
        </div>
    );
};

export default layout;
