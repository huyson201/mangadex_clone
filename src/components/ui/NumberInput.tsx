import { cn } from "@/lib/utils";
import React, {
    ChangeEvent,
    KeyboardEvent,
    useRef,
    useState,
    forwardRef,
    useImperativeHandle,
} from "react";
import { inputVariants } from "./input";
import { Minus, Plus } from "lucide-react";

type Props = {
    onChange?: (value?: string) => void;
    defaultValue?: string;
};

const NumberInput = forwardRef<{ reset: () => void }, Props>(
    ({ onChange, defaultValue }, ref) => {
        const [value, setValue] = useState(defaultValue || "");

        const inputRef = useRef<HTMLInputElement>(null);
        useImperativeHandle(
            ref,
            () => {
                return {
                    reset() {
                        setValue("");
                        onChange?.();
                    },
                };
            },
            // eslint-disable-next-line react-hooks/exhaustive-deps
            []
        );
        const handleClickMinus = () => {
            if (+value <= 0 || !inputRef.current) return;

            setValue((prev) => {
                if (!inputRef.current) return value;
                const newValue = +prev - 1 + "";
                inputRef.current!.value = newValue;
                onChange?.(newValue);
                return newValue;
            });
        };

        const handleClickPlus = () => {
            if (!inputRef.current) {
                return;
            }

            setValue((prev) => {
                if (!inputRef.current) return value;
                const newValue = +prev + 1 + "";
                inputRef.current.value = newValue;
                onChange?.(newValue);
                return newValue;
            });
        };
        const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
            const key = e.code;
            if (/Key[a-zA-Z]/.test(key) || key === "Space") {
                e.preventDefault();
                return;
            }
        };

        const handleOnchange = (event: ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value);
            onChange?.(event.target.value);
        };
        return (
            <div className="flex items-stretch  h-[33.33px] bg-accent overflow-hidden rounded ">
                <input
                    ref={inputRef}
                    onChange={handleOnchange}
                    onKeyDown={handleKeyDown}
                    defaultValue={value !== "" ? value : ""}
                    type="text"
                    className={cn(
                        inputVariants(),
                        "flex-1 rounded  placeholder-[#9ca3af]  text-sm pl-2"
                    )}
                    placeholder="From 1972 - Now"
                />
                <div className="flex items-center gap-2 px-1 text-midTone ">
                    <button type="button" onClick={handleClickMinus}>
                        <Minus size={20} />
                    </button>
                    <button type="button" onClick={handleClickPlus}>
                        <Plus size={20} />
                    </button>
                </div>
            </div>
        );
    }
);

NumberInput.displayName = "NumberInput";

export default NumberInput;
