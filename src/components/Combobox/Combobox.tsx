"use client";
import { Popover } from "@radix-ui/react-popover";
import React, { ReactElement, useEffect, useState } from "react";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ChevronsUpDown, Search } from "lucide-react";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import isEqual from "lodash.isequal";

interface ComboboxProps<T> {
    className?: ClassValue;
    contentWrapperClassName?: ClassValue;
    children?: React.ReactNode;
    label?: string | React.JSX.Element;
    multiple?: boolean;
    defaultValue?: T;
    onChange?: (value: T | null) => void;
    onClose?: () => void;
}

const Combobox = function <T>({
    className,
    contentWrapperClassName,
    children,
    multiple,
    defaultValue,
    onChange,
    onClose,
}: ComboboxProps<T>) {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<T | null>(() => {
        return defaultValue ? defaultValue : null;
    });

    const cloneChildren = React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
            return child;
        }

        const displayName = (child.type as { displayName?: string })
            ?.displayName;

        if (displayName === "ComboboxLabel") {
            return null;
        }

        if (displayName !== "ComboboxOption") {
            return child;
        }

        const value = child.props.value;
        const optionProps: ComboboxOptionProps<T> = {
            ...(child.props as ComboboxOptionProps<T>),
        };

        let isSelected = false;

        if (Array.isArray(selectedValue)) {
            isSelected = selectedValue.some((selected) =>
                isEqual(selected, child.props.value)
            );
        } else {
            isSelected = isEqual(selectedValue, child.props.value);
        }

        return React.cloneElement(
            child as React.ReactElement<ComboboxOptionProps<T>>,
            {
                ...optionProps,
                selected: isSelected,
                onClick: () => handleSelect(value),
            }
        );
    });

    const label = React.Children.toArray(children).find(
        (child) =>
            React.isValidElement(child) &&
            (child.type as { displayName?: string })?.displayName ===
                "ComboboxLabel"
    );

    const handleSelect = (value: T) => {
        if (!multiple) {
            setSelectedValue(value);
            onChange?.(value);
            setOpen(false);
            return;
        }

        if (Array.isArray(selectedValue)) {
            const index = selectedValue.findIndex((selected) =>
                isEqual(selected, value)
            );
            if (index === -1) {
                setSelectedValue([...selectedValue, value] as T);
                onChange?.([...selectedValue, value] as T);
                return;
            }

            selectedValue.splice(index, 1);
            setSelectedValue([...selectedValue] as T);
            onChange?.(selectedValue);
        }
    };

    return (
        <div className="relative">
            <Popover
                open={open}
                onOpenChange={() => {
                    setOpen((prev) => !prev);
                }}
            >
                <div>
                    <PopoverTrigger asChild>
                        <Button
                            variant="default"
                            role="combobox"
                            aria-expanded={open}
                            className={cn(
                                " w-full py-1.5 gap-1 h-auto justify-between border  active:border-primary",
                                open && "bg-accent-hover-2",
                                className
                            )}
                        >
                            {React.isValidElement(label)
                                ? React.cloneElement(
                                      label as React.ReactElement<
                                          ComboboxLabelProps<T | null>
                                      >,
                                      {
                                          data: selectedValue,
                                      }
                                  )
                                : label}
                            <ChevronsUpDown size={20} />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className={cn(
                            " p-1.5 custom-scrollbar overflow-auto max-h-[400px]  bg-accent",
                            contentWrapperClassName
                        )}
                    >
                        {cloneChildren}
                        {/* {renders()} */}
                    </PopoverContent>
                </div>
            </Popover>
        </div>
    );
};

interface ComboboxOptionProps<T> {
    children?: ((selected: boolean) => React.JSX.Element) | React.ReactNode;
    value: T;
    asChild?: boolean;
    selected?: boolean;
    onClick?: () => void;
}
type ComboboxLabelProps<T> =
    | {
          data?: never;
          children?: React.ReactNode;
      }
    | {
          children?: (data?: T) => React.JSX.Element;
          data?: T;
      };

interface ComboboxInputProps {
    onChange?: (value: string) => void;
    defaultValue?: string;
}

// eslint-disable-next-line react/display-name
Combobox.Label = function <T>({
    children,
    data,
    ...props
}: ComboboxLabelProps<T>) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    if (typeof children === "function") {
        return <>{children(data)}</>;
    }
    return <> {children}</>;
};

// eslint-disable-next-line react/display-name
Combobox.Input = function <T>({ onChange, defaultValue }: ComboboxInputProps) {
    // eslint-disable-next-line react-hooks/rules-of-hooks

    return (
        <div className="flex-1 relative mb-2">
            <Search
                size={18}
                className="absolute top-2/4 -translate-y-2/4 left-2"
            />
            <Input
                defaultValue={defaultValue}
                onChange={(e) => onChange?.(e.currentTarget.value)}
                className="h-8 text-sm bg-accent-10 rounded pl-8 pr-2 placeholder-[#9ca3af]"
                placeholder="Search"
            />
        </div>
    );
};

// eslint-disable-next-line react/display-name
Combobox.Option = function <T>({
    children,
    value,
    asChild,
    selected,
    onClick,
    ...props
}: ComboboxOptionProps<T>) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    if (children && typeof children === "function") {
        const child = children(selected || false);

        return React.cloneElement(child, {
            ...child.props,
            onClick: onClick,
        });
    }

    const Comp = asChild ? Slot : ComboboxWithSearchDefaultItem;
    return (
        <Comp onClick={onClick} {...props} active={selected}>
            {children}
        </Comp>
    );
};

const Slot = ({ children, ...props }: { children: React.ReactNode }) => {
    if (React.Children.count(children) > 1) {
        throw new Error("Only one child allowed");
    }

    if (React.isValidElement(children)) {
        return React.cloneElement(children, { ...props });
    }
    return null;
};

const ComboboxWithSearchDefaultItem = ({
    onClick,
    active,
    children,
}: {
    onClick?: () => void;
    active?: boolean;
    children?: React.ReactNode;
}) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                "cursor-pointer group flex items-center gap-2 hover:text-foreground transition-colors",
                active ? "text-primary" : "text-midTone"
            )}
        >
            <span
                className={cn(
                    "transition-all w-2.5 h-2.5  rounded-full border",
                    active
                        ? "border-primary bg-primary"
                        : "group-hover:border-foreground border-midTone"
                )}
            ></span>
            {children}
        </div>
    );
};

(Combobox.Option as React.FunctionComponent).displayName = "ComboboxOption";
(Combobox.Input as React.FunctionComponent).displayName = "ComboboxInput";
(Combobox.Label as React.FunctionComponent).displayName = "ComboboxLabel";

export default Combobox;
