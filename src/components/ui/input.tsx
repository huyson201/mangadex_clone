import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const inputVariants = cva(
    "flex border-none outline-none bg-transparent w-full focus:border-solid  focus-visible:outline-none focus:border focus:border-primary disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-input text-input-foreground placeholder-input-foreground",
            },
            backgroundFilter: {
                blur: "opacity-[0.65] filter brightness-[1.1]",
            },
        },
        defaultVariants: {
            variant: "default",
            backgroundFilter: null,
        },
    }
);

export interface InputProps
    extends VariantProps<typeof inputVariants>,
        React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, variant, backgroundFilter, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    inputVariants({ variant, backgroundFilter }),
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };
// "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
