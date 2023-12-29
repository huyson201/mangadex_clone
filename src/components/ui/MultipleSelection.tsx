"use client";
import React, { useState, forwardRef, useImperativeHandle } from "react";
import ComboBox from "./combobox";
import { cn } from "@/lib/utils";

type Props = {
    title?: string;
    data: Data[];
    defaultValue?: string[];
    onSelect?: (data: any[]) => void;
    renderItem?: (data: Data, isActive: boolean) => React.JSX.Element;
};

interface Data {
    key: string;
    value: any;
}

const MultipleSelection = forwardRef<{ reset: () => void }, Props>(
    ({ data, onSelect, defaultValue, renderItem }, ref) => {
        const [currentKey, setCurrentKey] = useState<string[]>(() => {
            if (defaultValue) {
                console.log(defaultValue);
                return data
                    .filter((el) => defaultValue.includes(el.value))
                    .map((el) => el.key);
            }
            return [];
        });
        const [open, setOpen] = React.useState(false);

        const title = currentKey.length > 0 ? currentKey.join(", ") : "Any";

        // remove duplicate data
        data = data.reduce((prev: Data[], value) => {
            const isExist = prev.some((el) => compareKey(el.key, value.key));
            if (!isExist) prev.push(value);
            return prev;
        }, []);

        useImperativeHandle(
            ref,
            () => {
                return {
                    reset() {
                        setCurrentKey([]);
                        onSelect?.([]);
                    },
                };
            },
            // eslint-disable-next-line react-hooks/exhaustive-deps
            []
        );

        const render = () => {
            return data.map((el) => {
                const isActive = currentKey.some((key) =>
                    compareKey(key, el.key)
                );

                if (!renderItem) {
                    return (
                        <MultipleSelectionItem
                            onSelect={(key, value) => handleSelectData(key)}
                            key={el.key}
                            keyValue={el.key}
                            value={el.value}
                            active={isActive}
                        />
                    );
                }
                const onClick = () => {
                    handleSelectData(el.key);
                };
                const child = renderItem(el, isActive);
                return React.cloneElement(child, {
                    ...child.props,
                    onClick,
                    key: el.key,
                });
            });
        };

        const handleOpenChange = () => {
            setOpen((prev) => !prev);
        };
        const handleSelectData = (key: string) => {
            const cloneValue = [...currentKey];
            const idex = cloneValue.findIndex((value) => value === key);
            if (idex !== -1) {
                cloneValue.splice(idex, 1);
            } else {
                cloneValue.push(key);
            }
            setCurrentKey([...cloneValue]);
            onSelect?.(
                data.reduce((prev: string[], el) => {
                    if (cloneValue.includes(el.key)) {
                        prev.push(el.value);
                    }
                    return prev;
                }, [])
            );
        };

        return (
            <ComboBox
                open={open}
                title={title}
                onOpenChange={handleOpenChange}
                contentClass="max-h-[256px] overflow-auto custom-scrollbar w-[var(--radix-popover-trigger-width)]"
            >
                <div className="pl-2 space-y-2">
                    {/* {data.map((el) => {
                        const isActive = currentKey.some((key) =>
                            compareKey(key, el.key)
                        );
                        return (
                            <MultipleSelectionItem
                                onSelect={(key, value) => handleSelectData(key)}
                                key={el.key}
                                keyValue={el.key}
                                value={el.value}
                                active={isActive}
                            />
                        );
                    })} */}
                    {render()}
                </div>
            </ComboBox>
        );
    }
);
MultipleSelection.displayName = "MultipleSearch";

const compareKey = (key1: string, key2: string) => {
    return key1.trim().toLowerCase() === key2.trim().toLowerCase();
};
const MultipleSelectionItem = ({
    keyValue,
    value,
    active,
    onSelect,
}: {
    keyValue: string;
    value: any;
    active?: boolean;
    onSelect?: (key: string, value: any) => void;
}) => {
    const handleSelect = () => {
        onSelect?.(keyValue, value);
    };
    return (
        <div
            onClick={handleSelect}
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
            {keyValue}
        </div>
    );
};

export default MultipleSelection;
