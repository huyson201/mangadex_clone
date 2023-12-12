
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

function HorizontalListItem({ }: Props) {
    return (
        <div className='relative'>
            <Link href={"#"}>
                <Image
                    className='w-full rounded'
                    src={'https://mangadex.org/covers/7350be91-b5e1-467d-89df-a089d014d20b/4eff3d58-80df-42e7-aa61-3ac74a92171d.jpg.256.jpg'}
                    alt='img'
                    width={256} height={364} />
            </Link>
            <Link href={"#"} className='mt-2 block'>
                <h6 className='text-sm line-clamp-2'>The Saint&apos;s Magic Power Is Omnipotent</h6>
            </Link>
        </div>
    )
}

export default HorizontalListItem