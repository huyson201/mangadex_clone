
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaRegCommentAlt } from 'react-icons/fa'
import { Button } from '../ui/button'
import { FiUser } from 'react-icons/fi'
type Props = {}

function LatestUpdateItem({ }: Props) {
    return (
        <div className="flex gap-x-2">
            <div className="w-14">
                <Link href={"#"} className="block w-full">
                    <Image src={"https://mangadex.org/covers/19daf6ef-6d95-46e5-9e1a-f4e5b655902f/944ad52b-5159-4eec-bd75-952d935d7853.jpg.256.jpg"}
                        alt="manga-name" width={256} height={341} className="rounded shadow-md" />
                </Link>
            </div>
            <div className="w-[calc(100%_-_56px)] space-y-1">
                <Link href={"#"}><h6 className="line-clamp-1 break-all font-bold">Lily</h6></Link>
                <div className="flex  w-full items-center justify-between">
                    <span className="line-clamp-1"><Link href={"#"}>Vol. 1 Ch. 7</Link></span>
                    <Button className="w-auto h-auto px-1.5 py-1 hover:bg-customs-accent-hover" variant={"outline"} size={"xs"}>
                        <FaRegCommentAlt />
                    </Button>
                </div>

                <div className="flex  w-full items-center justify-between">
                    <div className="flex items-center  gap-1 text-foreground">
                        <FiUser />
                        <Link href={"/"} className="text-sm inline-block px-1 rounded hover:bg-customs-accent-hover" >yuriemperor</Link>
                    </div>
                    <span className="text-sm font-medium">
                        21 minutes ago
                    </span>
                </div>
            </div>
        </div>
    )
}

export default LatestUpdateItem