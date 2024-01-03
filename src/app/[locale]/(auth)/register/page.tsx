import React from "react";
import RegisterForm from "./RegisterForm";

type Props = {};

const page = (props: Props) => {
    return (
        <div>
            <h1 className="mt-5 text-white md:text-xl text-center font-semibold">
                Register
            </h1>
            <RegisterForm />
        </div>
    );
};

export default page;
