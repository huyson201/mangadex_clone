import React from "react";
type Data = { key: string; value: any }[];
interface Props {
    data: Data;
    renderItems?: (data: { key: string; value: any }) => React.JSX.Element[];
}

const LanguageSelection = ({ data, renderItems }: Props) => {
    const render = () => {
        // return React.Children.map(renderItems?.(data), (child) => {
        //     if (!child) return null;
        //     const temProps = JSON.parse(JSON.stringify(child.props));
        //     const onClick = () => {
        //         console.log(child.props);
        //     };
        //     return React.cloneElement(child, { ...child.props, onClick });
        // });
    };

    return <div>{}</div>;
};

export default LanguageSelection;
