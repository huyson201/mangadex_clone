import React, { useState } from "react";

export const pageType = ["single", "longStrip"] as const;
const imgFitData = ["height", "width", "both", "no-limit"] as const;

export type PageType = (typeof pageType)[number];
export type ReadingDirection = "left-right" | "right-left";
export type ProgressbarType = "hidden" | "normal";
export type HeaderType = "hidden" | "shown";
export type ImageFit = (typeof imgFitData)[number];

interface ChapterMenuContextProps {
    isOpen: boolean;
    pageType: PageType;
    readingDirection: ReadingDirection;
    progressbarType: ProgressbarType;
    headerType: HeaderType;
    imageFit: ImageFit;
    togglePageType: () => void;
    toggleReadingDirection: () => void;
    toggleProgressbarType: () => void;
    toggleHeaderType: () => void;
    toggleImageFitType: () => void;
    close: () => void;
    open: () => void;
}
const ChapterMenuContext = React.createContext<ChapterMenuContextProps | null>(
    null
);

export const useChapterMenu = () => {
    const context = React.useContext(ChapterMenuContext);
    if (!context) {
        throw new Error(
            "useChapterMenu must be used withing ChapterMenuContext!"
        );
    }

    return context;
};

export const ChapterMenuProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [states, setStates] = useState<{
        pageTypeState: PageType;
        readingDirectionState: ReadingDirection;
        progressbarType: ProgressbarType;
        headerType: HeaderType;
        imageFit: ImageFit;
    }>({
        pageTypeState: "single",
        readingDirectionState: "left-right",
        progressbarType: "normal",
        headerType: "shown",
        imageFit: "height",
    });
    const close = () => {
        setIsOpen(false);
    };
    const open = () => {
        setIsOpen(true);
    };
    const togglePageType = () => {
        const pageTypeLength = pageType.length - 1;
        const index = pageType.indexOf(states.pageTypeState);
        if (index === pageTypeLength) {
            setStates((prev) => ({ ...prev, pageTypeState: [...pageType][0] }));
            return;
        }
        setStates((prev) => ({
            ...prev,
            pageTypeState: [...pageType][index + 1],
        }));
    };
    const toggleReadingDirection = () => {
        const currentValue = states.readingDirectionState;
        setStates((prev) => ({
            ...prev,
            readingDirectionState:
                currentValue === "left-right" ? "right-left" : "left-right",
        }));
    };

    const toggleProgressbarType = () => {
        const currentValue = states.progressbarType;
        setStates((prev) => ({
            ...prev,
            progressbarType: currentValue === "normal" ? "hidden" : "normal",
        }));
    };
    const toggleHeaderType = () => {
        const currentValue = states.headerType;
        setStates((prev) => ({
            ...prev,
            headerType: currentValue === "shown" ? "hidden" : "shown",
        }));
    };

    const toggleImageFitType = () => {
        const imgFitArrLength = imgFitData.length - 1;
        const index = imgFitData.indexOf(states.imageFit);
        if (index === imgFitArrLength) {
            setStates((prev) => ({ ...prev, imageFit: [...imgFitData][0] }));
            return;
        }
        setStates((prev) => ({
            ...prev,
            imageFit: [...imgFitData][index + 1],
        }));
    };
    return (
        <ChapterMenuContext.Provider
            value={{
                isOpen,
                pageType: states.pageTypeState,
                readingDirection: states.readingDirectionState,
                progressbarType: states.progressbarType,
                headerType: states.headerType,
                imageFit: states.imageFit,
                toggleImageFitType,
                toggleHeaderType,
                toggleReadingDirection,
                toggleProgressbarType,
                togglePageType,
                close,
                open,
            }}
        >
            {children}
        </ChapterMenuContext.Provider>
    );
};
