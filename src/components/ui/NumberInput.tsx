import { cn } from "@/lib/utils";
import React, { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { inputVariants } from "./input";
import { Minus, Plus } from "lucide-react";

type Props = {
    onChange?: (value: number) => void;
};

const NumberInput = ({ onChange }: Props) => {
    const [value, setValue] = useState(0);
    const limitFromYear = 1972;

    const inputRef = useRef<HTMLInputElement>(null);
    const handleClickMinus = () => {
        const date = new Date();
        const currentYear = date.getFullYear();
        if (!inputRef.current) {
            return;
        }
        if (value <= limitFromYear) {
            setValue(limitFromYear);
            inputRef.current.value = `${value}`;
            return;
        }
        if (value > currentYear) {
            setValue(currentYear);
            inputRef.current.value = `${value}`;
            return;
        }
        setValue((prev) => prev - 1);
        inputRef.current.value = `${value}`;
    };

    const handleClickPlus = () => {
        const date = new Date();
        const currentYear = date.getFullYear();

        if (value === 0) {
            setValue(1972);
            return;
        }

        if (value >= currentYear) {
            setValue(currentYear);
            return;
        }
        setValue((prev) => prev + 1);
    };
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        const key = e.code;
        if (/Key[a-zA-Z]/.test(key) || key === "Space") {
            e.preventDefault();
            return;
        }
    };

    const handleOnchange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value !== "" && parseInt(event.target.value)) {
            const value = parseInt(event.target.value);
            setValue(value);
            onChange?.(value);
        }
    };
    return (
        <div className="flex items-stretch  h-[33.33px] bg-accent overflow-hidden rounded ">
            <input
                ref={inputRef}
                onChange={handleOnchange}
                onKeyDown={handleKeyDown}
                defaultValue={value !== 0 ? value : ""}
                type="text"
                className={cn(
                    inputVariants(),
                    "flex-1 rounded  placeholder-[#9ca3af]  text-sm pl-2"
                )}
                placeholder="From 1972 - Now"
            />
            <div className="flex items-center gap-2 px-1 text-midTone ">
                <button onClick={handleClickMinus}>
                    <Minus size={20} />
                </button>
                <button onClick={handleClickPlus}>
                    <Plus size={20} />
                </button>
            </div>
        </div>
    );
};

export default NumberInput;
