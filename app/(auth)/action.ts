"use server";

import { validatedAction } from "@/lib/action-helpers";
import { auth } from "@/lib/auth";
import { LoginSchema, SignUpSchema } from "@/lib/types";
import { APIError } from "better-auth/api";

export const signUpEmail = validatedAction(SignUpSchema, async (data) => {
    const { email, username, password, name } = data;
    try {
        await auth.api.signUpEmail({
            body: {
                name,
                username,
                email,
                password,
            },
        });
        return { success: "Verification link sent to your email!" };
    } catch (error) {
        if (error instanceof APIError) {
            return {
                error: error.message,
                name,
                username,
                email,
                password,
                success: false,
            };
        }
    }
});

export const loginEmail = validatedAction(LoginSchema, async (data) => {
    const { email, password } = data;

    try {
        await auth.api.signInEmail({
            body: { email, password },
            asResponse: true,
        });
        return { success: true };
    } catch (error) {
        if (error instanceof APIError) {
            return {
                error: error.message,
                email,
                password,
                success: false,
            };
        }
    }
});
