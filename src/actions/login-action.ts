"use server";

import { signIn } from "@/auth";
import { VERIFY_MAIL_URL } from "@/constants";
import { prisma } from "@/lib";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { z } from "zod";
import { sendVerifyEmail } from "./send-email";

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

    const user = await prisma.user.findFirst({
        where: {
            OR: [{ email: username }, { username: username }],
        },
    });

    if (user && !user.verified) {
        sendVerifyEmail(user.id);
        redirect(
            `${process.env.VERCEL_URL || process.env.SITE_URL}` +
                VERIFY_MAIL_URL
        );
    }
    redirect(
        url.searchParams.get("callbackUrl") ||
            process.env.VERCEL_URL ||
            process.env.SITE_URL
    );
};

export type LoginFormType = z.infer<typeof schema>;
export type ReturnType = {
    success: boolean;
    errors?: any;
};
