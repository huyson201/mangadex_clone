import dynamic from "next/dynamic";
const HistoryContent = dynamic(() => import("./HistoryContent"), {
    ssr: false,
});

type Props = {};

const page = (props: Props) => {
    return <HistoryContent />;
};

export default page;
