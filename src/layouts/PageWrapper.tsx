import { cn } from "@/lib/utils";

type Props = {
    children?: any;
    className?: string;
};

const PageWrapper = ({ children, className }: Props) => {
    return (
        <div
            className={cn("pt-[var(--navbar-height)] pb-6 relative", className)}
        >
            {children}
        </div>
    );
};

export default PageWrapper;
