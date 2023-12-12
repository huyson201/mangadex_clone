
import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
    children?: any,
    className?: string
}

const Wrapper = (props: Props) => {
    return (
        <div className={cn('px-[var(--side-margin)] mx-auto', props.className)}>
            {props.children}
        </div>
    )
}

export default Wrapper