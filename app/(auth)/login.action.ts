"use client";
import { validatedAction } from "@/lib/action-helpers";
import { authClient } from "@/lib/auth-client";
import { LoginSchema } from "@/lib/types";

export const loginEmail = validatedAction(LoginSchema, async (data) => {
    const { email, password } = data;

    try {
        await authClient.signIn.email({
            email,
            password,
            callbackURL: "/",
        });
        return { success: true };
    } catch (error) {
        console.log(error);
        return {
            email,
            password,
            success: false,
        };
    }
});
