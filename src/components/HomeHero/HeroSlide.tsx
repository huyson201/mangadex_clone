
import Wrapper from '@/layouts/Wrapper/Wrapper'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
type Props = {}

function HeroSlide({ }: Props) {
    return (
        <div className='relative w-full h-[324px] md:h-[400px] lg:h-[440px]'>
            <Image className='w-full object-cover h-[150%] object-[0_30%]' src={'https://mangadex.org/covers/43ff67bf-44a7-41ae-8cd4-b38b8664db4d/e7242843-a694-453e-9089-9dcb214626e3.jpg'} width={1270} height={660} alt='post' />
            <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-md-background/60 to-md-background'></div>
            <div className='absolute w-full h-[70%]   sm:h-[65%] md:h-[77%] bottom-0 mb-7 lg:mb-0'>
                <Wrapper className='md:pb-6 pt-6 md:pt-8 flex gap-4'>
                    <Link href={'/'} className='block w-[112px] md:w-[200px]'>
                        <Image
                            className='w-full rounded-lg'
                            src={'https://mangadex.org/covers/43ff67bf-44a7-41ae-8cd4-b38b8664db4d/e7242843-a694-453e-9089-9dcb214626e3.jpg.512.jpg'}
                            alt='img' width={512} height={726} />
                    </Link>
                    <Link href={"#"} className='flex flex-col w-[calc(100%_-_112px)] md:w-[calc(100%_-_200px)] '>
                        <h3 className='text-foreground font-bold text-xl lg:text-4xl line-clamp-5 sm:line-clamp-2 '>
                            Nichiasa Suki no Otaku ga Akuyaku Seito ni Tenseishita Kekka, Hametsu Flag ga Houkaishiteiku Ken ni Tsuite
                        </h3>
                        <div className='tags md:flex gap-1.5 mt-3 hidden overflow-hidden max-h-[18px] flex-wrap'>
                            <span className='uppercase inline-block text-[11px] text-foreground font-bold px-1.5 rounded-md bg-status-yellow'>Suggestive</span>

                            <span className='uppercase inline-block text-[11px] text-foreground font-bold px-1.5 rounded-md bg-customs-accent'>Action</span>
                            <span className='uppercase inline-block text-[11px] text-foreground font-bold px-1.5 rounded-md bg-customs-accent'>Comedy</span>
                        </div>
                        <div className='hidden sm:block'>
                            <div className="mt-3 text-sm line-clamp-3 md:line-clamp-4 lg:line-clamp-none">
                                <p>Yugo Kurei is a high school student that loves tokusatsu hero shows. One day, he loses his life protecting a child from a street slasher, but he is reincarnated in another world as Yugo Clay, a character from a certain game. However, Yugo is the most disliked person in the school and is destined to die tragically... He was reincarnated as a villain, but with the new power of magic in his hands, he aims to become a hero!</p>
                                <p>&ldquo;In this world, I can become the strongest hero!&ldquo; A hero story of a tokusatsu otaku who rises from the bottom while crushing his doom flags!</p>
                            </div>
                        </div>

                        <div className='mt-auto '>
                            <span className="font-medium italic line-clamp-1">Dongurisu, Karasuma Ei (烏丸英)</span>
                        </div>
                    </Link>
                </Wrapper>
                <Wrapper className='mt-2'>
                    <div className='tags flex gap-1.5 mt-2 md:hidden flex-wrap overflow-hidden max-h-[18px] gap-y-3'>
                        <span className='uppercase inline-block text-[11px] text-foreground font-bold px-1.5 rounded-md bg-status-yellow'>Suggestive</span>
                        <span className='uppercase inline-block text-[11px] text-foreground font-bold px-1.5 rounded-md bg-customs-accent'>Action</span>
                        <span className='uppercase inline-block text-[11px] text-foreground font-bold px-1.5 rounded-md bg-customs-accent'>Comedy</span>
                    </div>
                </Wrapper>
            </div>
        </div>
    )
}

export default HeroSlide