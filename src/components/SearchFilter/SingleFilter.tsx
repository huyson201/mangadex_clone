import React from "react";
import Combobox from "../Combobox/Combobox";
import { cn } from "@/lib/utils";

type Props<T> = {
    data: { key: string; value: T }[];
    defaultValue: T;
    onChange?: (data: T) => void;
};

const SingleFilter = function <T extends {}>({
    data,
    defaultValue,
    onChange,
}: Props<T>) {
    return (
        <Combobox
            defaultValue={defaultValue}
            contentWrapperClassName="space-y-2 max-h-[256px] custom-scrollbar pl-4 w-[var(--radix-popover-trigger-width)]"
            onChange={(data) => onChange?.((data || "") as T)}
        >
            <Combobox.Label>
                {(selectedValue?: string) => {
                    const label = data.find(
                        (item) =>
                            (item.value as any) ===
                            (selectedValue ? selectedValue : "")
                    )?.key;
                    return <div>{label as string}</div>;
                }}
            </Combobox.Label>
            {data.map((item) => {
                return (
                    <Combobox.Option key={item.key} value={item.value}>
                        {(selected) => {
                            return (
                                <div
                                    className={cn(
                                        "cursor-pointer hover:text-foreground transition-colors",
                                        selected
                                            ? "text-primary"
                                            : "text-midTone"
                                    )}
                                >
                                    {item.key}
                                </div>
                            );
                        }}
                    </Combobox.Option>
                );
            })}
        </Combobox>
    );
};

export default SingleFilter;
