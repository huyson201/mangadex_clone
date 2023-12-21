"use server";

import { signOut } from "@/auth";

export const signOutAction = async (formData: FormData) => {
    await signOut();
};
