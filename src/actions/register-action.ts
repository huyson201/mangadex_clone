"use server";
import { signIn } from "@/auth";
import { prisma } from "@/lib";
import { hashSync } from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";
import { sendVerifyEmail } from "./send-email";
const schema = z
    .object({
        username: z.string().min(6, {
            message: "username must contain at least 6 character(s)",
        }),
        email: z.string().email(),
        password: z.string().min(6, {
            message: "password must contain at least 6 character(s)",
        }),
        confirmPassword: z.string(),
    })
    .refine(
        ({ password, confirmPassword }) => {
            return password === confirmPassword;
        },
        {
            message: "Password must match!",
            path: ["confirmPassword"],
        }
    );

export type RegisterFormState = z.infer<typeof schema>;
export type Errors = { [K in keyof RegisterFormState]?: string } & {
    systemError: any;
};

export const register = async (prevState: any, formData: FormData) => {
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    const validateFormResult = validateForm({
        email,
        username,
        password,
        confirmPassword,
    });

    if (!validateFormResult.success) return validateFormResult;

    const registerResult = await handleRegister({
        email,
        username,
        password,
    });

    if (!registerResult.success) return registerResult;
    redirect("/verify-email");
};

const handleRegister = async (data: {
    email: string;
    username: string;
    password: string;
}) => {
    const { email, username, password } = data;

    try {
        const existedUser = await prisma.user.findFirst({
            where: {
                OR: [{ email: email }, { username: username }],
            },
        });

        if (existedUser) {
            const errors: Partial<Record<keyof RegisterFormState, string>> = {};
            if (existedUser.email === email) errors.email = "email exist!";
            if (existedUser.username === username)
                errors.username = "username exist!";
            return {
                success: false,
                errors: errors,
            };
        }

        const hashPassword = hashSync(password as string, 12);
        const newUser = await prisma.user.create({
            data: {
                email,
                username,
                password: hashPassword,
            },
        });
        await signIn("credentials", {
            username,
            password: password,
            redirect: false,
        });

        await sendVerifyEmail(newUser.id);

        return {
            success: true,
            message: "register successfully",
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            errors: {
                systemError: (error as any).message,
            } as Errors,
        };
    }
};

const validateForm = (data: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}) => {
    const validateResult = schema.safeParse(data);

    if (!validateResult.success) {
        const errors = validateResult.error.issues.reduce(
            (errors: any, issue) => {
                errors[issue.path[0]] = `${issue.message}`;
                return errors;
            },
            {}
        );

        return {
            success: false,
            errors: errors as Errors,
        };
    }
    return {
        success: true,
    };
};
