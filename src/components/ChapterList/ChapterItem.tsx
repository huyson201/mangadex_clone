import { Clock, Eye } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

function ChapterItem({}: Props) {
    return (
        <div>
            <Link
                href={"#"}
                className="flex w-full px-2 py-1.5 bg-accent hover:bg-accent-hover-2 transition-colors items-center justify-between"
            >
                <div className="text-sm font-semibold text-foreground">
                    Ch.55
                </div>
                <div className="flex items-center gap-x-6">
                    <div className="text-xs text-foreground font-normal flex items-center gap-1.5">
                        <Clock size={16} /> 9 days ago
                    </div>
                    <div className="text-xs text-foreground font-normal flex items-center gap-1.5">
                        <Eye size={16} />
                        N/A
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default ChapterItem;
