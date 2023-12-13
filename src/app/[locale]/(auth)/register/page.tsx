import { ChevronsLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const page = (props: Props) => {
    return (
        <div>
            <h1 className="mt-5 text-white text-xl text-center font-semibold">
                Register
            </h1>
            <form className="mt-10">
                <div>
                    <label
                        className="block text-sm text-white"
                        htmlFor="username"
                    >
                        Username <span className="text-red-600">*</span>
                    </label>
                    <input
                        className="w-full rounded bg-[#3d414a] outline-none mt-2 focus:border-2 transition-all h-9 px-2 text-xs focus:border-[#ff6740]"
                        id="username"
                        type="text"
                        placeholder=""
                    />
                </div>
                <div className="mt-4">
                    <label
                        className="block text-sm text-white"
                        htmlFor="password"
                    >
                        Password <span className="text-red-600">*</span>
                    </label>
                    <input
                        className="w-full rounded bg-[#3d414a] outline-none mt-2 focus:border-2 transition-all h-9 px-2 text-xs focus:border-[#ff6740]"
                        id="password"
                        type="password"
                        placeholder=""
                    />
                </div>
                <div className="mt-4">
                    <label
                        className="block text-sm text-white"
                        htmlFor="confirm"
                    >
                        Confirm password <span className="text-red-600">*</span>
                    </label>
                    <input
                        className="w-full rounded bg-[#3d414a] outline-none mt-2 focus:border-2 transition-all h-9 px-2 text-xs focus:border-[#ff6740]"
                        id="confirm"
                        type="password"
                        placeholder=""
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-sm text-white" htmlFor="email">
                        Email <span className="text-red-600">*</span>
                    </label>
                    <input
                        className="w-full rounded bg-[#3d414a] outline-none mt-2 focus:border-2 transition-all h-9 px-2 text-xs focus:border-[#ff6740]"
                        id="email"
                        type="password"
                        placeholder=""
                    />
                </div>
                <div className="mt-4">
                    <Link
                        href={"/login"}
                        className="text-xs font-semibold text-[#ff6740]"
                    >
                        <ChevronsLeft className="inline-block" size={16} /> Back
                        to login
                    </Link>
                </div>

                <button className="mt-8 block w-full rounded py-1.5 text-sm font-semibold bg-[#ff6740]">
                    Register
                </button>
            </form>
        </div>
    );
};

export default page;
