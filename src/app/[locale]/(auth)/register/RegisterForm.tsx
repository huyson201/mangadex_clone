"use client";
import { register } from "@/actions/register-action";
import React from "react";
import { useFormState } from "react-dom";
import { ChevronsLeft } from "lucide-react";
import Link from "next/link";
import FormSubmitButton from "@/components/FormSubmitButton/FormSubmitButton";
type Props = {};

const RegisterForm = (props: Props) => {
    const [state, formAction] = useFormState(register, null);
    return (
        <form className="mt-10" action={formAction}>
            <div>
                <label className="block text-sm text-white" htmlFor="username">
                    Username <span className="text-red-600">*</span>
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
                    Password <span className="text-red-600">*</span>
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
            <div className="mt-4">
                <label className="block text-sm text-white" htmlFor="confirm">
                    Confirm password <span className="text-red-600">*</span>
                </label>
                <input
                    className="w-full rounded bg-[#3d414a] outline-none mt-2 focus:border-2 transition-all h-9 px-2 text-xs focus:border-[#ff6740]"
                    id="confirm"
                    name="confirmPassword"
                    type="password"
                    placeholder=""
                />
                {state?.errors?.confirmPassword && (
                    <div className="mt-2 text-xs text-[#ff6749]">
                        {state.errors.confirmPassword}
                    </div>
                )}
            </div>
            <div className="mt-4">
                <label className="block text-sm text-white" htmlFor="email">
                    Email <span className="text-red-600">*</span>
                </label>
                <input
                    className="w-full rounded bg-[#3d414a] outline-none mt-2 focus:border-2 transition-all h-9 px-2 text-xs focus:border-[#ff6740]"
                    id="email"
                    name="email"
                    type="text"
                    placeholder=""
                />
                {state?.errors?.email && (
                    <div className="mt-2 text-xs text-[#ff6749]">
                        {state.errors.email}
                    </div>
                )}
            </div>
            <div className="mt-4">
                <Link
                    href={"/login"}
                    className="text-xs font-semibold text-[#ff6740]"
                >
                    <ChevronsLeft className="inline-block" size={16} /> Back to
                    login
                </Link>
            </div>

            <FormSubmitButton className="mt-8 block w-full rounded py-1.5 text-sm font-semibold bg-[#ff6740]">
                {(pending) => {
                    return pending ? "..." : "Register";
                }}
            </FormSubmitButton>
        </form>
    );
};

export default RegisterForm;
