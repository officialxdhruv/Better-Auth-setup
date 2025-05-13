"use client";
import { validatedAction } from "@/lib/action-helpers";
import { authClient } from "@/lib/auth-client";
import { LoginSchema } from "@/lib/types";
import { toast } from "sonner";

export const loginEmail = validatedAction(LoginSchema, async (data) => {
    const { email, password } = data;

    await authClient.signIn.email(
        {
            email,
            password,
            callbackURL: "/",
        },
        {
            onError: (ctx) => {
                toast.error(`Auth Error: ${ctx.error.message}`);
            },
        }
    );
    return { success: true };
});
