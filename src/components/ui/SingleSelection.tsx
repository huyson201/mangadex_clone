"use client";
import React, { useState, useImperativeHandle, forwardRef } from "react";
import ComboBox from "./combobox";
import { cn } from "@/lib/utils";

type Props = {
    title?: string;
    data: SingleSelectionData[];
    defaultActive?: string;
    onSelect?: (value: any) => void;
};

interface SingleSelectionData {
    key: string;
    value: any;
}

const SingleSelection = forwardRef<{ reset: () => void }, Props>(
    ({ data, onSelect, defaultActive = "none" }, ref) => {
        const [currentKey, setCurrentKey] = useState<string>(defaultActive);
        const [open, setOpen] = React.useState(false);

        // remove duplicate data
        data = data.reduce((prev: SingleSelectionData[], value) => {
            const isExist = prev.some((el) => compareKey(el.key, value.key));
            if (!isExist) prev.push(value);
            return prev;
        }, []);

        useImperativeHandle(
            ref,
            () => {
                return {
                    reset() {
                        setCurrentKey("none");
                        onSelect?.("");
                    },
                };
            },
            []
        );

        const handleOpenChange = () => {
            setOpen((prev) => !prev);
        };
        const handleSelect = (key: string, value: any) => {
            setCurrentKey(key);
            setOpen(false);
            onSelect?.(value);
        };
        return (
            <ComboBox
                open={open}
                title={currentKey}
                onOpenChange={handleOpenChange}
                contentClass="max-h-[256px] overflow-auto custom-scrollbar w-[var(--radix-popover-trigger-width)]"
            >
                <div className="pl-2 space-y-2">
                    {[{ key: "None", value: "" }, ...data].map((el) => {
                        const isActive = compareKey(currentKey, el.key);
                        return (
                            <SingleSelectionItem
                                onSelect={handleSelect}
                                key={el.key}
                                keyValue={el.key}
                                value={el.value}
                                active={isActive}
                            />
                        );
                    })}
                </div>
            </ComboBox>
        );
    }
);
SingleSelection.displayName = "SingleSelection";

const compareKey = (key1: string, key2: string) => {
    return key1.trim().toLowerCase() === key2.trim().toLowerCase();
};
const SingleSelectionItem = ({
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
        console.log("select");
        onSelect?.(keyValue, value);
    };
    return (
        <div
            onClick={handleSelect}
            className={cn(
                "cursor-pointer hover:text-foreground transition-colors",
                active ? "text-primary" : "text-midTone"
            )}
        >
            {keyValue}
        </div>
    );
};

export default SingleSelection;
