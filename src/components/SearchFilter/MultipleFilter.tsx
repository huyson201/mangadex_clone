import React from "react";
import Combobox from "../Combobox/Combobox";

type Props = {
    data: { key: string; value: string }[];
    defaultValue: string[];
    onChange?: (data?: string[]) => void;
};

const MultipleFilter = function ({ data, defaultValue, onChange }: Props) {
    return (
        <Combobox
            multiple
            defaultValue={defaultValue}
            contentWrapperClassName="space-y-2 max-h-[256px] custom-scrollbar pl-4 w-[var(--radix-popover-trigger-width)]"
            onChange={(data) => {
                onChange?.(data as any);
            }}
        >
            <Combobox.Label>
                {(selectedValue?: string[]) => {
                    const label =
                        data
                            .filter((item) =>
                                selectedValue?.includes(item.value)
                            )
                            .map((item) => item.key)
                            .join(", ") || "Any";
                    return <div>{label}</div>;
                }}
            </Combobox.Label>
            {data.map((item) => {
                return (
                    <Combobox.Option key={item.key} value={item.value}>
                        {item.key}
                    </Combobox.Option>
                );
            })}
        </Combobox>
    );
};

export default MultipleFilter;
