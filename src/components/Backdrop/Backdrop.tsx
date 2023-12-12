
import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
    onClick?: () => void,
    show?: boolean,
    className?: string
}

function Backdrop({ onClick, show, className }: Props) {
    return (
        <div onClick={onClick} className={cn('fixed z-[5] w-full h-screen top-0 left-0 bg-backdrop hidden', { "block": show }, className)}>

        </div>
    )
}

export default Backdrop