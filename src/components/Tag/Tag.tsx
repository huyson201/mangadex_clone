import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
export const tagVariants = cva(
    "uppercase text-[0.625rem] inline-block text-foreground font-semibold  rounded-md",
    {
        variants: {
            variant: {
                none: "",
                default: "bg-accent",
                warning: "bg-status-yellow text-white",
                success: "bg-status-green text-white",
                danger: "bg-status-red text-white",
                purple: "bg-status-purple text-white",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

type AsChildProps = {
    asChild: true;
    children: React.ReactNode;
    className?: never;
};
interface Props extends React.HTMLAttributes<HTMLSpanElement> {
    className?: string;
    asChild?: never;
    children?: React.ReactNode;
}

const Tag = ({
    className,
    variant,
    asChild,
    ...props
}: (Props | AsChildProps) & VariantProps<typeof tagVariants>) => {
    const Comp = asChild ? Slot : "span";
    return (
        <Comp {...props} className={cn(tagVariants({ variant }), className)} />
    );
};

export default Tag;

const Slot = ({ children, ...props }: { children?: React.ReactNode }) => {
    if (React.Children.count(children) > 1) {
        throw new Error("Required only one child component.");
    }
    if (React.isValidElement(children)) {
        return React.Children.map(children, (child) => {
            return React.cloneElement(child, {
                ...props,
                ...child.props,
                className: cn(
                    (props as any)?.className,
                    child.props?.className
                ),
            });
        });
    }

    return null;
};
