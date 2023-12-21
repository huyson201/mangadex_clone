"use client";
import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
    title: string;
};

const BackNavigation = ({ title }: Props) => {
    const router = useRouter();
    return (
        <div className="flex items-center gap-6">
            <Button
                onClick={() => router.back()}
                variant={"outline"}
                className="rounded-full w-10 h-10 p-0"
            >
                <ArrowLeft />
            </Button>
            <span className="capitalize text-2xl font-medium">{title}</span>
        </div>
    );
};

export default BackNavigation;
