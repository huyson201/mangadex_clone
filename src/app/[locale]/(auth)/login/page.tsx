import React from "react";
import LoginForm from "./LoginForm";

type Props = {};

const page = (props: Props) => {
    return (
        <div>
            <h1 className="mt-5 text-white text-xl text-center font-semibold">
                Sign in to your account
            </h1>
            <LoginForm />
        </div>
    );
};

export default page;
