
import { DEFAULT_MENU_ID } from "@/components/AccountMenu/DefaultMenu";
import React, { useState } from "react";

interface StackMenuState {
    stack: string[],
    currentActive: string,
    isActive: boolean,
}

interface StackAction {
    push: (strId: string) => void,
    back: () => void,
    open: () => void,
    close: () => void,

}
const StackMenuContext = React.createContext<(StackMenuState & StackAction) | null>({
    stack: [],
    isActive: false,
    currentActive: '',
    push(strId) {

    },
    back() {

    },
    open() {

    },
    close() {

    },
})

export const useStackMenu = () => React.useContext(StackMenuContext)

interface StackMenuProviderProps {
    children?: React.ReactNode
}
const StackMenuProvider = ({ children }: StackMenuProviderProps) => {
    const [menuState, setMenuState] = useState<StackMenuState>({
        stack: [DEFAULT_MENU_ID],
        isActive: false,
        currentActive: DEFAULT_MENU_ID,
    })

    const push = (strId: string) => {
        const newStack = [...menuState.stack, strId]
        setMenuState({
            stack: newStack,
            currentActive: strId,
            isActive: menuState.isActive
        })
    }
    const back = () => {
        if (menuState.stack.length === 1) return
        const newStack = [...menuState.stack]
        newStack.pop()
        setMenuState({
            currentActive: newStack[newStack.length - 1],
            stack: newStack,
            isActive: menuState.isActive
        })
    }
    const open = () => {
        setMenuState({ ...menuState, isActive: true })
    }
    const close = () => {
        setMenuState({
            stack: [DEFAULT_MENU_ID],
            isActive: false,
            currentActive: DEFAULT_MENU_ID
        })
    }
    return (
        <StackMenuContext.Provider value={{ ...menuState, back, push, open, close }}>
            {children}
        </StackMenuContext.Provider>
    )
}

export default StackMenuProvider