import Link from "next/link";
import React from "react";

type Props = {};

const page = (props: Props) => {
    return (
        <div>
            <h1 className="mt-5 text-white text-xl text-center font-semibold">
                Sign in to your account
            </h1>
            <form className="mt-10">
                <div>
                    <label
                        className="block text-sm text-white"
                        htmlFor="username"
                    >
                        Username or email
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
                        Password
                    </label>
                    <input
                        className="w-full rounded bg-[#3d414a] outline-none mt-2 focus:border-2 transition-all h-9 px-2 text-xs focus:border-[#ff6740]"
                        id="password"
                        type="password"
                        placeholder=""
                    />
                </div>
                <div className="text-right mt-4">
                    <Link
                        href={"#"}
                        className="text-xs font-semibold text-[#ff6740]"
                    >
                        Forgot password?
                    </Link>
                </div>

                <button className="mt-8 mb-16 block w-full rounded py-1.5 text-sm font-semibold bg-[#ff6740]">
                    Sign In
                </button>
                <div className="absolute text-sm bottom-0 left-0 w-full text-center py-4 mt-8 bg-[#2e2f37]">
                    New user?{" "}
                    <Link
                        href="/register"
                        className="ml-2 hover:underline text-[#ff6740]"
                    >
                        Register
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default page;
