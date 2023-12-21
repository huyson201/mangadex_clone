"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { useFormStatus } from "react-dom";

interface FormSubmitButtonProps {
    className?: string;
    children?: (pending: boolean) => React.ReactNode | React.ReactNode;
    disabled?: boolean;
}
const FormSubmitButton = ({
    className,
    disabled,
    children,
}: FormSubmitButtonProps) => {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={disabled || pending}
            className={cn("disabled:opacity-60", className)}
        >
            {children
                ? typeof children === "function"
                    ? children(pending)
                    : children
                : null}
        </button>
    );
};

export default FormSubmitButton;
