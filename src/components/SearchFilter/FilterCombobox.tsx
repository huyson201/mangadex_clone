"use client";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import isEqual from "lodash.isequal";
import { ChevronsUpDown, X } from "lucide-react";
import React, { useMemo, useState } from "react";

type Props<T> = {
    contentClass?: string;
    data: { value: T; key: string }[];
    renderItems?: (
        data: { value: T; key: string },
        active?: boolean
    ) => JSX.Element;
    multiple?: boolean;
    className?: string;
} & (
    | {
          multiple?: never;
          defaultValue?: T;
          onChange?: (data: Props<T>["data"][number]["value"]) => void;
          renderLabel?: (data?: T) => JSX.Element;
      }
    | {
          multiple: true;
          defaultValue?: T[];
          onChange?: (data: T[]) => void;
          renderLabel?: (data?: T[]) => JSX.Element;
      }
);

const defaultRenders = function <T>(
    data: { value: T; key: string },
    active?: boolean
) {
    return (
        <DefaultItem active={active} key={data.key}>
            {data.value as any}
        </DefaultItem>
    );
};

const FilterCombobox = function <T>({
    className,
    contentClass,
    multiple,
    defaultValue,
    data,
    onChange,
    renderItems,
    renderLabel,
}: Props<T>) {
    const [open, setOpen] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState(() => {
        if (multiple) {
            if (defaultValue === undefined) return [] as string[];

            const keys = defaultValue.map((defaultData) => {
                return data.find((dataObj) =>
                    isEqual(defaultData, dataObj.value)
                )?.key;
            });

            return keys;
        }

        if (defaultValue === undefined) return "";
        return data.find((dataObj) => isEqual(defaultValue, dataObj.value))
            ?.key;
    });
    const currentRenderItems = renderItems ? renderItems : defaultRenders;

    const handleSelect = (key: string) => {
        if (Array.isArray(selectedKeys)) {
            const index = selectedKeys.indexOf(key);
            const newKeys = [...selectedKeys];
            if (index === -1) {
                newKeys.push(key);
            } else {
                newKeys.splice(index, 1);
            }
            setSelectedKeys(newKeys);
            const changeData = getSelectedData(data, newKeys as string[]).map(
                (obj) => obj.value
            );
            onChange?.(changeData as T & T[]);
            return;
        }
        const changeData = data.find((dataObj) => key === dataObj.key)?.value;
        setSelectedKeys(key);
        onChange?.(changeData as T & T[]);
        setOpen(false);
    };

    const items = data.map((dataObj) => {
        const isActive = Array.isArray(selectedKeys)
            ? selectedKeys.some((key) => key === dataObj.key)
            : selectedKeys === dataObj.key;
        const onClick = () => {
            handleSelect(dataObj.key);
        };
        const child = currentRenderItems(dataObj, isActive);
        return React.cloneElement(child, {
            ...child.props,
            onClick: onClick,
            key: dataObj.key,
        });
    });

    const defaultRenderLabel = () => {
        if (Array.isArray(selectedKeys)) {
            return selectedKeys.join(",");
        }
        return selectedKeys;
    };

    const selectedData = useMemo(() => {
        if (Array.isArray(selectedKeys)) {
            return data
                .filter((dataObj) =>
                    selectedKeys.some((key) => key === dataObj.key)
                )
                .map((obj) => obj.value);
        }

        return data.find((dataObj) => selectedKeys === dataObj.key)?.value;
    }, [selectedKeys, data]);

    const label = renderLabel
        ? renderLabel(selectedData as T & T[])
        : defaultRenderLabel();

    return (
        <div className="relative">
            <Popover open={open} onOpenChange={() => setOpen((prev) => !prev)}>
                <div>
                    <PopoverTrigger asChild>
                        <Button
                            variant="default"
                            role="combobox"
                            aria-expanded={open}
                            className={cn(
                                " w-full py-1.5 gap-1 h-auto justify-between border border-transparent  active:border-primary",
                                open && "bg-accent-hover",
                                className
                            )}
                        >
                            <div className="text-left capitalize flex-1 whitespace-break-spaces break-all line-clamp-1">
                                {label}
                            </div>
                            <ChevronsUpDown className="w-5" size={20} />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className={cn(
                            "p-1.5 custom-scrollbar overflow-auto max-h-[400px]  bg-accent",
                            contentClass
                        )}
                    >
                        {items}
                    </PopoverContent>
                </div>
            </Popover>
        </div>
    );
};

export default FilterCombobox;

export const DefaultItem = ({
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
                "capitalize cursor-pointer group flex items-center gap-2 hover:text-foreground transition-colors",
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

export const SelectedTag = ({
    title,
    onClick,
}: {
    onClick?: () => void;
    title: string;
}) => {
    return (
        <span
            onClick={onClick}
            className="px-1.5 cursor-pointer rounded-lg inline-flex items-center gap-1.5 text-xs bg-accent-10 text-foreground"
        >
            <X size={14} />
            {title}
        </span>
    );
};

const getSelectedData = function <T>(
    data: { key: string; value: T }[],
    selectedKeys: string[]
) {
    return data.filter((dataItem) =>
        selectedKeys.some((key) => key === dataItem.key)
    );
};
