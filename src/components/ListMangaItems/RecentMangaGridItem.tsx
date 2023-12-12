import Link from "next/link";
import Image from "next/image";
import React from "react";

type Props = {};

function RecentMangaGridItem({}: Props) {
    return (
        <div>
            <Link className="block relative" href="#">
                <Image
                    className="w-full rounded"
                    src={
                        "https://mangadex.org/covers/4413d794-e0da-4a6e-b61a-afd5758914e6/7188e434-cc6e-43bb-9469-3cc7b7c60dfe.jpg.512.jpg"
                    }
                    alt="art"
                    width={512}
                    height={728}
                />
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 px-2 text-sm to-transparent py-3">
                    <span>Hanninmae no Koibito</span>
                </div>
            </Link>
        </div>
    );
}

export default RecentMangaGridItem;
