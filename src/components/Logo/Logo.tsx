"use client"
import React from 'react'

type Props = {}
import LogoIcon from '@/assets/mangadex-logo.svg'
import LogoText from '@/assets/logo-text.svg'
import Image from 'next/image'

const Logo = (props: Props) => {
    return (
        <div className='flex items-center ml-3'>
            <Image src={LogoIcon} alt='logo-icon' />
            <Image className='dark:filter invert ml-2 hidden  xs:inline-block' src={LogoText} alt='logo-text' />
        </div>
    )
}

export default Logo