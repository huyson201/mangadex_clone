import { useChapterMenu } from "@/contexts/ChapterMenuContext";
import { cn } from "@/lib/utils";
import { CSSProperties, useRef } from "react";

type Props = {
    totalStep: number;
    step: number;
    onClickStep?: (step: number) => void;
};
export interface MyCustomCSS extends CSSProperties {
    "--current-progress": number | string;
}
const ChapterProgress = ({ totalStep, step, onClickStep }: Props) => {
    const { progressbarType } = useChapterMenu();
    const progressRef = useRef<HTMLDivElement>(null);
    const { readingDirection } = useChapterMenu();
    const progressPercentage = progressRef.current
        ? ((step + 1) / totalStep) * progressRef.current.clientWidth
        : 0;

    return (
        <div
            className={cn(
                "transition-all group pb-1 hover:pb-0 z-[3] fixed  bottom-0 pt-6  left-0 w-full",
                progressbarType === "hidden" && "translate-y-full"
            )}
        >
            <div className="flex items-center justify-center transition-all w-full group-hover:h-[var(--chapter-progress-height)] group-hover:bg-background group-hover:border-t group-hover:border-t-accent  px-[var(--side-margin)]">
                <div
                    ref={progressRef}
                    className={cn(
                        `w-full  flex relative rounded-full  bg-accent group-hover:opacity-100 opacity-70 gap-1 
        before:absolute before:top-0  before:z-[1] before:pointer-events-none before:opacity-50 before:h-full before:transition-all before:rounded-full before:w-[var(--current-progress)] before:bg-primary`,
                        readingDirection === "left-right"
                            ? "before:left-0"
                            : "before:right-0"
                    )}
                    style={
                        {
                            [`--current-progress`]: `${
                                progressPercentage - 4
                            }px`,
                        } as MyCustomCSS
                    }
                >
                    {Array.from({ length: totalStep }).map((value, index) => {
                        let active = false;
                        if (readingDirection === "left-right") {
                            active = index === step;
                        } else {
                            active = totalStep - 1 - step === index;
                        }
                        return (
                            <div
                                data-index={
                                    readingDirection === "left-right"
                                        ? index + 1
                                        : totalStep - index
                                }
                                onClick={() => {
                                    const toIndex =
                                        readingDirection === "left-right"
                                            ? index
                                            : totalStep - 1 - index;
                                    onClickStep?.(toIndex);
                                }}
                                className={cn(
                                    `first:rounded-tl-full first:rounded-bl-full last:rounded-tr-full last:rounded-br-full  group-hover:h-2.5 after:w-7 after:h-7 hover:after:inline-flex  after:items-center 
                        after:justify-center after:text-xs after:bg-accent after:rounded-full after:content-[attr(data-index)]
                         after:z-[2] after:absolute after:left-2/4 after:-translate-x-2/4 after:top-0 after:-translate-y-[calc(100%_+_4px)]
                        transition-all relative after:hidden  h-1 bg-accent-2 grow cursor-pointer [&.active]:before:absolute [&.active]:before:w-full [&.active]:before:h-full  before:transition-all before:duration-500
                        [&.active]:before:left-0 [&.active]:before:top-0 [&.active]:before:bg-primary [&.active]:before:rounded-full [&.active]:hover:after:inline-flex [&.active]:hover:after:bg-primary`,
                                    { active: active }
                                )}
                                key={`${index}`}
                            >
                                {" "}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ChapterProgress;
