"use server";

import { sendVerifyEmail } from "./send-email";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import connectDb from "@/lib/mongodb";
import { User } from "@/models/user";
import { RedirectType, permanentRedirect, redirect } from "next/navigation";
import { VERIFY_MAIL_URL } from "@/constants";
const schema = z.object({
    username: z
        .string()
        .trim()
        .min(6, { message: "Must be 6 or more characters long" }),
    password: z
        .string()
        .trim()
        .min(6, { message: "Must be 6 or more characters long" }),
});
export type LoginFormType = z.infer<typeof schema>;
export type ReturnType = {
    success: boolean;
    errors?: any;
};

export const login = async (prevState: any, formData: FormData) => {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const validateResult = validateForm({ username, password });
    if (!validateResult.success) return validateResult;

    const loginResult = await handleLogin({ username, password });

    if (!loginResult.success) {
        return loginResult;
    }

    const url = new URL(loginResult.redirectTo);

    await connectDb();
    const user = await User.findOne({
        $or: [
            {
                email: username,
            },
            {
                username: username,
            },
        ],
    });

    if (user && !user.verified) {
        sendVerifyEmail(user._id.toString());
        redirect(process.env.SITE_URL + VERIFY_MAIL_URL);
    }
    redirect(url.searchParams.get("callbackUrl") || process.env.SITE_URL);
};

const handleLogin = async ({
    username,
    password,
}: {
    username: string;
    password: string;
}) => {
    try {
        const redirectTo = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });
        return {
            success: true,
            redirectTo,
        };
    } catch (error) {
        if (!(error instanceof AuthError)) {
            return {
                success: false,
                errors: {
                    systemError: (error as any).message,
                },
            };
        }

        return {
            success: false,
            errors: {
                username: error.cause?.err?.message,
            },
        };
    }
};

const validateForm = (data: { username: string; password: string }) => {
    const result = schema.safeParse(data);
    if (!result.success) {
        return {
            success: false,
            errors: result.error.issues.reduce(
                (errors: any, issue: z.ZodIssue) => {
                    errors[issue.path[0]] = `${issue.path[0]} ${issue.message}`;
                    return errors;
                },
                {}
            ),
        };
    }

    return {
        success: true,
    };
};
