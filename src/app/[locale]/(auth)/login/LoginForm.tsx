"use client";
import { LoginFormType, login } from "@/actions/login-action";
import FormSubmitButton from "@/components/FormSubmitButton/FormSubmitButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";

type Props = {};

const LoginForm = (props: Props) => {
    const [state, formAction] = useFormState(login, null);

    return (
        <form className="mt-10" action={formAction}>
            <div>
                <label className="block text-sm text-white" htmlFor="username">
                    Username or email
                </label>
                <input
                    className="w-full rounded bg-[#3d414a] outline-none mt-2 focus:border-2 transition-all h-9 px-2 text-xs focus:border-[#ff6740]"
                    id="username"
                    name="username"
                    type="text"
                    placeholder=""
                />
                {state?.errors?.username && (
                    <div className="mt-2 text-xs text-[#ff6749]">
                        {state.errors.username}
                    </div>
                )}
            </div>
            <div className="mt-4">
                <label className="block text-sm text-white" htmlFor="password">
                    Password
                </label>
                <input
                    className="w-full rounded bg-[#3d414a] outline-none mt-2 focus:border-2 transition-all h-9 px-2 text-xs focus:border-[#ff6740]"
                    id="password"
                    name="password"
                    type="password"
                    placeholder=""
                />
                {state?.errors?.password && (
                    <div className="mt-2 text-xs text-[#ff6749]">
                        {state.errors.password}
                    </div>
                )}
            </div>
            <div className="text-right mt-4">
                <Link
                    href={"#"}
                    className="text-xs font-semibold text-[#ff6740]"
                >
                    Forgot password?
                </Link>
            </div>

            <FormSubmitButton className="mt-8 mb-16 block w-full rounded py-1.5 text-sm font-semibold bg-[#ff6740]">
                {(pending) => {
                    return pending ? "..." : "Sign In";
                }}
            </FormSubmitButton>

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
    );
};

export default LoginForm;

export const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className="mt-8 mb-16 block w-full rounded py-1.5 text-sm font-semibold bg-[#ff6740]"
        >
            {pending ? "..." : "Sign In"}
        </button>
    );
};
